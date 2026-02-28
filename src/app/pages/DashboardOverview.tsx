import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Youtube,
  Instagram,
  Mail,
  Palette,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stats = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: "+12.5%",
    icon: Eye,
    color: "text-blue-500",
  },
  {
    title: "Engagement Rate",
    value: "8.3%",
    change: "+2.1%",
    icon: MousePointerClick,
    color: "text-green-500",
  },
  {
    title: "Active Campaigns",
    value: "24",
    change: "+4",
    icon: TrendingUp,
    color: "text-purple-500",
  },
  {
    title: "Total Followers",
    value: "456K",
    change: "+8.2%",
    icon: Users,
    color: "text-pink-500",
  },
];

const weeklyData = [
  { day: "Mon", reach: 45000, engagement: 3200, clicks: 1200 },
  { day: "Tue", reach: 52000, engagement: 3800, clicks: 1400 },
  { day: "Wed", reach: 48000, engagement: 3500, clicks: 1300 },
  { day: "Thu", reach: 61000, engagement: 4200, clicks: 1600 },
  { day: "Fri", reach: 55000, engagement: 4000, clicks: 1500 },
  { day: "Sat", reach: 72000, engagement: 5100, clicks: 2000 },
  { day: "Sun", reach: 68000, engagement: 4800, clicks: 1800 },
];

const channelPerformance = [
  { channel: "YouTube", subscribers: 125000, views: 850000, engagement: 9.2 },
  { channel: "Instagram", followers: 180000, interactions: 42000, engagement: 8.7 },
  { channel: "Facebook", followers: 95000, interactions: 18000, engagement: 6.4 },
  { channel: "Twitter", followers: 56000, interactions: 12000, engagement: 7.1 },
];

const recentCampaigns = [
  {
    name: "Summer Product Launch",
    channel: "Multi-Channel",
    status: "Active",
    reach: "340K",
    engagement: "8.5%",
  },
  {
    name: "YouTube Series - Tips & Tricks",
    channel: "YouTube",
    status: "Active",
    reach: "120K",
    engagement: "12.3%",
  },
  {
    name: "Instagram Reels Challenge",
    channel: "Instagram",
    status: "Scheduled",
    reach: "-",
    engagement: "-",
  },
  {
    name: "Email Newsletter March",
    channel: "Email",
    status: "Completed",
    reach: "45K",
    engagement: "24.6%",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your ultimate marketing command center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <p className="text-xs text-green-500 mt-1">{stat.change} from last week</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
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
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Engagement Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.channel}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-medium">{campaign.reach}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-medium">{campaign.engagement}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      campaign.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {campaign.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Youtube className="w-12 h-12 text-red-500 mb-3" />
            <h3 className="font-medium mb-1">Create YouTube Campaign</h3>
            <p className="text-sm text-muted-foreground">Plan video content strategy</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Instagram className="w-12 h-12 text-pink-500 mb-3" />
            <h3 className="font-medium mb-1">Design Instagram Post</h3>
            <p className="text-sm text-muted-foreground">Create engaging visual content</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Palette className="w-12 h-12 text-purple-500 mb-3" />
            <h3 className="font-medium mb-1">Design Poster</h3>
            <p className="text-sm text-muted-foreground">Create physical marketing materials</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Mail className="w-12 h-12 text-blue-500 mb-3" />
            <h3 className="font-medium mb-1">Email Campaign</h3>
            <p className="text-sm text-muted-foreground">Reach your subscribers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
