import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { 
  Sparkles, Check, Loader2, Brain, TrendingUp, 
  Lightbulb, Users, Target, Palette, Image as ImageIcon, 
  Video, FileText, StopCircle, ArrowRight, Eye
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "motion/react";

type Agent = {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  tasks: string[];
};

// Page 1: Strategy & Planning Agents
const page1Agents: Agent[] = [
  {
    id: "cmo",
    name: "CMO Agent",
    description: "Overseeing entire marketing strategy and campaign direction",
    icon: Brain,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    tasks: [
      "Analyzing business objectives...",
      "Defining campaign goals...",
      "Setting KPIs and success metrics...",
      "Coordinating all agent activities...",
      "Creating high-level strategy...",
    ]
  },
  {
    id: "research",
    name: "Research Agent",
    description: "Conducting market research and competitive analysis",
    icon: Target,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    tasks: [
      "Scanning market trends...",
      "Analyzing competitor strategies...",
      "Identifying target demographics...",
      "Researching consumer behavior...",
      "Compiling market insights...",
    ]
  },
  {
    id: "strategy",
    name: "Strategy Agent",
    description: "Developing comprehensive marketing strategy framework",
    icon: Lightbulb,
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    tasks: [
      "Building strategy framework...",
      "Defining messaging pillars...",
      "Creating positioning strategy...",
      "Planning customer journey...",
      "Finalizing strategic roadmap...",
    ]
  },
  {
    id: "creativity",
    name: "Creativity Agent",
    description: "Generating creative concepts and brand storytelling",
    icon: Palette,
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    tasks: [
      "Brainstorming creative concepts...",
      "Developing brand narratives...",
      "Crafting compelling copy...",
      "Designing visual themes...",
      "Creating content hooks...",
    ]
  },
];

// Page 2: Marketing Execution Agent
const page2Agents: Agent[] = [
  {
    id: "marketing",
    name: "Marketing Agent",
    description: "Executing multi-platform marketing campaigns and optimization",
    icon: TrendingUp,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    tasks: [
      "Selecting optimal platforms...",
      "Building content calendars...",
      "Crafting platform-specific strategies...",
      "Generating hashtag strategies...",
      "Optimizing posting schedules...",
      "Creating engagement tactics...",
      "Planning A/B testing...",
      "Setting up analytics tracking...",
    ]
  },
];

// Page 3: Content Creation Agents
const page3Agents: Agent[] = [
  {
    id: "image",
    name: "Image Agent",
    description: "Creating and optimizing visual content for all platforms",
    icon: ImageIcon,
    color: "text-cyan-500",
    gradient: "from-cyan-500 to-blue-500",
    tasks: [
      "Generating product visuals...",
      "Creating social media graphics...",
      "Designing Instagram stories...",
      "Optimizing image dimensions...",
      "Adding brand overlays...",
    ]
  },
  {
    id: "video",
    name: "Video Agent",
    description: "Producing engaging video content and animations",
    icon: Video,
    color: "text-red-500",
    gradient: "from-red-500 to-pink-500",
    tasks: [
      "Scripting video narratives...",
      "Creating video storyboards...",
      "Generating motion graphics...",
      "Editing promotional videos...",
      "Optimizing for each platform...",
    ]
  },
  {
    id: "script",
    name: "Script Agent",
    description: "Writing compelling scripts and copy for all content",
    icon: FileText,
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
    tasks: [
      "Writing video scripts...",
      "Crafting social media captions...",
      "Creating ad copy variations...",
      "Developing CTAs...",
      "Optimizing for SEO...",
    ]
  },
];

export default function AgentProcessing() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // 1, 2, or 3
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const getCurrentPageAgents = () => {
    switch (currentPage) {
      case 1: return page1Agents;
      case 2: return page2Agents;
      case 3: return page3Agents;
      default: return page1Agents;
    }
  };

  const agents = getCurrentPageAgents();
  const currentAgent = agents[currentAgentIndex];
  const isComplete = currentAgentIndex >= agents.length;

  useEffect(() => {
    if (isComplete) {
      // Show review step when all agents on current page are complete
      setShowReview(true);
      return;
    }

    if (isStopped) {
      return;
    }

    // Simulate task progress
    const taskTimer = setInterval(() => {
      setCurrentTaskIndex((prev) => {
        if (prev < currentAgent.tasks.length - 1) {
          return prev + 1;
        } else {
          // Move to next agent
          setCompletedAgents((completed) => [...completed, currentAgent.id]);
          setCurrentAgentIndex((agentIndex) => agentIndex + 1);
          return 0;
        }
      });
    }, 800);

    return () => clearInterval(taskTimer);
  }, [currentAgentIndex, currentAgent, isComplete, isStopped]);

  useEffect(() => {
    // Update overall progress
    const agentProgress = (currentAgentIndex / agents.length) * 100;
    const taskProgress = (currentTaskIndex / (currentAgent?.tasks.length || 1)) * (100 / agents.length);
    setOverallProgress(Math.min(agentProgress + taskProgress, 100));
  }, [currentAgentIndex, currentTaskIndex, currentAgent, agents.length]);

  const handleApprove = () => {
    if (currentPage < 3) {
      // Move to next page
      setCurrentPage(currentPage + 1);
      setCurrentAgentIndex(0);
      setCurrentTaskIndex(0);
      setCompletedAgents([]);
      setOverallProgress(0);
      setShowReview(false);
    } else {
      // All pages complete, go to campaign strategy
      navigate("/campaign-strategy");
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 1: return "Strategy & Planning";
      case 2: return "Marketing Execution";
      case 3: return "Content Creation";
      default: return "Processing";
    }
  };

  if (showReview) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-4">
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
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-2xl w-full"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
              >
                <Eye className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2 text-white">
                {currentPage === 1 && "Strategy Phase Complete!"}
                {currentPage === 2 && "Marketing Phase Complete!"}
                {currentPage === 3 && "Content Creation Complete!"}
              </h2>
              <p className="text-gray-400 mb-2">
                {currentPage === 1 && "Review the strategic foundation before moving to marketing execution"}
                {currentPage === 2 && "Review the marketing plan before content creation"}
                {currentPage === 3 && "Review all generated content before finalizing"}
              </p>
              
              {/* Show completed agents summary */}
              <div className="my-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <p className="text-sm text-gray-300 mb-3">Completed Agents:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white">{agent.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => {
                    setIsStopped(true);
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200"
                  onClick={() => navigate(`/analysis-review?phase=${currentPage}`)}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Analysis
                </Button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApprove}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {currentPage === 3 ? "Approve & Continue" : "Approve & Next Phase"}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Page Indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {[1, 2, 3].map((page) => (
            <div key={page} className="flex items-center gap-2">
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                currentPage === page 
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30" 
                  : currentPage > page
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-white/5 border border-white/10"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentPage === page
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                    : currentPage > page
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}>
                  {currentPage > page ? <Check className="w-5 h-5" /> : page}
                </div>
                <div className="text-sm">
                  <p className={`font-semibold ${currentPage === page ? "text-white" : "text-gray-400"}`}>
                    Phase {page}
                  </p>
                  <p className="text-xs text-gray-500">
                    {page === 1 ? "Strategy" : page === 2 ? "Marketing" : "Content"}
                  </p>
                </div>
              </div>
              {page < 3 && (
                <ArrowRight className="w-5 h-5 text-gray-600" />
              )}
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Brain className="w-4 h-4 animate-pulse text-purple-400" />
            {getPageTitle()}
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-3 text-white"
          >
            AI Agents Working
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8 text-lg"
          >
            {currentPage === 1 && "Building your strategic foundation"}
            {currentPage === 2 && "Planning your marketing execution"}
            {currentPage === 3 && "Creating your content assets"}
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400 font-medium">Phase Progress</span>
              <span className="font-bold text-white text-lg">{Math.round(overallProgress)}%</span>
            </div>
            <div className="relative">
              <Progress value={overallProgress} className="h-4 bg-white/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Agent Cards */}
        <div className="grid gap-6 mb-8">
          {agents.map((agent, index) => {
            const AgentIcon = agent.icon;
            const isActive = index === currentAgentIndex;
            const isCompleted = completedAgents.includes(agent.id);
            const isPending = index > currentAgentIndex;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`transition-all border-2 ${
                    isActive 
                      ? "border-purple-500/50 shadow-2xl shadow-purple-500/20 bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 backdrop-blur-xl scale-[1.02]" 
                      : isCompleted
                      ? "border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/60 backdrop-blur-xl"
                      : "border-white/10 bg-black/40 backdrop-blur-xl opacity-50"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center flex-shrink-0 ${
                        isActive ? "animate-pulse" : ""
                      }`}>
                        {isCompleted ? (
                          <Check className="w-8 h-8 text-white" />
                        ) : (
                          <AgentIcon className="w-8 h-8 text-white" />
                        )}
                        {isActive && (
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${agent.gradient} blur-xl opacity-60 animate-pulse`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                          {isActive && (
                            <Loader2 className={`w-5 h-5 ${agent.color} animate-spin`} />
                          )}
                          {isCompleted && (
                            <span className="px-3 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                              ✓ Complete
                            </span>
                          )}
                          {isPending && (
                            <span className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-500 rounded-full border border-white/10">
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{agent.description}</p>

                        {/* Task List */}
                        {isActive && (
                          <motion.div 
                            className="space-y-2.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {agent.tasks.map((task, taskIdx) => (
                              <AnimatePresence key={taskIdx}>
                                {taskIdx <= currentTaskIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex items-center gap-3 text-sm p-2.5 rounded-lg ${
                                      taskIdx < currentTaskIndex 
                                        ? "text-gray-500 bg-white/5" 
                                        : "text-white font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                                    }`}
                                  >
                                    {taskIdx < currentTaskIndex ? (
                                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    ) : (
                                      <Loader2 className={`w-4 h-4 ${agent.color} animate-spin flex-shrink-0`} />
                                    )}
                                    <span>{task}</span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            ))}
                          </motion.div>
                        )}

                        {/* Completed state summary */}
                        {isCompleted && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20"
                          >
                            <Check className="w-5 h-5" />
                            <span className="font-medium">All tasks completed successfully</span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Progress bar for active agent */}
                    {isActive && (
                      <motion.div
                        className="mt-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="relative">
                          <Progress 
                            value={(currentTaskIndex / agent.tasks.length) * 100} 
                            className="h-2.5 bg-white/10"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} rounded-full pointer-events-none opacity-30`} 
                            style={{ width: `${(currentTaskIndex / agent.tasks.length) * 100}%` }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Agent Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-900/30 via-black/60 to-pink-900/30 border-2 border-purple-500/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-white" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-white">
                      {completedAgents.length} of {agents.length} Agents Complete
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Currently processing: <span className="font-semibold text-purple-400">{currentAgent?.name || "Complete"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {agents.map((agent, index) => (
                    <div
                      key={agent.id}
                      className={`w-3 h-3 rounded-full transition-all ${
                        completedAgents.includes(agent.id)
                          ? "bg-green-500 shadow-lg shadow-green-500/50"
                          : index === currentAgentIndex
                          ? "bg-purple-500 animate-pulse scale-125 shadow-lg shadow-purple-500/50"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stop Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <Button
            onClick={() => {
              setIsStopped(true);
              navigate("/");
            }}
            variant="outline"
            size="lg"
            className="gap-2 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
          >
            <StopCircle className="w-5 h-5" />
            Stop Processing
          </Button>
        </motion.div>
      </div>
    </div>
  );
}