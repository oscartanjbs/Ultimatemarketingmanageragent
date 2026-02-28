import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Sparkles, CheckCircle2, Loader2, Youtube, Instagram, Facebook, Twitter, Linkedin, Mail, FileText, MessageSquare, Play } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "../components/ui/progress";

interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: "pending" | "logging-in" | "uploading" | "completed";
  progress: number;
}

export default function PublishingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPhase, setCurrentPhase] = useState<"authenticating" | "uploading" | "completed">("authenticating");
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Get selected platforms from navigation state
  const selectedPlatformNames = (location.state as any)?.selectedPlatforms || ["Instagram", "YouTube"];
  
  // Platform mapping with all available platforms
  const allPlatforms = [
    { id: "youtube", name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-600" },
    { id: "tiktok", name: "TikTok", icon: Play, color: "from-black to-gray-700" },
    { id: "reddit", name: "Reddit", icon: MessageSquare, color: "from-orange-500 to-red-500" },
    { id: "twitter", name: "Twitter/X", icon: Twitter, color: "from-sky-400 to-blue-500" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-700" },
  ];
  
  // Filter platforms based on selected platforms
  const initialPlatforms: Platform[] = allPlatforms
    .filter(p => selectedPlatformNames.includes(p.name))
    .map(p => ({ ...p, status: "pending" as const, progress: 0 }));
  
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);

  useEffect(() => {
    // Phase 1: Authenticate all platforms (0-40%)
    const authenticatePhase = async () => {
      for (let i = 0; i < platforms.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setPlatforms(prev => prev.map((p, idx) => 
          idx === i ? { ...p, status: "logging-in" } : p
        ));
        setOverallProgress(Math.floor((i + 1) / platforms.length * 40));
        
        await new Promise(resolve => setTimeout(resolve, 600));
        setPlatforms(prev => prev.map((p, idx) => 
          idx === i ? { ...p, status: "uploading", progress: 0 } : p
        ));
      }
      setCurrentPhase("uploading");
    };

    // Phase 2: Upload content to all platforms (40-100%)
    const uploadPhase = async () => {
      const uploadPromises = platforms.map(async (platform, idx) => {
        const delay = idx * 200; // Stagger the uploads
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 150));
          setPlatforms(prev => prev.map(p => 
            p.id === platform.id ? { ...p, progress } : p
          ));
        }
        
        setPlatforms(prev => prev.map(p => 
          p.id === platform.id ? { ...p, status: "completed", progress: 100 } : p
        ));
      });

      // Update overall progress during upload phase
      const progressInterval = setInterval(() => {
        setPlatforms(current => {
          const totalProgress = current.reduce((sum, p) => sum + p.progress, 0);
          const avgProgress = totalProgress / current.length;
          setOverallProgress(Math.floor(40 + (avgProgress / 100) * 60));
          
          // Check if all completed
          if (current.every(p => p.status === "completed")) {
            clearInterval(progressInterval);
            setCurrentPhase("completed");
            // No auto-redirect - user clicks button instead
          }
          
          return current;
        });
      }, 200);

      await Promise.all(uploadPromises);
    };

    const runFlow = async () => {
      await authenticatePhase();
      await uploadPhase();
    };

    runFlow();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative">
              <Sparkles className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Agent<span className="text-purple-400">cy</span>
              </h1>
              <p className="text-xs text-gray-400">Publishing Campaign</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Overall Progress Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative"
              >
                <Sparkles className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-50" />
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold mb-3">
              <AnimatePresence mode="wait">
                {currentPhase === "authenticating" && (
                  <motion.span
                    key="auth"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    Authenticating Platforms
                  </motion.span>
                )}
                {currentPhase === "uploading" && (
                  <motion.span
                    key="upload"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    Publishing Content
                  </motion.span>
                )}
                {currentPhase === "completed" && (
                  <motion.span
                    key="complete"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                  >
                    Campaign Published!
                  </motion.span>
                )}
              </AnimatePresence>
            </h2>
            
            <p className="text-gray-400 mb-6">
              {currentPhase === "authenticating" && "Securely connecting to your marketing platforms..."}
              {currentPhase === "uploading" && "Distributing your AI-generated content across all channels..."}
              {currentPhase === "completed" && "Your content has been successfully published!"}
            </p>

            {/* Overall Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-400">Overall Progress</span>
                <span className="text-purple-400 font-bold">{overallProgress}%</span>
              </div>
              <Progress 
                value={overallProgress} 
                className="h-3 bg-white/10 border border-white/20"
              />
            </div>
          </motion.div>

          {/* Platform Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`
                    border-2 backdrop-blur-xl transition-all duration-500
                    ${platform.status === "pending" ? "border-white/10 bg-white/5" : ""}
                    ${platform.status === "logging-in" ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-amber-500/5" : ""}
                    ${platform.status === "uploading" ? "border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/5" : ""}
                    ${platform.status === "completed" ? "border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/5" : ""}
                  `}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Platform Icon */}
                        <div className={`
                          w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative
                          bg-gradient-to-br ${platform.color}
                        `}>
                          <Icon className="w-7 h-7 text-white relative z-10" />
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platform.color} blur-lg opacity-50`} />
                        </div>

                        {/* Platform Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-white text-lg">{platform.name}</h3>
                            
                            {/* Status Icon */}
                            <div className="flex-shrink-0">
                              {platform.status === "pending" && (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-500 bg-gray-800" />
                              )}
                              {platform.status === "logging-in" && (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Loader2 className="w-6 h-6 text-yellow-400" />
                                </motion.div>
                              )}
                              {platform.status === "uploading" && (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Loader2 className="w-6 h-6 text-purple-400" />
                                </motion.div>
                              )}
                              {platform.status === "completed" && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                                </motion.div>
                              )}
                            </div>
                          </div>

                          {/* Status Text */}
                          <div className="mb-2">
                            <AnimatePresence mode="wait">
                              {platform.status === "pending" && (
                                <motion.p
                                  key="pending"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="text-sm text-gray-500"
                                >
                                  Waiting in queue...
                                </motion.p>
                              )}
                              {platform.status === "logging-in" && (
                                <motion.p
                                  key="logging"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-sm text-yellow-400 font-medium"
                                >
                                  🔐 Authenticating account...
                                </motion.p>
                              )}
                              {platform.status === "uploading" && (
                                <motion.p
                                  key="uploading"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-sm text-purple-400 font-medium"
                                >
                                  📤 Uploading content...
                                </motion.p>
                              )}
                              {platform.status === "completed" && (
                                <motion.p
                                  key="completed"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="text-sm text-green-400 font-medium"
                                >
                                  ✓ Published successfully
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Progress Bar for Uploading */}
                          {(platform.status === "uploading" || platform.status === "completed") && (
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Progress 
                                value={platform.progress} 
                                className="h-2 bg-white/10"
                              />
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">{platform.progress}%</span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Completion Message */}
          {currentPhase === "completed" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 relative"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 blur-xl opacity-50" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">All Set! 🎉</h3>
                  <p className="text-gray-400 mb-4">
                    Your campaign has been published to all selected platforms successfully!
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}