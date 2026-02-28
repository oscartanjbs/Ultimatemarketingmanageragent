import { useState } from "react";
import { Facebook, Twitter, Linkedin, Plus, Calendar, Image as ImageIcon, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

const platforms = [
  { name: "Facebook", icon: Facebook, color: "text-blue-600", connected: true, followers: "95K" },
  { name: "Twitter", icon: Twitter, color: "text-sky-500", connected: true, followers: "56K" },
  { name: "LinkedIn", icon: Linkedin, color: "text-blue-700", connected: true, followers: "42K" },
];

const scheduledPosts = [
  {
    content: "Exciting announcement coming next week! Stay tuned for something amazing 🚀",
    platforms: ["Facebook", "Twitter", "LinkedIn"],
    scheduledTime: "Today, 3:00 PM",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop",
  },
  {
    content: "Check out our latest blog post on marketing trends for 2026 📈",
    platforms: ["LinkedIn", "Twitter"],
    scheduledTime: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    content: "Behind the scenes look at our creative process ✨",
    platforms: ["Facebook"],
    scheduledTime: "Mar 2, 2:00 PM",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
  },
];

const recentPosts = [
  {
    content: "Happy to share that we've reached 100K followers! Thank you all for your support 💜",
    platform: "Twitter",
    time: "2 hours ago",
    likes: 2340,
    comments: 156,
    shares: 89,
  },
  {
    content: "New video just dropped on our YouTube channel! Link in bio 🎥",
    platform: "Facebook",
    time: "5 hours ago",
    likes: 1823,
    comments: 92,
    shares: 234,
  },
  {
    content: "Proud to announce our partnership with industry leaders! Read more:",
    platform: "LinkedIn",
    time: "1 day ago",
    likes: 892,
    comments: 45,
    shares: 167,
  },
];

export default function SocialMediaHub() {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Hub</h1>
        <p className="text-muted-foreground">Manage all your social platforms in one place</p>
      </div>

      {/* Connected Platforms */}
      <div className="grid gap-4 md:grid-cols-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card key={platform.name}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${platform.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.followers} followers</p>
                  </div>
                </div>
                <Badge variant={platform.connected ? "default" : "secondary"}>
                  {platform.connected ? "Connected" : "Disconnected"}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>Share content across multiple platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Platforms</Label>
                <div className="flex gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.name);
                    return (
                      <button
                        key={platform.name}
                        onClick={() => togglePlatform(platform.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${platform.color}`} />
                        <span className="text-sm">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Post Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">{postContent.length} / 280 characters</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add Media
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="ai-optimize" />
                  <Label htmlFor="ai-optimize" className="text-sm cursor-pointer">
                    AI Optimize for each platform
                  </Label>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>AI Content Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "💡 Share a customer success story to build trust",
                "📊 Post about industry trends your audience cares about",
                "🎯 Ask an engaging question to boost interaction",
                "🌟 Highlight your team members and company culture",
              ].map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <span className="text-sm">{suggestion}</span>
                  <Button variant="ghost" size="sm">Use</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledPosts.map((post, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <p>{post.content}</p>
                    <div className="flex items-center gap-2">
                      {post.platforms.map((platform) => {
                        const platformData = platforms.find((p) => p.name === platform);
                        if (!platformData) return null;
                        const Icon = platformData.icon;
                        return (
                          <div
                            key={platform}
                            className="flex items-center gap-1 px-2 py-1 rounded bg-muted"
                          >
                            <Icon className={`w-3 h-3 ${platformData.color}`} />
                            <span className="text-xs">{platform}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {post.scheduledTime}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {recentPosts.map((post, index) => {
            const platformData = platforms.find((p) => p.name === post.platform);
            const Icon = platformData?.icon || Facebook;
            const color = platformData?.color || "text-blue-600";

            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{post.platform}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <p>{post.content}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {post.likes} likes
                      </div>
                      <div>{post.comments} comments</div>
                      <div>{post.shares} shares</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
