import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, TrendingUp, 
  Users, Target, DollarSign, Eye, ThumbsUp, Share2,
  Instagram, Youtube, Facebook, Linkedin, Twitter,
  Clock, Zap, BarChart3, MessageSquare, Image as ImageIcon,
  Play, Camera, Hash, AtSign, Video, X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import productImage from "figma:asset/579d05dd714bb19824154700e7df53a6fe6cf69e.png";
import { motion } from "motion/react";

// Grid background component
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}

// Mock data - in real app this would come from AI analysis
const productAnalysis = {
  productType: "Fitness & Sports Technology",
  category: "GPS Running Smartwatch",
  targetAudience: "Serious runners and triathletes, 25-45 years old",
  pricePoint: "Premium ($600-$650)",
  keyFeatures: [
    "AMOLED touchscreen display",
    "Training readiness & recovery insights",
    "Advanced running dynamics",
    "Multi-band GPS accuracy",
    "Up to 23 days battery life"
  ],
  visualStyle: "Sporty, premium, performance-focused",
  colorScheme: "Carbon grey with vibrant yellow accents",
  detectedEmotions: "Ambitious, athletic, data-driven"
};

const platformRecommendations = [
  {
    name: "Instagram",
    icon: Instagram,
    priority: "High",
    score: 95,
    color: "from-pink-500 to-purple-500",
    reasoning: [
      "Perfect platform for showcasing training stats and achievements",
      "Active running and fitness community (25-45 demographic)",
      "Reels format ideal for workout highlights and data visualizations",
      "High engagement rates for fitness and sports technology"
    ],
    contentStrategy: {
      posts: 4,
      reels: 3,
      stories: 8,
      estimatedReach: "80K-200K"
    },
    bestTimes: ["Mon-Fri: 6AM, 12PM, 6PM", "Weekend: 7AM, 5PM"],
    hashtags: ["#GarminForerunner", "#RunningWatch", "#MarathonTraining", "#TriathlonLife", "#RunningTech"],
    estimatedEngagement: "9.2%"
  },
  {
    name: "YouTube",
    icon: Youtube,
    priority: "High",
    score: 94,
    color: "from-red-500 to-red-600",
    reasoning: [
      "Essential for detailed watch reviews and feature demonstrations",
      "Runners actively search for GPS watch comparisons",
      "Long-form content perfect for training metric explanations",
      "Strong SEO for 'Forerunner 965 review' searches"
    ],
    contentStrategy: {
      videos: 2,
      shorts: 5,
      estimatedReach: "150K-400K"
    },
    bestTimes: ["Wed-Sat: 5PM-7PM", "Sun: 8AM-10AM"],
    videoTypes: ["In-Depth Review", "Unboxing", "vs Fenix 7/Forerunner 955", "Training Tips"],
    estimatedEngagement: "13.8%"
  },
  {
    name: "TikTok",
    icon: Play,
    priority: "High",
    score: 89,
    color: "from-black to-gray-700",
    reasoning: [
      "Growing fitness community perfect for watch feature highlights",
      "Short-form format great for quick training data reveals",
      "Trending fitness audio boosts viral potential",
      "Younger athletes discovering premium running watches"
    ],
    contentStrategy: {
      videos: 7,
      estimatedReach: "300K-700K"
    },
    bestTimes: ["Daily: 6AM, 12PM, 6PM"],
    contentIdeas: ["Race day stats reveal", "Battery life challenge", "AMOLED screen showcase", "Training readiness demo"],
    estimatedEngagement: "17.4%"
  },
  {
    name: "Reddit",
    icon: MessageSquare,
    priority: "High",
    score: 82,
    color: "from-orange-500 to-red-500",
    reasoning: [
      "Active running and triathlon communities with serious athletes",
      "r/running, r/triathlon, and r/Garmin are highly engaged",
      "Detailed discussions drive purchase decisions",
      "Long-tail traffic from training advice threads"
    ],
    contentStrategy: {
      posts: 3,
      communities: ["r/running", "r/triathlon", "r/Garmin", "r/AdvancedRunning"],
      estimatedReach: "40K-90K"
    },
    bestTimes: ["Mon-Fri: 7AM, 12PM, 8PM EST"],
    postTypes: ["Training data showcase", "AMA: Race preparation", "Feature comparison"],
    estimatedEngagement: "8.7%"
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    priority: "Medium",
    score: 71,
    color: "from-blue-400 to-blue-600",
    reasoning: [
      "Active running community and race day updates",
      "Great for sharing PRs and training achievements",
      "Garmin and running influencers highly engaged",
      "Real-time race tracking and stats sharing"
    ],
    contentStrategy: {
      tweets: 12,
      threads: 3,
      estimatedReach: "50K-120K"
    },
    bestTimes: ["Mon-Fri: 6AM, 12PM, 6PM"],
    contentTypes: ["Race stats reveals", "Training insights", "Feature highlights"],
    estimatedEngagement: "3.9%"
  }
];

const trendingTopics = [
  { tag: "#MarathonTraining", volume: "1.2M posts", trend: "+28%" },
  { tag: "#RunningWatch", volume: "456K posts", trend: "+42%" },
  { tag: "#TriathlonLife", volume: "328K posts", trend: "+35%" },
  { tag: "#GarminForerunner", volume: "187K posts", trend: "+51%" }
];

export default function CampaignStrategy() {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "YouTube"]);
  const [showVideoDialog, setShowVideoDialog] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <GridBackground />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/product-capture")} className="gap-2 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative">
              <Sparkles className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50" />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                Agent<span className="text-purple-400">cy</span>
              </h1>
              <p className="text-xs text-gray-400">AI Marketing Platform</p>
            </div>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Success Banner */}
        <Card className="mb-8 border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-white">Analysis Complete!</h3>
                <p className="text-sm text-gray-400">
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
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">Your Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden mb-4 border border-white/10">
                  <img 
                    src={productImage} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mb-2">
                  <Button variant="outline" size="sm" className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white">
                    <Camera className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => window.open('http://localhost:8042', '_blank')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  AI Video Generation
                </Button>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  AI Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">What our AI detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Product Category</p>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {productAnalysis.category}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-2">Key Features Detected</p>
                  <div className="space-y-1">
                    {productAnalysis.keyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Target Audience</p>
                  <p className="text-sm font-medium text-white">{productAnalysis.targetAudience}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Price Range</p>
                  <p className="text-sm font-medium text-white">{productAnalysis.pricePoint}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Visual Style</p>
                  <p className="text-sm text-gray-300">{productAnalysis.visualStyle}</p>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Trending Topics
                </CardTitle>
                <CardDescription className="text-gray-400">Relevant trends for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10">
                    <div>
                      <p className="font-medium text-sm text-white">{topic.tag}</p>
                      <p className="text-xs text-gray-400">{topic.volume}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
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
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-xs text-gray-400">Platforms</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">500K+</div>
                  <div className="text-xs text-gray-400">Est. Reach</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold text-white">32</div>
                  <div className="text-xs text-gray-400">Content Pieces</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold text-white">9.8%</div>
                  <div className="text-xs text-gray-400">Avg. Engagement</div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Recommendations */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Share2 className="w-5 h-5 text-purple-400" />
                  Recommended Platforms
                </CardTitle>
                <CardDescription className="text-gray-400">
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
                          ? "border-purple-500/50 shadow-lg shadow-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm" 
                          : "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20"
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
                              <CardTitle className="text-xl text-white">{platform.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getPriorityColor(platform.priority)}>
                                  {platform.priority} Priority
                                </Badge>
                                <div className="flex items-center gap-1 text-sm">
                                  <BarChart3 className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-400">Score: {platform.score}/100</span>
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
                                <Zap className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                                <p className="text-sm text-gray-300">{reason}</p>
                              </div>
                            ))}
                          </TabsContent>

                          <TabsContent value="strategy" className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(platform.contentStrategy).map(([key, value]) => (
                                <div key={key} className="p-3 rounded-lg bg-white/10 border border-white/20">
                                  <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                  <p className="font-bold text-lg text-white">{value}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400">Estimated Engagement:</span>
                              <span className="font-bold text-green-400">{platform.estimatedEngagement}</span>
                            </div>
                            {platform.hashtags && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {platform.hashtags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs text-purple-300 border-purple-500/30">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="timing" className="space-y-3 mt-4">
                            {platform.bestTimes.map((time, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/10 border border-white/20">
                                <Clock className="w-4 h-4 text-purple-400" />
                                <span className="text-sm text-gray-300">{time}</span>
                              </div>
                            ))}
                          </TabsContent>
                        </Tabs>

                        {/* Match Score Progress */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Match Score</span>
                            <span className="font-bold text-white">{platform.score}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-500 rounded-full"
                              style={{ width: `${platform.score}%` }}
                            />
                          </div>
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
                onClick={() => navigate("/publishing-flow", { state: { selectedPlatforms } })}
                disabled={selectedPlatforms.length === 0}
              >
                Create Campaign ({selectedPlatforms.length} platforms)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Video Generation Dialog */}
      {showVideoDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowVideoDialog(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AI-Generated Product Video</h2>
                  <p className="text-sm text-muted-foreground">Generated from your product image</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowVideoDialog(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  controls 
                  autoPlay
                  className="w-full h-full"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-sm font-medium">Predicted Views</p>
                  <p className="text-2xl font-bold text-purple-600">125K</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg text-center">
                  <ThumbsUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium">Est. Engagement</p>
                  <p className="text-2xl font-bold text-green-600">14.2%</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg text-center">
                  <Share2 className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium">Share Rate</p>
                  <p className="text-2xl font-bold text-blue-600">8.7%</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowVideoDialog(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Video className="w-4 h-4 mr-2" />
                  Download Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}