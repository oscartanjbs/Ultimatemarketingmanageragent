import { useState } from "react";
import { Mail, Send, Users, TrendingUp, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";

const emailStats = [
  { title: "Subscribers", value: "45.2K", icon: Users, color: "text-blue-500" },
  { title: "Open Rate", value: "24.6%", icon: Mail, color: "text-green-500" },
  { title: "Click Rate", value: "3.8%", icon: TrendingUp, color: "text-purple-500" },
  { title: "Campaigns", value: "128", icon: FileText, color: "text-pink-500" },
];

const campaigns = [
  {
    name: "March Newsletter",
    subject: "Your Monthly Marketing Update 📬",
    status: "Sent",
    sent: "45,200",
    opens: "11,123",
    clicks: "1,719",
    date: "Feb 25, 2026",
  },
  {
    name: "Product Launch Announcement",
    subject: "Introducing Our Latest Innovation 🚀",
    status: "Scheduled",
    sent: "-",
    opens: "-",
    clicks: "-",
    date: "Mar 1, 2026",
  },
  {
    name: "Weekly Tips #47",
    subject: "5 Marketing Tips You Need This Week",
    status: "Draft",
    sent: "-",
    opens: "-",
    clicks: "-",
    date: "Draft",
  },
];

const templates = [
  { name: "Newsletter", description: "Regular updates to subscribers", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop" },
  { name: "Product Launch", description: "Announce new products", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { name: "Promotional", description: "Sales and special offers", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop" },
  { name: "Event Invitation", description: "Invite to events", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop" },
];

export default function EmailMarketing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {emailStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {campaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <Badge
                        variant={
                          campaign.status === "Sent"
                            ? "default"
                            : campaign.status === "Scheduled"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{campaign.subject}</p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span>Sent: {campaign.sent}</span>
                      <span>Opens: {campaign.opens}</span>
                      <span>Clicks: {campaign.clicks}</span>
                      <span>{campaign.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Duplicate
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="e.g., March Newsletter" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input id="subject" placeholder="Enter an engaging subject line..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preview">Preview Text</Label>
                    <Input
                      id="preview"
                      placeholder="This appears next to the subject in inbox..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-body">Email Body</Label>
                    <Textarea
                      id="email-body"
                      placeholder="Write your email content here..."
                      rows={10}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Add Image</Button>
                    <Button variant="outline">Add Button</Button>
                    <Button variant="outline">Add Divider</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" defaultValue="Agentcy Team" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" defaultValue="hello@agentcy.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-list">Recipient List</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="recipient-list">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers (45.2K)</SelectItem>
                        <SelectItem value="engaged">Engaged Users (32K)</SelectItem>
                        <SelectItem value="recent">Recent Signups (5K)</SelectItem>
                        <SelectItem value="vip">VIP List (1.2K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="send-time">Send Time</Label>
                    <Select defaultValue="now">
                      <SelectTrigger id="send-time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Immediately</SelectItem>
                        <SelectItem value="schedule">Schedule for Later</SelectItem>
                        <SelectItem value="optimal">Optimal Send Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 p-3 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary" />
                      <div className="text-xs">
                        <p className="font-medium">Agentcy Team</p>
                        <p className="text-muted-foreground">hello@agentcy.com</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Your subject line here</p>
                    <p className="text-xs text-muted-foreground">Preview text appears here...</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Campaign
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button variant="outline">Send Test Email</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video relative group">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Lists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "All Subscribers", count: "45,200", growth: "+320 this week" },
                  { name: "Engaged Users", count: "32,000", growth: "+180 this week" },
                  { name: "Recent Signups", count: "5,000", growth: "+420 this week" },
                  { name: "VIP List", count: "1,200", growth: "+15 this week" },
                ].map((list, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{list.name}</p>
                      <p className="text-sm text-muted-foreground">{list.count} subscribers</p>
                      <p className="text-xs text-green-500 mt-1">{list.growth}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Import Subscribers</CardTitle>
                <CardDescription>Add new subscribers to your list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="import-method">Import Method</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger id="import-method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="manual">Manual Entry</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your CSV file here
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
                <Button className="w-full">Import Subscribers</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscriber Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["January", "February", "March"].map((month, index) => {
                  const values = [38500, 42000, 45200];
                  const percentages = [0, 9, 7.6];
                  return (
                    <div key={month}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{month}</span>
                        <span className="text-sm font-medium">
                          {values[index].toLocaleString()}
                          {index > 0 && (
                            <span className="text-green-500 ml-2">+{percentages[index]}%</span>
                          )}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${(values[index] / 50000) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}