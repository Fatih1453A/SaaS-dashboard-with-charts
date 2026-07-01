"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Key, Activity, Shield, 
  Copy, RefreshCw, LogOut, Check,
  Mail, Building, Save
} from "lucide-react"
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock profile data
const MOCK_PROFILE = {
  id: "demo-user-123",
  full_name: "Bureau User",
  email: "user@graspo.io",
  company_name: "Graspo Inc.",
  avatar_url: "👤",
  subscription_tier: "Enterprise",
  api_token: "graspo_api_demo_2024_secure_token"
}

const MOCK_ACTIVITY = [
  { event: "Auth.Login", time: "Today 14:20", status: "Success" },
  { event: "Profile.Update", time: "Yesterday 09:12", status: "Success" },
  { event: "API.Call", time: "Yesterday 23:01", status: "200 OK" },
  { event: "Settings.Change", time: "2 days ago", status: "Success" },
  { event: "Session.Refresh", time: "3 days ago", status: "Success" }
]

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setProfile(MOCK_PROFILE)
  }, [])

  const saveChanges = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    toast.success("Settings saved successfully")
    setSaving(false)
  }

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const copyToken = () => {
    navigator.clipboard.writeText(profile?.api_token || "")
    toast.success("API token copied to clipboard")
  }

  const regenerateToken = () => {
    setProfile({...profile, api_token: `graspo_api_demo_${Date.now().toString(36)}`})
    toast.success("API token regenerated")
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Overview */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-3xl bg-primary/10">
                  {profile.avatar_url}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">{profile.full_name}</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {profile.subscription_tier}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-muted-foreground">{profile.company_name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company_name}
                    onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                    placeholder="Enter your company name"
                  />
                </div>
                <Button 
                  onClick={saveChanges} 
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your API access and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>API Access Token</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <code className="flex-1 text-sm font-mono text-primary">
                      {profile.api_token.slice(0, 12)}••••••••••••
                    </code>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={copyToken}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={regenerateToken}
                        className="h-8 w-8 p-0"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This token provides full API access. Keep it secure.
                  </p>
                </div>

                <Separator />

                <div>
                  <Button 
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full sm:w-auto"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Terminate Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Recent activity and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_ACTIVITY.map((log, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {log.event}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{log.time}</span>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}