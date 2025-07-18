"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/CommonUI/card"
import { Button } from "../../../components/CommonUI/button"
import { Input } from "../../../components/CommonUI/input"
import { Label } from "../../../components/CommonUI/label"
import { Switch } from "../../../components/DashboardUI/switch"
import { Textarea } from "../../../components/CommonUI/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/CommonUI/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/CommonUI/tabs"
import { Settings, Shield, Bell, Database, Mail, Globe, Save } from "lucide-react"

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">System Settings</h1>
        <Button variant="default">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="data-[state=active]:bg-[#1b0c3f]">
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#1b0c3f]">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1b0c3f]">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-[#1b0c3f]">
            Database
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-[#1b0c3f]">
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-indigo-600" />
                  Platform Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platform-name" className="text-gray-700">
                    Platform Name
                  </Label>
                  <Input
                    id="platform-name"
                    defaultValue="HackZen"
                    className="bg-white/5 border-purple-500/20 text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="platform-description" className="text-gray-700">
                    Platform Description
                  </Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="Global hackathon management platform for developers and innovators"
                    className="bg-white/5 border-purple-500/20 text-gray-400 resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="support-email" className="text-gray-700">
                    Support Email
                  </Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue="hackzen.dev@gmail.com"
                    className="bg-white/5 border-purple-500/20 text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-gray-700">
                    Default Timezone
                  </Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="bg-white/5 border-purple-500/20 text-gray-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-purple-500/20">
                      <SelectItem value="utc" className="text-white hover:bg-white/5">
                        UTC (Coordinated Universal Time)
                      </SelectItem>
                      <SelectItem value="est" className="text-white hover:bg-white/5">
                        EST (Eastern Standard Time)
                      </SelectItem>
                      <SelectItem value="pst" className="text-white hover:bg-white/5">
                        PST (Pacific Standard Time)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  System Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">Maintenance Mode</Label>
                    <p className="text-gray-500 text-sm">Temporarily disable public access</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">Auto Backup</Label>
                    <p className="text-gray-500 text-sm">Daily automated database backups</p>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <div>
                  <Label htmlFor="max-file-size" className="text-gray-700">
                    Max File Upload Size (MB)
                  </Label>
                  <Input
                    id="max-file-size"
                    type="number"
                    defaultValue="50"
                    className="bg-white/5 border-purple-500/20 text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="session-timeout" className="text-gray-700">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="60"
                    className="bg-white/5 border-purple-500/20 text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Two-Factor Authentication</Label>
                      <p className="text-gray-500 text-sm">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Password Complexity</Label>
                      <p className="text-gray-500 text-sm">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="password-expiry" className="text-gray-700">
                      Password Expiry (days)
                    </Label>
                    <Input
                      id="password-expiry"
                      type="number"
                      defaultValue="90"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Access Control</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">IP Whitelist</Label>
                      <p className="text-gray-500 text-sm">Restrict admin access by IP</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Rate Limiting</Label>
                      <p className="text-gray-500 text-sm">Limit API requests per user</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts" className="text-gray-700">
                      Max Login Attempts
                    </Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      defaultValue="5"
                      className="bg-white/5 border-purple-500/20 text-black"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Admin Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Email Notifications</Label>
                      <p className="text-gray-500 text-sm">Receive admin alerts via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Push Notifications</Label>
                      <p className="text-gray-500 text-sm">Browser push notifications</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">SMS Alerts</Label>
                      <p className="text-gray-500 text-sm">Critical system alerts via SMS</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">User Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Welcome Emails</Label>
                      <p className="text-gray-500 text-sm">Send welcome emails to new users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Event Reminders</Label>
                      <p className="text-gray-500 text-sm">Remind users about upcoming events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Newsletter</Label>
                      <p className="text-gray-500 text-sm">Weekly platform updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Database Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Backup Settings</h3>
                  <div>
                    <Label htmlFor="backup-frequency" className="text-gray-700">
                      Backup Frequency
                    </Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-white/5 border-purple-500/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-purple-500/20">
                        <SelectItem value="hourly" className="text-white hover:bg-white/5">
                          Hourly
                        </SelectItem>
                        <SelectItem value="daily" className="text-white hover:bg-white/5">
                          Daily
                        </SelectItem>
                        <SelectItem value="weekly" className="text-white hover:bg-white/5">
                          Weekly
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="retention-period" className="text-gray-700">
                      Backup Retention (days)
                    </Label>
                    <Input
                      id="retention-period"
                      type="number"
                      defaultValue="30"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <Button >
                    Create Manual Backup
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Performance</h3>
                  <div>
                    <Label htmlFor="connection-pool" className="text-gray-700">
                      Connection Pool Size
                    </Label>
                    <Input
                      id="connection-pool"
                      type="number"
                      defaultValue="20"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="query-timeout" className="text-gray-700">
                      Query Timeout (seconds)
                    </Label>
                    <Input
                      id="query-timeout"
                      type="number"
                      defaultValue="30"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <Button >
                    Optimize Database
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-600" />
                Third-Party Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Email Service</h3>
                  <div>
                    <Label htmlFor="smtp-host" className="text-gray-700">
                      SMTP Host
                    </Label>
                    <Input
                      id="smtp-host"
                      defaultValue="smtp.gmail.com"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port" className="text-gray-700">
                      SMTP Port
                    </Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      defaultValue="587"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-username" className="text-gray-700">
                      Username
                    </Label>
                    <Input
                      id="smtp-username"
                      type="email"
                      placeholder="your-email@gmail.com"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-black font-semibold">Payment Gateway</h3>
                  <div>
                    <Label htmlFor="stripe-key" className="text-gray-700">
                      Stripe Public Key
                    </Label>
                    <Input
                      id="stripe-key"
                      placeholder="pk_live_..."
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-url" className="text-gray-700">
                      Webhook URL
                    </Label>
                    <Input
                      id="webhook-url"
                      defaultValue="https://hackzen.com/api/webhooks/stripe"
                      className="bg-white/5 border-purple-500/20 text-gray-400"
                    />
                  </div>
                  <Button className="w-full">
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
