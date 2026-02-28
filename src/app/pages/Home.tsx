import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Package, Briefcase, Sparkles, ArrowRight, User, Camera, Video, Wand2, Upload, Brain, Zap, TrendingUp, Target, Globe, Cpu, Network, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { motion } from "motion/react";

const marketingOptions = [
  {
    id: "product",
    title: "Physical Product",
    description: "Capture your product with camera, generate 3D models, and auto-create content for all platforms",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    features: [
      { icon: Camera, text: "Camera capture (photo/video)" },
      { icon: Cpu, text: "AI 3D model generation" },
      { icon: Video, text: "Auto-generate videos from angles" },
      { icon: Wand2, text: "AI-written descriptions" },
      { icon: Upload, text: "Auto-upload to all platforms" }
    ],
  },
  {
    id: "service",
    title: "Service or Business",
    description: "Grow your service-based business and attract more clients across all marketing channels",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    features: [
      { icon: Target, text: "Lead generation campaigns" },
      { icon: Sparkles, text: "Professional branding" },
      { icon: TrendingUp, text: "Case study showcases" },
      { icon: Zap, text: "Email nurture sequences" },
      { icon: Globe, text: "Multi-platform social strategy" }
    ],
  }
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
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
  );
}

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

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGetStarted = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === "product") {
      navigate("/product-capture");
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <GridBackground />
      <FloatingParticles />
      
      {/* Radial gradient that follows mouse */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative">
              <Sparkles className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-50" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Agent<span className="text-purple-400">cy</span>
              </h1>
              <p className="text-xs text-gray-400">AI Marketing Platform</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/dashboard">
              <Button variant="outline" className="gap-2 border-white/20 bg-white/5 hover:bg-white/10 text-white">
                <User className="w-4 h-4" />
                My Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powered by Advanced AI Agents
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              What Would You Like to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Market Today?
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose your path and let our AI agent network orchestrate a comprehensive marketing strategy across all channels
          </motion.p>

          {/* AI Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-8 flex-wrap mb-12"
          >
            {[
              { icon: Cpu, label: "6 AI Agents", value: "Working in Parallel" },
              { icon: Zap, label: "Real-Time", value: "Processing" },
              { icon: Network, label: "Multi-Channel", value: "Distribution" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-sm font-bold">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Marketing Options - Futuristic Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {marketingOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => handleGetStarted(option.id)}
                className="cursor-pointer"
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/50 transition-all duration-300 group backdrop-blur-xl">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-20 blur-2xl animate-pulse`} />
                  </div>

                  <CardHeader className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white relative z-10" />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                    </div>
                    <CardTitle className="text-3xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-400">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative">
                    {/* AI Features Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      {option.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}>
                              <FeatureIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-300">{feature.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 transition-opacity text-white font-bold py-6 text-lg relative overflow-hidden group/btn`}
                      size="lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Start with AI
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* AI Agents Showcase */}
      <section className="relative border-t border-white/10 py-20 lg:py-32 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                6 AI Agents
              </span>
              <br />
              Working in Harmony
            </h2>
            <p className="text-lg text-gray-400">
              Our specialized AI agents collaborate to deliver comprehensive marketing solutions
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Extractor Agent", desc: "Analyzes product data & features", color: "from-blue-500 to-cyan-500" },
              { icon: Network, title: "Master Agent", desc: "Orchestrates strategy framework", color: "from-purple-500 to-pink-500" },
              { icon: TrendingUp, title: "Marketing Agent", desc: "Develops platform strategies", color: "from-green-500 to-emerald-500" },
              { icon: Shield, title: "Legal Agent", desc: "Ensures compliance & guidelines", color: "from-amber-500 to-orange-500" },
              { icon: Sparkles, title: "Creative Agent", desc: "Generates engaging content", color: "from-pink-500 to-rose-500" },
              { icon: Globe, title: "Distribution Agent", desc: "Plans multi-channel delivery", color: "from-indigo-500 to-purple-500" },
            ].map((agent, index) => {
              const AgentIcon = agent.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-purple-500/50 transition-all backdrop-blur-xl h-full group">
                    <CardContent className="pt-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mx-auto mb-4 relative group-hover:scale-110 transition-transform`}>
                        <AgentIcon className="w-8 h-8 text-white relative z-10" />
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                      </div>
                      <h3 className="font-bold mb-2 text-white text-lg">{agent.title}</h3>
                      <p className="text-sm text-gray-400">{agent.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-white/10 py-20 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Marketing?
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of businesses using AI to amplify their brand and drive results
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-6 text-lg relative overflow-hidden group"
              onClick={() => navigate("/product-capture")}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Brain className="w-6 h-6" />
                Start Free Campaign
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Campaign Setup Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl bg-black border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us About Your {marketingOptions.find(o => o.id === selectedOption)?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Provide some details so our AI can create the perfect marketing strategy for you
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                {selectedOption === "product" ? "Product Name" : "Service Name"}
              </Label>
              <Input 
                id="name" 
                placeholder="Enter a name..." 
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what makes it unique..."
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-audience" className="text-gray-300">Target Audience</Label>
                <Input 
                  id="target-audience" 
                  placeholder="e.g., 25-40 year olds" 
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-gray-300">Marketing Budget</Label>
                <Select>
                  <SelectTrigger id="budget" className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    <SelectItem value="small">$500 - $2,000</SelectItem>
                    <SelectItem value="medium">$2,000 - $10,000</SelectItem>
                    <SelectItem value="large">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals" className="text-gray-300">Marketing Goals</Label>
              <Textarea
                id="goals"
                placeholder="What do you want to achieve? (e.g., brand awareness, sales, leads)"
                rows={3}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" 
                asChild
              >
                <Link to="/dashboard">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Campaign
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
