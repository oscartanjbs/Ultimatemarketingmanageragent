import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Sparkles, Check, Loader2, Brain, TrendingUp, 
  Shield, Palette, Radio, FileSearch, Network
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
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

const agents: Agent[] = [
  {
    id: "extractor",
    name: "Extractor Agent",
    description: "Analyzing product images and extracting key information",
    icon: FileSearch,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    tasks: [
      "Processing image data...",
      "Detecting product features...",
      "Identifying colors and materials...",
      "Extracting text and labels...",
      "Analyzing visual composition..."
    ]
  },
  {
    id: "master",
    name: "Master Agent",
    description: "Coordinating all agents and building strategy framework",
    icon: Network,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    tasks: [
      "Synthesizing extracted data...",
      "Building product profile...",
      "Identifying target audience...",
      "Creating strategic framework...",
      "Coordinating agent workflows..."
    ]
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    description: "Developing platform strategies and content recommendations",
    icon: TrendingUp,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    tasks: [
      "Analyzing market trends...",
      "Identifying best platforms...",
      "Creating content strategy...",
      "Calculating engagement metrics...",
      "Optimizing posting schedule..."
    ]
  },
  {
    id: "legal",
    name: "Legal Agent",
    description: "Ensuring compliance and reviewing content guidelines",
    icon: Shield,
    color: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
    tasks: [
      "Checking trademark compliance...",
      "Reviewing content guidelines...",
      "Validating copyright usage...",
      "Ensuring platform policies...",
      "Flagging potential issues..."
    ]
  },
  {
    id: "creative",
    name: "Creative Agent",
    description: "Generating engaging copy, captions, and visual concepts",
    icon: Palette,
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    tasks: [
      "Crafting compelling headlines...",
      "Writing platform-specific copy...",
      "Generating hashtag strategy...",
      "Creating visual concepts...",
      "Developing brand voice..."
    ]
  },
  {
    id: "distribution",
    name: "Distribution Agent",
    description: "Planning content distribution and scheduling strategy",
    icon: Radio,
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
    tasks: [
      "Analyzing optimal posting times...",
      "Creating content calendar...",
      "Planning cross-platform strategy...",
      "Setting up automation flows...",
      "Finalizing distribution plan..."
    ]
  }
];

export default function AgentProcessing() {
  const navigate = useNavigate();
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  const currentAgent = agents[currentAgentIndex];
  const isComplete = currentAgentIndex >= agents.length;

  useEffect(() => {
    if (isComplete) {
      // Wait a moment to show completion state, then navigate
      const timer = setTimeout(() => {
        navigate("/campaign-strategy");
      }, 2000);
      return () => clearTimeout(timer);
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
    }, 800); // Each task takes 800ms

    return () => clearInterval(taskTimer);
  }, [currentAgentIndex, currentAgent, isComplete, navigate]);

  useEffect(() => {
    // Update overall progress
    const agentProgress = (currentAgentIndex / agents.length) * 100;
    const taskProgress = (currentTaskIndex / (currentAgent?.tasks.length || 1)) * (100 / agents.length);
    setOverallProgress(Math.min(agentProgress + taskProgress, 100));
  }, [currentAgentIndex, currentTaskIndex, currentAgent]);

  if (isComplete) {
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
          className="relative z-10"
        >
          <Card className="max-w-md w-full bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2 text-white">All Agents Complete!</h2>
              <p className="text-gray-400 mb-6">Your marketing strategy is ready</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/campaign-strategy")}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                View Campaign Strategy →
              </motion.button>
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
        {/* Overall Progress */}
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Brain className="w-4 h-4 animate-pulse text-purple-400" />
            AI Agents Processing
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-3 text-white"
          >
            Analyzing Your Product
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8 text-lg"
          >
            Our AI agents are working together to create your perfect marketing strategy
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400 font-medium">Overall Progress</span>
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
                      Currently processing: <span className="font-semibold text-purple-400">{currentAgent.name}</span>
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
      </div>
    </div>
  );
}