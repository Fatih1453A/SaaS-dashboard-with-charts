"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { 
  ArrowLeft, 
  Save, 
  ChevronLeft,
  ChevronRight,
  Search,
  MoreHorizontal,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Package,
  Trash2,
  Edit3,
  Plus,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function PlansManager({ onBack }: { onBack: () => void }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [articles, setArticles] = useState<any[]>([])
  const [plans, setPlans] = useState<Record<string, number>>({}) 
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<'Week' | 'Month'>('Week')
  const [currentPivot, setCurrentPivot] = useState(new Date())
  
  // Состояния для создания нового плана
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newPlanArtId, setNewPlanArtId] = useState("")
  const [newPlanValue, setNewPlanValue] = useState("")

  // --- Логика периодов ---
  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  const { weekNum } = { weekNum: getWeekNumber(currentPivot) }
  const periodKey = viewMode === 'Week' 
    ? `${currentPivot.getFullYear()}-W${weekNum}`
    : `${currentPivot.getFullYear()}-M${currentPivot.getMonth() + 1}`

  // --- Загрузка данных ---
  const loadData = async () => {
    setLoading(true)
    try {
      const { data: arts } = await supabase.from('articles').select('id, name, article_wb')
      setArticles(arts || [])

      const { data: existingPlans } = await supabase
        .from('article_plans')
        .select('article_id, target_value')
        .eq('period_type', viewMode)
        .eq('period_key', periodKey)

      const plansMap: Record<string, number> = {}
      existingPlans?.forEach(p => {
        plansMap[p.article_id] = p.target_value
      })
      setPlans(plansMap)
    } catch (err) {
      toast.error("Ошибка при загрузке данных")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [periodKey, viewMode])

  // --- Основные функции (CRUD) ---

  const handlePlanChange = (artId: string, value: string) => {
    const numValue = value === "" ? 0 : parseInt(value)
    setPlans(prev => ({ ...prev, [artId]: numValue }))
  }

  const savePlans = async () => {
    setIsSaving(true)
    try {
      const upsertData = filteredArticles
        .filter(art => plans[art.id] !== undefined)
        .map(art => ({
          article_id: art.id,
          period_type: viewMode,
          period_key: periodKey,
          target_value: plans[art.id] || 0
        }))

      const { error } = await supabase
        .from('article_plans')
        .upsert(upsertData, { onConflict: 'article_id,period_type,period_key' })

      if (error) throw error
      toast.success("Изменения сохранены")
      loadData()
    } catch (err) {
      toast.error("Ошибка сохранения")
    } finally {
      setIsSaving(false)
    }
  }

  const deletePlan = async (artId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот план?")) return
    try {
      const { error } = await supabase
        .from('article_plans')
        .delete()
        .eq('article_id', artId)
        .eq('period_type', viewMode)
        .eq('period_key', periodKey)

      if (error) throw error
      setPlans(prev => {
        const next = { ...prev }
        delete next[artId]
        return next
      })
      toast.success("План удален")
    } catch (err) {
      toast.error("Ошибка при удалении")
    }
  }

  const createSinglePlan = async () => {
    if (!newPlanArtId || !newPlanValue) return toast.error("Заполните все поля")
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('article_plans')
        .upsert({
          article_id: newPlanArtId,
          period_type: viewMode,
          period_key: periodKey,
          target_value: parseInt(newPlanValue)
        }, { onConflict: 'article_id,period_type,period_key' })

      if (error) throw error
      toast.success("План успешно добавлен")
      setIsCreateOpen(false)
      setNewPlanValue("")
      loadData()
    } catch (err) {
      toast.error("Ошибка создания плана")
    } finally {
      setIsSaving(false)
    }
  }

  const changePeriod = (direction: number) => {
    const next = new Date(currentPivot)
    viewMode === 'Week' ? next.setDate(next.getDate() + (direction * 7)) : next.setMonth(next.getMonth() + direction)
    setCurrentPivot(next)
  }

  const filteredArticles = articles.filter(a => 
    a.name?.toLowerCase().includes(search.toLowerCase()) || 
    a.article_wb?.toString().includes(search)
  )

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      <header className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Управление планами</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Кнопка добавить план */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Plus size={14}/> Добавить план
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Новый целевой показатель</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Выберите артикул</label>
                    <select 
                      className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPlanArtId}
                      onChange={(e) => setNewPlanArtId(e.target.value)}
                    >
                      <option value="">-- Не выбрано --</option>
                      {articles.map(a => <option key={a.id} value={a.id}>{a.name} ({a.article_wb})</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">План продаж (шт)</label>
                    <Input 
                      type="number" 
                      placeholder="Напр. 500" 
                      value={newPlanValue}
                      onChange={(e) => setNewPlanValue(e.target.value)}
                    />
                  </div>
                  <div className="pt-2">
                    <Button onClick={createSinglePlan} className="w-full bg-blue-600 hover:bg-blue-700 h-11" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin" /> : "Подтвердить"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              size="sm" 
              onClick={savePlans}
              disabled={isSaving}
              className="gap-2 bg-stone-900 hover:bg-black shadow-sm px-6"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14}/>}
              Сохранить изменения
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Поиск по базе..." 
              className="pl-10 bg-white border-gray-200 rounded-lg h-10 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-lg h-10 overflow-hidden shadow-sm">
            <button onClick={() => changePeriod(-1)} className="px-3 hover:bg-gray-50 border-r border-gray-100 h-full"><ChevronLeft size={16}/></button>
            <span className="px-6 text-sm font-semibold min-w-[200px] text-center">
              {viewMode === 'Week' ? `Неделя ${weekNum}, ${currentPivot.getFullYear()}` : currentPivot.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => changePeriod(1)} className="px-3 hover:bg-gray-50 border-l border-gray-100 h-full"><ChevronRight size={16}/></button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 px-6 bg-white">
            <button onClick={() => setViewMode('Week')} className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${viewMode === 'Week' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"}`}>Недельные цели</button>
            <button onClick={() => setViewMode('Month')} className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${viewMode === 'Month' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"}`}>Месячные цели</button>
          </div>

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
            )}

            <table className="w-full">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-gray-400 bg-gray-50/50">
                  <th className="px-8 py-4 text-left font-bold">Артикул</th>
                  <th className="px-8 py-4 text-center font-bold">Статус</th>
                  <th className="px-8 py-4 text-center font-bold">План</th>
                  <th className="px-8 py-4 text-right font-bold">Управление</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-50/30 group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-400"><Package size={18} /></div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{art.name || "Без имени"}</span>
                          <span className="text-[11px] font-mono">{art.article_wb}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      {plans[art.id] > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-green-50 text-green-700 border border-green-100 uppercase"><CheckCircle2 size={12} /> Активен</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-gray-50 text-gray-400 border border-gray-100 uppercase"><AlertCircle size={12} /> Не задан</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <input 
                          type="number" 
                          value={plans[art.id] || ""}
                          onChange={(e) => handlePlanChange(art.id, e.target.value)}
                          className="w-28 h-9 text-center text-sm font-black border border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => deletePlan(art.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}