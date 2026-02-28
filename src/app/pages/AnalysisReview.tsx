import { useNavigate, useSearchParams } from "react-router";
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, Target, 
  Lightbulb, TrendingUp, Image as ImageIcon, Video, FileText,
  Users, Eye, ThumbsUp, DollarSign, Hash, Zap, MessageSquare,
  Shield, AlertCircle, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { motion } from "motion/react";

// Mock analysis data for each phase
const phase1Analysis = {
  title: "Strategy & Planning Analysis",
  description: "Comprehensive strategic foundation for your marketing campaign",
  sections: [
    {
      agentName: "CMO Agent",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      findings: {
        campaignGoals: [
          "Increase brand awareness among serious runners aged 25-45",
          "Drive 15% conversion rate on high-intent traffic",
          "Establish thought leadership in GPS running technology",
          "Build engaged community of 50K+ followers across platforms"
        ],
        kpis: [
          { metric: "Reach", target: "500K+ impressions", timeline: "30 days" },
          { metric: "Engagement Rate", target: "9.5%+", timeline: "30 days" },
          { metric: "Click-through Rate", target: "3.2%+", timeline: "30 days" },
          { metric: "Conversion Rate", target: "15%+", timeline: "60 days" }
        ],
        budget: {
          total: "$12,000",
          breakdown: [
            { platform: "Instagram", amount: "$3,500", percentage: 29 },
            { platform: "YouTube", amount: "$3,200", percentage: 27 },
            { platform: "TikTok", amount: "$2,800", percentage: 23 },
            { platform: "Reddit", amount: "$1,500", percentage: 13 },
            { platform: "Twitter", amount: "$1,000", percentage: 8 }
          ]
        }
      }
    },
    {
      agentName: "Research Agent",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      findings: {
        targetAudience: {
          primary: "Serious runners and marathon trainers (25-45 years old)",
          secondary: "Triathletes and fitness enthusiasts",
          demographics: {
            age: "25-45 years",
            gender: "60% Male, 40% Female",
            income: "$75K-$150K annually",
            location: "Urban/Suburban, USA & Europe"
          }
        },
        competitors: [
          { name: "Apple Watch Ultra", strength: "Brand recognition", weakness: "Battery life" },
          { name: "COROS PACE 3", strength: "Price point", weakness: "Limited ecosystem" },
          { name: "Polar Vantage V3", strength: "Training metrics", weakness: "UI complexity" }
        ],
        marketTrends: [
          { trend: "Marathon training content", growth: "+42%", opportunity: "High" },
          { trend: "GPS accuracy comparisons", growth: "+38%", opportunity: "High" },
          { trend: "Ultra-endurance racing", growth: "+51%", opportunity: "Medium" },
          { trend: "Recovery & training load", growth: "+35%", opportunity: "High" }
        ]
      }
    },
    {
      agentName: "Strategy Agent",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      findings: {
        positioning: "The ultimate GPS running watch for data-driven athletes who demand accuracy and insights",
        messagingPillars: [
          { pillar: "Precision", message: "Multi-band GPS delivers unmatched accuracy for every run" },
          { pillar: "Intelligence", message: "Training readiness keeps you performing at your peak" },
          { pillar: "Endurance", message: "23-day battery life that matches your training schedule" },
          { pillar: "Performance", message: "AMOLED display + advanced metrics = runner's dream" }
        ],
        customerJourney: [
          { stage: "Awareness", touchpoints: ["Instagram Reels", "YouTube Reviews", "TikTok demos"], goal: "Discover features" },
          { stage: "Consideration", touchpoints: ["Reddit discussions", "Comparison videos", "Feature deep-dives"], goal: "Evaluate vs competitors" },
          { stage: "Decision", touchpoints: ["User testimonials", "Race day content", "Training insights"], goal: "Purchase confidence" },
          { stage: "Retention", touchpoints: ["Training tips", "Community highlights", "Achievement sharing"], goal: "Brand advocacy" }
        ]
      }
    },
    {
      agentName: "Creativity Agent",
      icon: Lightbulb,
      color: "from-pink-500 to-rose-500",
      findings: {
        brandVoice: "Motivational, data-driven, authentic, and performance-focused",
        contentThemes: [
          { theme: "Race Day Reveals", description: "Post-race stats and achievements with emotional storytelling" },
          { theme: "Training Insights", description: "How data helps you train smarter, not harder" },
          { theme: "Accuracy Matters", description: "Side-by-side GPS comparisons in real running conditions" },
          { theme: "Recovery Stories", description: "How training readiness prevents burnout and injury" }
        ],
        copyExamples: [
          { format: "Instagram Caption", copy: "📊 Your training data tells a story. The Forerunner 965 helps you write your best chapter yet. Multi-band GPS accuracy + AMOLED brilliance = runner's paradise. #DataDrivenRunning #Forerunner965" },
          { format: "YouTube Title", copy: "Forerunner 965 vs Apple Watch Ultra: Which GPS Watch is Actually MORE Accurate? [Real Run Test]" },
          { format: "TikTok Hook", copy: "POV: You finally have a running watch that ACTUALLY tracks your route accurately 🎯" }
        ],
        visualConcepts: [
          "Split screen: Watch display vs. actual route overlay",
          "Training readiness score with morning coffee ritual",
          "Battery life timeline vs. other premium watches",
          "AMOLED display clarity in bright sunlight"
        ]
      }
    }
  ]
};

const phase2Analysis = {
  title: "Marketing Execution Analysis",
  description: "Comprehensive multi-platform marketing strategy and content plan",
  sections: [
    {
      agentName: "Marketing Agent",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      findings: {
        platformStrategy: [
          {
            platform: "Instagram",
            priority: "High",
            contentMix: {
              posts: 4,
              reels: 3,
              stories: 8
            },
            postingSchedule: [
              { day: "Monday", time: "6:00 AM", type: "Reel", topic: "Morning run stats reveal" },
              { day: "Monday", time: "12:00 PM", type: "Story", topic: "Training tip" },
              { day: "Wednesday", time: "6:00 AM", type: "Post", topic: "Feature highlight" },
              { day: "Friday", time: "6:00 PM", type: "Reel", topic: "Race prep content" }
            ],
            hashtags: ["#GarminForerunner", "#RunningWatch", "#MarathonTraining", "#GPS", "#RunningTech"],
            expectedMetrics: {
              reach: "120K-180K",
              engagement: "9.2%",
              saves: "2.8K+"
            }
          },
          {
            platform: "YouTube",
            priority: "High",
            contentMix: {
              longForm: 2,
              shorts: 5
            },
            videoTopics: [
              "Forerunner 965 Complete Review: 30 Days of Testing",
              "GPS Accuracy Test: Forerunner 965 vs Apple Watch Ultra",
              "Is the AMOLED Display Worth It?",
              "Training Readiness Explained: Real Runner Experience"
            ],
            expectedMetrics: {
              views: "250K-400K",
              watchTime: "65%+",
              engagement: "13.8%"
            }
          },
          {
            platform: "TikTok",
            priority: "High",
            contentMix: {
              videos: 7
            },
            contentFormats: [
              "Race day stats reveal with emotional music",
              "Side-by-side GPS accuracy comparison",
              "Battery life 'days later' series",
              "Training readiness morning routine",
              "AMOLED display in different lighting"
            ],
            expectedMetrics: {
              views: "450K-750K",
              engagement: "17.4%",
              shares: "8.2%"
            }
          },
          {
            platform: "Reddit",
            priority: "High",
            communities: ["r/running", "r/triathlon", "r/Garmin", "r/AdvancedRunning"],
            postStrategy: [
              { type: "Discussion", title: "30-day Forerunner 965 review: Marathon training edition", timing: "Tuesday 8 AM EST" },
              { type: "Comparison", title: "GPS Accuracy Data: FR965 vs Fenix 7 vs Apple Watch", timing: "Thursday 12 PM EST" },
              { type: "AMA", title: "Just finished Boston Marathon training with FR965 - AMA", timing: "Saturday 10 AM EST" }
            ],
            expectedMetrics: {
              reach: "55K-90K",
              engagement: "8.7%",
              discussions: "300+"
            }
          },
          {
            platform: "Twitter/X",
            priority: "Medium",
            contentMix: {
              tweets: 12,
              threads: 3
            },
            threadTopics: [
              "Why GPS accuracy matters more than you think (with data)",
              "Breaking down Training Readiness: 7 days of tracking",
              "AMOLED vs MIP displays: The runner's perspective"
            ],
            expectedMetrics: {
              impressions: "75K-120K",
              engagement: "3.9%",
              retweets: "250+"
            }
          }
        ],
        contentCalendar: {
          week1: "Product introduction & feature highlights",
          week2: "GPS accuracy & performance testing",
          week3: "Training insights & user stories",
          week4: "Community engagement & race content"
        },
        abTests: [
          { test: "Caption length", variants: ["Short (<50 chars)", "Medium (50-150)", "Long (150+)"], platform: "Instagram" },
          { test: "Thumbnail style", variants: ["Data overlay", "Action shot", "Close-up"], platform: "YouTube" },
          { test: "Hook format", variants: ["POV", "Question", "Bold claim"], platform: "TikTok" }
        ]
      }
    }
  ]
};

const phase3Analysis = {
  title: "Content Creation Analysis",
  description: "Complete content assets generated for all platforms",
  sections: [
    {
      agentName: "Image Agent",
      icon: ImageIcon,
      color: "from-cyan-500 to-blue-500",
      findings: {
        generatedAssets: [
          { type: "Instagram Post", count: 4, specs: "1080x1080px", theme: "Feature highlights with branded overlays" },
          { type: "Instagram Story", count: 8, specs: "1080x1920px", theme: "Daily tips and quick features" },
          { type: "YouTube Thumbnail", count: 6, specs: "1280x720px", theme: "High-contrast with text overlay" },
          { type: "TikTok Cover", count: 7, specs: "1080x1920px", theme: "Eye-catching stills from video content" },
          { type: "Twitter Header", count: 2, specs: "1500x500px", theme: "Brand + product showcase" }
        ],
        designElements: {
          colorPalette: ["#7C3AED (Primary Purple)", "#EC4899 (Accent Pink)", "#10B981 (Success Green)", "#F59E0B (Warning Orange)"],
          typography: "Bold sans-serif headers, clean body text",
          brandingStyle: "Modern, tech-forward with data visualization overlays"
        },
        variations: "Each asset includes 3 A/B test variations for color scheme, layout, and text placement"
      }
    },
    {
      agentName: "Video Agent",
      icon: Video,
      color: "from-red-500 to-pink-500",
      findings: {
        producedVideos: [
          {
            title: "Complete Forerunner 965 Review",
            platform: "YouTube",
            duration: "12:34",
            format: "16:9 landscape",
            sections: ["Unboxing (0:00)", "Design (2:15)", "GPS Test (5:30)", "Features (8:00)", "Verdict (11:00)"]
          },
          {
            title: "GPS Accuracy Comparison",
            platform: "YouTube",
            duration: "8:45",
            format: "16:9 landscape",
            sections: ["Setup (0:00)", "Test Route (1:30)", "Data Analysis (4:00)", "Results (6:30)"]
          },
          {
            title: "Race Day Stats Reveal",
            platform: "Instagram Reel",
            duration: "0:45",
            format: "9:16 vertical",
            hooks: "Emotional post-race stats with inspiring music"
          },
          {
            title: "Battery Life Challenge",
            platform: "TikTok",
            duration: "0:38",
            format: "9:16 vertical",
            hooks: "Time-lapse showing 23 days of battery life"
          },
          {
            title: "Training Readiness Morning",
            platform: "TikTok",
            duration: "0:52",
            format: "9:16 vertical",
            hooks: "Morning routine with training readiness check"
          }
        ],
        videoFeatures: [
          "Motion graphics for data visualization",
          "Smooth transitions and cuts",
          "Branded intro/outro sequences",
          "Captions for sound-off viewing",
          "Platform-optimized aspect ratios"
        ],
        renderSpecs: {
          resolution: "4K for YouTube, 1080p for social",
          frameRate: "60fps for smooth motion",
          codec: "H.264 for compatibility",
          audio: "AAC 256kbps stereo"
        }
      }
    },
    {
      agentName: "Script Agent",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      findings: {
        videoScripts: [
          {
            title: "YouTube Review Script",
            wordCount: 1850,
            readingTime: "12 min",
            structure: "Hook → Introduction → Features → Testing → Comparisons → Verdict → CTA",
            sampleExcerpt: "If you're a serious runner who's tired of inaccurate GPS tracking, the Forerunner 965 might just be the watch you've been waiting for..."
          },
          {
            title: "Instagram Reel Scripts (3x)",
            format: "Short-form",
            hooks: [
              "POV: You finally have accurate GPS data for every run",
              "This watch feature changed how I train",
              "23 days of battery life. Yes, really."
            ]
          }
        ],
        socialCaptions: [
          {
            platform: "Instagram",
            count: 4,
            style: "Motivational + informative",
            example: "📊 Your training data tells a story. The Forerunner 965 helps you write your best chapter yet. \n\nMulti-band GPS accuracy\n✓ Training readiness insights\n✓ AMOLED brilliance\n✓ 23-day battery life\n\nLink in bio to learn more 👆\n\n#GarminForerunner #RunningWatch #MarathonTraining #GPS #RunningTech"
          },
          {
            platform: "TikTok",
            count: 7,
            style: "Conversational + relatable",
            example: "POV: You check your training readiness and it says 'take a rest day' but you're feeling great... the watch knows something you don't 😅 #runningtok #garmin"
          }
        ],
        copyGuidelines: {
          tone: "Authentic, motivational, data-focused",
          voice: "Knowledgeable runner talking to fellow runners",
          language: "Clear technical terms, avoid jargon",
          cta: "Soft sell focused on learning more, not aggressive"
        },
        seoOptimization: [
          { keyword: "Forerunner 965 review", volume: "18K/mo", difficulty: "Medium" },
          { keyword: "GPS running watch accuracy", volume: "8.5K/mo", difficulty: "Low" },
          { keyword: "best running watch 2024", volume: "45K/mo", difficulty: "High" }
        ]
      }
    }
  ]
};

export default function AnalysisReview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phase = parseInt(searchParams.get("phase") || "1");

  const getAnalysisData = () => {
    switch (phase) {
      case 1: return phase1Analysis;
      case 2: return phase2Analysis;
      case 3: return phase3Analysis;
      default: return phase1Analysis;
    }
  };

  const analysis = getAnalysisData();

  const handleApprove = () => {
    if (phase < 3) {
      // Go back to agent processing with next phase
      navigate(`/agent-processing?phase=${phase + 1}`);
    } else {
      // All phases complete, go to campaign strategy
      navigate("/campaign-strategy");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Grid background */}
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

      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/agent-processing?phase=${phase}`)} 
            className="gap-2 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Processing
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

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white text-sm font-medium mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            Phase {phase} Complete
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {analysis.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {analysis.description}
          </p>
        </motion.div>

        {/* Analysis Sections */}
        <div className="space-y-8 mb-12">
          {analysis.sections.map((section, index) => {
            const AgentIcon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center relative`}>
                        <AgentIcon className="w-8 h-8 text-white" />
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.color} blur-xl opacity-50`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white flex items-center gap-2">
                          {section.agentName}
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </CardTitle>
                        <p className="text-sm text-gray-400 mt-1">Analysis complete and ready for review</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(section.findings).map(([key, value]) => (
                        <div key={key}>
                          <h4 className="text-lg font-bold text-white mb-3 capitalize flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-400" />
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <div className="pl-7">
                            {Array.isArray(value) ? (
                              <div className="space-y-3">
                                {value.map((item: any, idx: number) => (
                                  <div key={idx}>
                                    {typeof item === 'string' ? (
                                      <div className="flex items-start gap-2 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{item}</span>
                                      </div>
                                    ) : typeof item === 'object' && item !== null ? (
                                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                        {Object.entries(item).map(([subKey, subValue]) => (
                                          <div key={subKey} className="mb-2 last:mb-0">
                                            <span className="text-gray-400 text-sm capitalize">{subKey.replace(/([A-Z])/g, ' $1')}: </span>
                                            <span className="text-white font-medium">
                                              {typeof subValue === 'object' && subValue !== null
                                                ? JSON.stringify(subValue, null, 2)
                                                : String(subValue)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            ) : typeof value === 'object' && value !== null ? (
                              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                                {Object.entries(value).map(([subKey, subValue]) => (
                                  <div key={subKey}>
                                    <p className="text-sm text-gray-400 mb-1 capitalize">{subKey.replace(/([A-Z])/g, ' $1')}</p>
                                    {Array.isArray(subValue) ? (
                                      <div className="space-y-2">
                                        {subValue.map((subItem: any, subIdx: number) => (
                                          <div key={subIdx} className="pl-4 border-l-2 border-purple-500/30">
                                            {typeof subItem === 'string' ? (
                                              <p className="text-gray-300">{subItem}</p>
                                            ) : typeof subItem === 'object' && subItem !== null ? (
                                              <div className="text-sm space-y-1">
                                                {Object.entries(subItem).map(([k, v]) => (
                                                  <div key={k}>
                                                    <span className="text-gray-400">{k}: </span>
                                                    <span className="text-white font-medium">{String(v)}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            ) : null}
                                          </div>
                                        ))}
                                      </div>
                                    ) : typeof subValue === 'object' && subValue !== null ? (
                                      <div className="pl-4 text-sm space-y-1">
                                        {Object.entries(subValue).map(([k, v]) => (
                                          <div key={k}>
                                            <span className="text-gray-400">{k}: </span>
                                            <span className="text-white font-medium">{String(v)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-white font-medium">{String(subValue)}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-300">{String(value)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="sticky bottom-8"
        >
          <Card className="bg-gradient-to-r from-purple-900/40 via-black/60 to-pink-900/40 border-2 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Ready to proceed?</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {phase < 3 
                        ? "Review the analysis above and approve to move to the next phase"
                        : "Review the content assets and approve to finalize your campaign"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApprove}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    {phase === 3 ? "Approve & Continue" : "Approve & Next Phase"}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
