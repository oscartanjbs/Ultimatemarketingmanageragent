import { TrendingUp, TrendingDown, Youtube, Instagram, Mail, Share2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const overallData = [
  { month: "Sep", reach: 180000, engagement: 12000, conversions: 2400 },
  { month: "Oct", reach: 220000, engagement: 15000, conversions: 3100 },
  { month: "Nov", reach: 250000, engagement: 18000, conversions: 3800 },
  { month: "Dec", reach: 280000, engagement: 21000, conversions: 4500 },
  { month: "Jan", reach: 310000, engagement: 24000, conversions: 5200 },
  { month: "Feb", reach: 350000, engagement: 28000, conversions: 6100 },
];

const channelComparison = [
  { channel: "YouTube", reach: 850000, engagement: 78000, conversion: 9.2 },
  { channel: "Instagram", reach: 720000, engagement: 62000, conversion: 8.6 },
  { channel: "Email", reach: 450000, engagement: 110000, conversion: 24.4 },
  { channel: "Facebook", reach: 380000, engagement: 24000, conversion: 6.3 },
  { channel: "LinkedIn", reach: 320000, engagement: 28000, conversion: 8.8 },
];

const pieData = [
  { name: "YouTube", value: 35, color: "#ef4444" },
  { name: "Instagram", value: 28, color: "#ec4899" },
  { name: "Social Media", value: 20, color: "#8b5cf6" },
  { name: "Email", value: 17, color: "#3b82f6" },
];

const topContent = [
  {
    title: "10 Marketing Tips for 2026",
    channel: "YouTube",
    views: 67800,
    engagement: 12.3,
    conversions: 892,
  },
  {
    title: "Instagram Growth Strategy",
    channel: "Instagram",
    views: 45200,
    engagement: 9.8,
    conversions: 678,
  },
  {
    title: "March Newsletter",
    channel: "Email",
    views: 42100,
    engagement: 24.6,
    conversions: 1234,
  },
  {
    title: "Product Launch Announcement",
    channel: "Social Media",
    views: 38900,
    engagement: 8.4,
    conversions: 456,
  },
];

const metrics = [
  {
    title: "Total Impressions",
    value: "3.2M",
    change: "+18.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Engagement Rate",
    value: "9.2%",
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Conversion Rate",
    value: "4.8%",
    change: "+1.1%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "ROI",
    value: "342%",
    change: "+28%",
    trend: "up",
    icon: TrendingUp,
  },
];

export default function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights across all channels</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6m">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="content">Top Content</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>6-month performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={overallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stackId="2"
                      stroke="#ec4899"
                      fill="#ec4899"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="conversions"
                      stackId="3"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
                <CardDescription>Traffic by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Best Performing Day</p>
                  <p className="text-xl font-bold">Saturday</p>
                  <p className="text-xs text-green-500 mt-1">+23% engagement</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Best Time to Post</p>
                  <p className="text-xl font-bold">3:00 PM - 5:00 PM</p>
                  <p className="text-xs text-green-500 mt-1">Peak engagement window</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Avg. Response Time</p>
                  <p className="text-xl font-bold">2.4 hours</p>
                  <p className="text-xs text-green-500 mt-1">18% faster than average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Comparison</CardTitle>
              <CardDescription>Performance metrics across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={channelComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reach" fill="#8b5cf6" />
                  <Bar dataKey="engagement" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  YouTube Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-medium">850K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <span className="font-medium">125K (+3.2%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Watch Time</span>
                  <span className="font-medium">6:42 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <span className="font-medium">9.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  Instagram Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Reach</span>
                  <span className="font-medium">720K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="font-medium">180K (+2.8%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Story Views</span>
                  <span className="font-medium">42K per story</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <span className="font-medium">8.6%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  Email Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <span className="font-medium">45.2K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open Rate</span>
                  <span className="font-medium">24.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Click Rate</span>
                  <span className="font-medium">3.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Conversion</span>
                  <span className="font-medium">2.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-500" />
                  Social Media Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Reach</span>
                  <span className="font-medium">680K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="font-medium">193K (+4.1%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Post Frequency</span>
                  <span className="font-medium">18/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <span className="font-medium">7.3%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best campaigns and content pieces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{content.title}</h4>
                      <p className="text-sm text-muted-foreground">{content.channel}</p>
                    </div>
                    <div className="flex gap-8 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="font-bold">{content.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="font-bold">{content.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="font-bold">{content.conversions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Types Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Video", engagement: 12.4, color: "bg-red-500" },
                  { type: "Images", engagement: 9.8, color: "bg-purple-500" },
                  { type: "Text Posts", engagement: 7.2, color: "bg-blue-500" },
                  { type: "Stories", engagement: 11.6, color: "bg-pink-500" },
                  { type: "Carousels", engagement: 10.3, color: "bg-green-500" },
                ].map((item) => (
                  <div key={item.type}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.type}</span>
                      <span className="text-sm font-medium">{item.engagement}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.engagement / 15) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hashtag Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tag: "#marketing", reach: 125000, engagement: 8900 },
                  { tag: "#digitalmarketing", reach: 98000, engagement: 7200 },
                  { tag: "#socialmedia", reach: 87000, engagement: 6500 },
                  { tag: "#business", reach: 76000, engagement: 5800 },
                ].map((hashtag, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded border">
                    <span className="font-medium text-primary">{hashtag.tag}</span>
                    <div className="flex gap-4 text-sm">
                      <div className="text-right">
                        <p className="text-muted-foreground">Reach</p>
                        <p className="font-medium">{(hashtag.reach / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Engagement</p>
                        <p className="font-medium">{(hashtag.engagement / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Age Distribution</p>
                  {[
                    { range: "18-24", percentage: 22 },
                    { range: "25-34", percentage: 42 },
                    { range: "35-44", percentage: 24 },
                    { range: "45-54", percentage: 8 },
                    { range: "55+", percentage: 4 },
                  ].map((age) => (
                    <div key={age.range}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{age.range} years</span>
                        <span className="text-sm font-medium">{age.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-purple-500" style={{ width: `${age.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { country: "United States", percentage: 38, flag: "🇺🇸" },
                  { country: "United Kingdom", percentage: 18, flag: "🇬🇧" },
                  { country: "Canada", percentage: 12, flag: "🇨🇦" },
                  { country: "Australia", percentage: 10, flag: "🇦🇺" },
                  { country: "Germany", percentage: 8, flag: "🇩🇪" },
                  { country: "Others", percentage: 14, flag: "🌍" },
                ].map((location) => (
                  <div key={location.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{location.flag}</span>
                      <span className="text-sm">{location.country}</span>
                    </div>
                    <span className="font-medium">{location.percentage}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const activity = [20, 15, 10, 8, 5, 8, 15, 30, 50, 60, 70, 80, 85, 90, 85, 80, 75, 70, 60, 50, 40, 35, 30, 25][i];
                    return (
                      <div key={i} className="text-center">
                        <div
                          className="w-full bg-purple-500 rounded mb-1"
                          style={{ height: `${activity}px` }}
                        />
                        <span className="text-xs text-muted-foreground">{i}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">Hour of Day (24h format)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { device: "Mobile", percentage: 68, icon: "📱" },
                  { device: "Desktop", percentage: 26, icon: "💻" },
                  { device: "Tablet", percentage: 6, icon: "📟" },
                ].map((item) => (
                  <div key={item.device}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-sm">{item.device}</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
