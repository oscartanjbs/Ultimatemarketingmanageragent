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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
          <p className="text-muted-foreground">Preparing your campaign strategy...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Overall Progress */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Brain className="w-4 h-4 animate-pulse" />
            AI Agents Processing
          </div>
          <h2 className="text-3xl font-bold mb-2">Analyzing Your Product</h2>
          <p className="text-muted-foreground mb-6">
            Our AI agents are working together to create your perfect marketing strategy
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-bold">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid gap-4 mb-8">
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
                  className={`transition-all ${
                    isActive 
                      ? "border-purple-300 shadow-lg scale-105 bg-gradient-to-r from-purple-50 to-pink-50" 
                      : isCompleted
                      ? "border-green-200 bg-green-50/50"
                      : "opacity-60"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center flex-shrink-0 ${
                        isActive ? "animate-pulse" : ""
                      }`}>
                        {isCompleted ? (
                          <Check className="w-7 h-7 text-white" />
                        ) : (
                          <AgentIcon className="w-7 h-7 text-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{agent.name}</h3>
                          {isActive && (
                            <Loader2 className={`w-5 h-5 ${agent.color} animate-spin`} />
                          )}
                          {isCompleted && (
                            <span className="text-sm text-green-600 font-medium">Complete</span>
                          )}
                          {isPending && (
                            <span className="text-sm text-muted-foreground">Pending</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

                        {/* Task List */}
                        {isActive && (
                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {agent.tasks.map((task, taskIdx) => (
                              <AnimatePresence key={taskIdx}>
                                {taskIdx <= currentTaskIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex items-center gap-2 text-sm ${
                                      taskIdx < currentTaskIndex ? "text-muted-foreground" : "text-foreground font-medium"
                                    }`}
                                  >
                                    {taskIdx < currentTaskIndex ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Loader2 className={`w-4 h-4 ${agent.color} animate-spin`} />
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
                            className="flex items-center gap-2 text-sm text-green-600"
                          >
                            <Check className="w-4 h-4" />
                            <span>All tasks completed successfully</span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Progress bar for active agent */}
                    {isActive && (
                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Progress 
                          value={(currentTaskIndex / agent.tasks.length) * 100} 
                          className="h-2"
                        />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Agent Status Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">
                    {completedAgents.length} of {agents.length} Agents Complete
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Currently processing: <span className="font-medium text-foreground">{currentAgent.name}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {agents.map((agent, index) => (
                  <div
                    key={agent.id}
                    className={`w-3 h-3 rounded-full transition-all ${
                      completedAgents.includes(agent.id)
                        ? "bg-green-500"
                        : index === currentAgentIndex
                        ? "bg-purple-500 animate-pulse scale-125"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
