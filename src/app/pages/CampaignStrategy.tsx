import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, TrendingUp, 
  Users, Target, DollarSign, Eye, ThumbsUp, Share2,
  Instagram, Youtube, Facebook, Linkedin, Twitter,
  Clock, Zap, BarChart3, MessageSquare, Image as ImageIcon,
  Play, Camera, Hash, AtSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Mock data - in real app this would come from AI analysis
const productAnalysis = {
  productType: "Consumer Electronics",
  category: "Wireless Headphones",
  targetAudience: "Tech enthusiasts, 18-35 years old",
  pricePoint: "Mid-range ($100-$200)",
  keyFeatures: [
    "Noise cancellation",
    "Wireless connectivity",
    "Premium build quality",
    "Long battery life"
  ],
  visualStyle: "Modern, minimalist, tech-focused",
  colorScheme: "Black and silver tones",
  detectedEmotions: "Professional, aspirational, innovative"
};

const platformRecommendations = [
  {
    name: "Instagram",
    icon: Instagram,
    priority: "High",
    score: 95,
    color: "from-pink-500 to-purple-500",
    reasoning: [
      "Visual-first platform perfect for product photography",
      "Target demographic (18-35) highly active on Instagram",
      "Reels format ideal for 360° product demonstrations",
      "High engagement rates for tech and lifestyle products"
    ],
    contentStrategy: {
      posts: 4,
      reels: 3,
      stories: 8,
      estimatedReach: "50K-150K"
    },
    bestTimes: ["Mon-Fri: 12PM, 6PM", "Weekend: 10AM, 3PM"],
    hashtags: ["#TechAccessories", "#WirelessHeadphones", "#AudioGear", "#TechLife"],
    estimatedEngagement: "8.5%"
  },
  {
    name: "YouTube",
    icon: Youtube,
    priority: "High",
    score: 92,
    color: "from-red-500 to-red-600",
    reasoning: [
      "Perfect for detailed product reviews and unboxing content",
      "Tech audience actively searches for product comparisons",
      "Long-form content builds trust and authority",
      "Strong SEO potential for product-related searches"
    ],
    contentStrategy: {
      videos: 2,
      shorts: 5,
      estimatedReach: "100K-300K"
    },
    bestTimes: ["Thu-Sat: 2PM-4PM", "Sun: 12PM-2PM"],
    videoTypes: ["Product Review", "Unboxing", "Comparison", "Tutorial"],
    estimatedEngagement: "12.3%"
  },
  {
    name: "TikTok",
    icon: Play,
    priority: "Medium",
    score: 88,
    color: "from-black to-gray-700",
    reasoning: [
      "Young audience aligns with target demographic",
      "Short-form video format perfect for quick demos",
      "Trending audio can boost viral potential",
      "Strong discovery algorithm for new products"
    ],
    contentStrategy: {
      videos: 6,
      estimatedReach: "200K-500K"
    },
    bestTimes: ["Daily: 7AM, 12PM, 7PM"],
    contentIdeas: ["60-sec demo", "Before/after", "Feature highlights", "Lifestyle usage"],
    estimatedEngagement: "15.7%"
  },
  {
    name: "Reddit",
    icon: MessageSquare,
    priority: "Medium",
    score: 75,
    color: "from-orange-500 to-red-500",
    reasoning: [
      "Tech-savvy community appreciates detailed information",
      "r/headphones and r/technology have engaged audiences",
      "Authentic discussions build brand credibility",
      "Long-tail traffic from evergreen posts"
    ],
    contentStrategy: {
      posts: 2,
      communities: ["r/headphones", "r/technology", "r/BuyItForLife"],
      estimatedReach: "20K-50K"
    },
    bestTimes: ["Mon-Fri: 9AM, 1PM EST"],
    postTypes: ["Product showcase", "AMA thread", "Comparison discussion"],
    estimatedEngagement: "6.2%"
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    priority: "Low",
    score: 68,
    color: "from-blue-400 to-blue-600",
    reasoning: [
      "Good for brand awareness and announcements",
      "Tech community active but less visual-focused",
      "Quick updates and customer engagement",
      "Limited long-form content support"
    ],
    contentStrategy: {
      tweets: 10,
      threads: 2,
      estimatedReach: "30K-80K"
    },
    bestTimes: ["Mon-Fri: 9AM, 1PM, 5PM"],
    contentTypes: ["Product announcement", "Feature highlights", "User testimonials"],
    estimatedEngagement: "2.8%"
  }
];

const trendingTopics = [
  { tag: "#WirelessAudio", volume: "245K posts", trend: "+32%" },
  { tag: "#TechReview", volume: "892K posts", trend: "+18%" },
  { tag: "#AudioGear", volume: "156K posts", trend: "+45%" },
  { tag: "#ProductivityTech", volume: "423K posts", trend: "+12%" }
];

export default function CampaignStrategy() {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "YouTube"]);

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Low": return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Mock image - in real app this would be the actual uploaded image
  const productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/product-capture")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                Agent<span className="text-purple-500">cy</span>
              </h1>
              <p className="text-xs text-muted-foreground">AI Marketing Platform</p>
            </div>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Banner */}
        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Analysis Complete!</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI has analyzed your product and created a comprehensive marketing strategy across 5 platforms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Product Analysis */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img 
                    src={productImage} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  AI Analysis
                </CardTitle>
                <CardDescription>What our AI detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Product Category</p>
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                    {productAnalysis.category}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Key Features Detected</p>
                  <div className="space-y-1">
                    {productAnalysis.keyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Audience</p>
                  <p className="text-sm font-medium">{productAnalysis.targetAudience}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                  <p className="text-sm font-medium">{productAnalysis.pricePoint}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Visual Style</p>
                  <p className="text-sm">{productAnalysis.visualStyle}</p>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Trending Topics
                </CardTitle>
                <CardDescription>Relevant trends for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                    <div>
                      <p className="font-medium text-sm">{topic.tag}</p>
                      <p className="text-xs text-muted-foreground">{topic.volume}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      {topic.trend}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Platform Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-xs text-muted-foreground">Platforms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">500K+</div>
                  <div className="text-xs text-muted-foreground">Est. Reach</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">32</div>
                  <div className="text-xs text-muted-foreground">Content Pieces</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">9.8%</div>
                  <div className="text-xs text-muted-foreground">Avg. Engagement</div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-500" />
                  Recommended Platforms
                </CardTitle>
                <CardDescription>
                  AI-selected platforms based on your product analysis and target audience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformRecommendations.map((platform) => {
                  const PlatformIcon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.name);
                  
                  return (
                    <Card 
                      key={platform.name}
                      className={`transition-all cursor-pointer ${
                        isSelected 
                          ? "border-purple-300 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50" 
                          : "hover:shadow-md"
                      }`}
                      onClick={() => togglePlatform(platform.name)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                              <PlatformIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{platform.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getPriorityColor(platform.priority)}>
                                  {platform.priority} Priority
                                </Badge>
                                <div className="flex items-center gap-1 text-sm">
                                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Score: {platform.score}/100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected 
                                ? "border-purple-500 bg-purple-500" 
                                : "border-gray-300"
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <Tabs defaultValue="reasoning" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="reasoning">Why</TabsTrigger>
                            <TabsTrigger value="strategy">Strategy</TabsTrigger>
                            <TabsTrigger value="timing">Best Times</TabsTrigger>
                          </TabsList>

                          <TabsContent value="reasoning" className="space-y-2 mt-4">
                            {platform.reasoning.map((reason, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Zap className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                                <p className="text-sm">{reason}</p>
                              </div>
                            ))}
                          </TabsContent>

                          <TabsContent value="strategy" className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(platform.contentStrategy).map(([key, value]) => (
                                <div key={key} className="p-3 rounded-lg bg-white border">
                                  <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                  <p className="font-bold text-lg">{value}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Estimated Engagement:</span>
                              <span className="font-bold text-green-600">{platform.estimatedEngagement}</span>
                            </div>
                            {platform.hashtags && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {platform.hashtags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="timing" className="space-y-3 mt-4">
                            {platform.bestTimes.map((time, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border">
                                <Clock className="w-4 h-4 text-purple-500" />
                                <span className="text-sm">{time}</span>
                              </div>
                            ))}
                          </TabsContent>
                        </Tabs>

                        {/* Match Score Progress */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Match Score</span>
                            <span className="font-bold">{platform.score}%</span>
                          </div>
                          <Progress value={platform.score} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => navigate("/product-capture")}
              >
                Start Over
              </Button>
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => navigate("/dashboard")}
                disabled={selectedPlatforms.length === 0}
              >
                Create Campaign ({selectedPlatforms.length} platforms)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}