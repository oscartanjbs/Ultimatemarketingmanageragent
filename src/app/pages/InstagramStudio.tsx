import { useState } from "react";
import { Heart, MessageCircle, Send, Sparkles, Plus, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

const instagramPosts = [
  {
    type: "Post",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    caption: "New product launch! 🚀 #marketing #business",
    likes: 12400,
    comments: 234,
    date: "2 days ago",
  },
  {
    type: "Reel",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
    caption: "Quick tips for better engagement 💡",
    likes: 18900,
    comments: 567,
    date: "4 days ago",
  },
  {
    type: "Story",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop",
    caption: "Behind the scenes 🎬",
    views: 8500,
    date: "6 hours ago",
  },
  {
    type: "Post",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
    caption: "Team collaboration at its best! ✨",
    likes: 9800,
    comments: 189,
    date: "1 week ago",
  },
];

const reelIdeas = [
  { title: "Day in the Life", trend: "High", difficulty: "Easy" },
  { title: "Quick Tutorial", trend: "High", difficulty: "Medium" },
  { title: "Before & After", trend: "Medium", difficulty: "Easy" },
  { title: "Product Showcase", trend: "Medium", difficulty: "Easy" },
  { title: "Behind the Scenes", trend: "High", difficulty: "Medium" },
];

const hashtagGroups = [
  { name: "Marketing Mix", tags: ["#marketing", "#digitalmarketing", "#socialmedia", "#business", "#entrepreneur"] },
  { name: "Engagement Boost", tags: ["#instagood", "#photooftheday", "#love", "#instalike", "#follow"] },
  { name: "Industry Specific", tags: ["#b2b", "#contentmarketing", "#branding", "#advertising", "#marketingstrategy"] },
];

export default function InstagramStudio() {
  const [selectedTab, setSelectedTab] = useState("feed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instagram Studio</h1>
          <p className="text-muted-foreground">Create and manage Instagram content</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">180K</div>
            <p className="text-sm text-muted-foreground">Followers</p>
            <p className="text-xs text-green-500 mt-1">+2.3% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">8.7%</div>
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
            <p className="text-xs text-green-500 mt-1">+0.4% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">42K</div>
            <p className="text-sm text-muted-foreground">Avg. Reach</p>
            <p className="text-xs text-green-500 mt-1">+5.2% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">234</div>
            <p className="text-sm text-muted-foreground">Posts This Month</p>
            <p className="text-xs text-muted-foreground mt-1">24 scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Feed Posts</TabsTrigger>
          <TabsTrigger value="reels">Reels</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {instagramPosts
              .filter((post) => post.type === "Post")
              .map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative group">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-white" />
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm line-clamp-2">{post.caption}</p>
                    <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="reels" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create Reel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[9/16] bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload video</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reel-caption">Caption</Label>
                    <Textarea id="reel-caption" placeholder="Write a caption..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reel-music">Audio/Music</Label>
                    <Input id="reel-music" placeholder="Search trending audio..." />
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Reel
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Reel Ideas</CardTitle>
                  <CardDescription>Content ideas based on current trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reelIdeas.map((idea, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{idea.title}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={idea.trend === "High" ? "default" : "secondary"}>
                            {idea.trend} Trend
                          </Badge>
                          <Badge variant="outline">{idea.difficulty}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Reels Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {instagramPosts
                    .filter((post) => post.type === "Reel")
                    .map((post, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-16 aspect-[9/16] rounded overflow-hidden flex-shrink-0">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{post.caption}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>{post.likes.toLocaleString()} likes</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[9/16] bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Sparkles className="w-12 h-12 mx-auto mb-2" />
                    <p>Design your story</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Text", "Photo", "Video", "Poll"].map((type) => (
                    <Button key={type} variant="outline" size="sm">
                      {type}
                    </Button>
                  ))}
                </div>
                <Button className="w-full">Publish Story</Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Story Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-[9/16] bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Stories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {instagramPosts
                    .filter((post) => post.type === "Story")
                    .map((post, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded border">
                        <div className="w-12 aspect-[9/16] rounded overflow-hidden flex-shrink-0">
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{post.caption}</p>
                          <p className="text-xs text-muted-foreground">{post.views} views • {post.date}</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Caption Generator</CardTitle>
                <CardDescription>Generate engaging captions for your posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caption-topic">What's your post about?</Label>
                  <Input id="caption-topic" placeholder="e.g., New product launch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caption-tone">Tone</Label>
                  <Input id="caption-tone" placeholder="e.g., Professional, Fun, Inspiring" />
                </div>
                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Caption
                </Button>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm italic">
                    "Your generated caption will appear here... ✨"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hashtag Groups</CardTitle>
                <CardDescription>Curated hashtag sets for better reach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hashtagGroups.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{group.name}</p>
                      <Button variant="ghost" size="sm">Copy</Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Time to Post</CardTitle>
                <CardDescription>Optimal posting times based on your audience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { day: "Monday", time: "11:00 AM - 1:00 PM", engagement: "High" },
                  { day: "Wednesday", time: "3:00 PM - 4:00 PM", engagement: "High" },
                  { day: "Friday", time: "10:00 AM - 11:00 AM", engagement: "Medium" },
                  { day: "Sunday", time: "7:00 PM - 9:00 PM", engagement: "High" },
                ].map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded border">
                    <div>
                      <p className="font-medium">{slot.day}</p>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                    <Badge variant={slot.engagement === "High" ? "default" : "secondary"}>
                      {slot.engagement}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>See how you compare to similar accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Posting Frequency</span>
                      <span className="text-sm font-medium">Above average</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="text-sm font-medium">Top 20%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Content Quality</span>
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
