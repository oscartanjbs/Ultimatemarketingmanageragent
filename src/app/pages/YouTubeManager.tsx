import { useState } from "react";
import {
  Play,
  Plus,
  ThumbsUp,
  Eye,
  MessageSquare,
  TrendingUp,
  Video,
  Clock,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const videoStats = [
  { title: "Total Views", value: "1.2M", icon: Eye, color: "text-blue-500" },
  { title: "Subscribers", value: "125K", icon: TrendingUp, color: "text-green-500" },
  { title: "Total Likes", value: "89K", icon: ThumbsUp, color: "text-purple-500" },
  { title: "Comments", value: "12.4K", icon: MessageSquare, color: "text-pink-500" },
];

const videos = [
  {
    title: "10 Marketing Tips for 2026",
    status: "Published",
    views: "45.2K",
    likes: "3.2K",
    comments: "234",
    publishDate: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=225&fit=crop",
  },
  {
    title: "Complete Guide to Social Media",
    status: "Published",
    views: "67.8K",
    likes: "4.5K",
    comments: "456",
    publishDate: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=225&fit=crop",
  },
  {
    title: "Instagram Growth Strategy",
    status: "Scheduled",
    views: "-",
    likes: "-",
    comments: "-",
    publishDate: "In 3 days",
    thumbnail: "https://images.unsplash.com/photo-1611926653670-1e4f9d5e9e67?w=400&h=225&fit=crop",
  },
  {
    title: "YouTube Algorithm Explained",
    status: "Draft",
    views: "-",
    likes: "-",
    comments: "-",
    publishDate: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=400&h=225&fit=crop",
  },
];

const viewsData = [
  { date: "Week 1", views: 12000 },
  { date: "Week 2", views: 19000 },
  { date: "Week 3", views: 15000 },
  { date: "Week 4", views: 25000 },
  { date: "Week 5", views: 22000 },
  { date: "Week 6", views: 30000 },
];

export default function YouTubeManager() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">YouTube Manager</h1>
          <p className="text-muted-foreground">Manage your video content and analytics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Video Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create YouTube Video Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="video-title">Video Title</Label>
                <Input id="video-title" placeholder="Enter an engaging title..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-description">Description</Label>
                <Textarea
                  id="video-description"
                  placeholder="Describe your video content..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="howto">How-to & Style</SelectItem>
                      <SelectItem value="tech">Science & Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish-date">Publish Date</Label>
                  <Input id="publish-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="marketing, tutorial, tips" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Schedule Publishing</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {videoStats.map((stat) => {
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

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Videos</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        video.status === "Published"
                          ? "default"
                          : video.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {video.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{video.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.publishDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {video.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {video.comments}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {videos.slice(0, 3).map((video, index) => (
                  <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0">
                    <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0">
                      <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{video.title}</p>
                      <p className="text-xs text-muted-foreground">{video.views} views</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">18-24 years</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "32%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">25-34 years</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "45%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">35-44 years</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "18%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">45+ years</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "5%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Content Ideas</CardTitle>
              <CardDescription>
                Trending topics and video ideas based on your niche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "5 Marketing Mistakes to Avoid in 2026",
                "Behind the Scenes: Our Content Creation Process",
                "How to Increase Your Engagement Rate by 200%",
                "Q&A: Your Marketing Questions Answered",
                "Case Study: From 0 to 100K Subscribers",
                "Ultimate Guide to Video SEO",
              ].map((idea, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-muted-foreground" />
                    <span>{idea}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Queue
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
