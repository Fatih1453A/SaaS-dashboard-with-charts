"use client"

import { useState, useEffect, useMemo } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { motion, AnimatePresence } from "framer-motion"
import * as XLSX from 'xlsx'
import { 
  Plus, RefreshCw, ArrowLeft, ChevronDown, ChevronRight,
  Upload, Trash2, AlertCircle, Info, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ArticlesList({ onBack }: { onBack: () => void }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [loading, setLoading] = useState(true)
  const [rawArticles, setRawArticles] = useState<any[]>([])
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [importing, setImporting] = useState(false)

  const fetchArticles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    if (!error) setRawArticles(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchArticles() }, [])

  // --- PRODUCTION ИМПОРТ EXCEL ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)

    // Получаем текущего пользователя (обязательно для Production)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      alert("Ошибка авторизации. Перевойдите в систему.")
      setImporting(false)
      return
    }

    const reader = new FileReader()
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]

        const existingBarcodes = new Set(rawArticles.map(a => String(a.trend_value)))
        const newEntries = []
        let skippedCount = 0

        for (let i = 0; i < data.length; i++) {
          const row = data[i]
          // Пропускаем пустые строки или строки без артикула WB (2-й столбец)
          if (!row[1] || row[1] === "undefined") continue

          const artSeller = String(row[0] || '').trim()
          const artWb = String(row[1]).trim()
          const barcode = String(row[2] || '').trim()
          const size = String(row[3] || '').trim()
          const cost = parseFloat(String(row[4] || '0').replace(',', '.'))

          // Проверка на дубликат по баркоду
          if (barcode && existingBarcodes.has(barcode)) {
            skippedCount++
            continue
          }

          newEntries.push({
            user_id: user.id, // Привязываем к пользователю
            article_wb: artWb,
            article_seller: artSeller,
            name: `Товар ${artWb}`,
            category: size,
            trend_value: barcode, // Храним баркод здесь
            prediction: { cost: cost }, // Себестоимость в JSONB
          })

          if (barcode) existingBarcodes.add(barcode)
        }

        if (newEntries.length > 0) {
          const { error: insertError } = await supabase.from('articles').insert(newEntries)
          if (insertError) {
            console.error("Supabase Insert Error:", insertError)
            alert(`Ошибка базы: ${insertError.message}`)
          } else {
            alert(`Успешно: ${newEntries.length}. Дубликаты: ${skippedCount}`)
            fetchArticles()
          }
        } else {
          alert(`Новых данных не найдено. Пропущено: ${skippedCount}`)
        }
      } catch (err) {
        console.error("Processing Error:", err)
        alert("Ошибка при обработке файла.")
      } finally {
        setImporting(false)
      }
    }
    reader.readAsBinaryString(file)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить SKU?")) return
    await supabase.from('articles').delete().eq('id', id)
    fetchArticles()
  }

  const groupedArticles = useMemo(() => {
    const groups: Record<string, any> = {}
    rawArticles.forEach(item => {
      if (!groups[item.article_wb]) {
        groups[item.article_wb] = { article_wb: item.article_wb, name: item.name, variants: [] }
      }
      groups[item.article_wb].variants.push(item)
    })
    return Object.values(groups)
  }, [rawArticles])

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center py-4">
        <Button variant="ghost" onClick={onBack} className="text-slate-500 hover:text-black p-0 flex items-center gap-2 font-bold transition-all">
          <ArrowLeft size={18} /> Назад к панели
        </Button>
        
        <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-lg hover:bg-indigo-100 transition-colors">
                    💡
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="p-5 bg-[#1A1A2E] text-white rounded-[1.5rem] w-72 border-none shadow-2xl">
                  <div className="space-y-3">
                    <p className="text-xs font-black flex items-center gap-2 text-[#CCFF00]">
                      <Info size={14} /> ФОРМАТ EXCEL (БЕЗ ШАПКИ)
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-300">
                      <div className="bg-white/5 p-2 rounded-lg">1. Арт. продавца</div>
                      <div className="bg-white/5 p-2 rounded-lg">2. Арт. WB</div>
                      <div className="bg-white/5 p-2 rounded-lg">3. Баркод</div>
                      <div className="bg-white/5 p-2 rounded-lg">4. Размер</div>
                      <div className="bg-white/10 p-2 rounded-lg col-span-2 text-white font-bold text-center">5. Себестоимость</div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <label className="cursor-pointer">
              <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleFileUpload} disabled={importing} />
              <div className="flex items-center gap-2 bg-[#1A1A2E] text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-black transition-all shadow-xl shadow-indigo-100">
                {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {importing ? 'ЗАГРУЗКА...' : 'ИМПОРТ EXCEL'}
              </div>
            </label>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {groupedArticles.map((group: any) => (
          <div key={group.article_wb} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div 
              onClick={() => {
                const newSet = new Set(expandedGroups)
                newSet.has(group.article_wb) ? newSet.delete(group.article_wb) : newSet.add(group.article_wb)
                setExpandedGroups(newSet)
              }}
              className="p-7 flex items-center cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-5 transition-all ${expandedGroups.has(group.article_wb) ? 'bg-[#1A1A2E] text-white' : 'bg-slate-50 text-slate-400'}`}>
                {expandedGroups.has(group.article_wb) ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-900 text-xl tracking-tight">{group.name || 'Аналитика модели'}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">ID: {group.article_wb}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.variants.length} SKU</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedGroups.has(group.article_wb) && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-slate-50/50 border-t border-slate-100 p-6 space-y-3">
                   {group.variants.map((variant: any) => (
                      <div key={variant.id} className="bg-white rounded-[1.5rem] p-5 flex items-center border border-slate-100 hover:border-indigo-200 transition-all shadow-sm">
                        <div className="flex-1">
                           <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-inner">
                               {variant.category || '?'}
                             </div>
                             <div>
                               <p className="text-[10px] font-black text-slate-400 font-mono tracking-tighter uppercase mb-0.5">Barcode: {variant.trend_value}</p>
                               <p className="text-sm font-black text-slate-800 tracking-tight">{variant.article_seller || 'Нет артикула'}</p>
                             </div>
                           </div>
                        </div>
                        <div className="text-right px-8 border-r border-slate-100 mr-4">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Закупка</p>
                           <p className="text-lg font-black text-blue-600 tracking-tighter">{variant.prediction?.cost || 0} ₽</p>
                        </div>
                        <button onClick={() => handleDelete(variant.id)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}