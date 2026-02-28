import { useNavigate } from "react-router";
import { ArrowLeft, Cookie, Shield, BarChart3, Settings, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export default function CookiesPolicy() {
  const navigate = useNavigate();

  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      color: "from-green-500 to-emerald-500",
      required: true,
      description: "These cookies are necessary for the platform to function and cannot be disabled.",
      examples: [
        "Session authentication tokens",
        "User preferences and settings",
        "Security and fraud prevention",
        "Load balancing and performance",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      color: "from-blue-500 to-cyan-500",
      required: false,
      description: "Help us understand how you use Agentcy to improve our service.",
      examples: [
        "Page views and navigation paths",
        "Feature usage statistics",
        "Performance metrics",
        "Error tracking and debugging",
      ],
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      color: "from-purple-500 to-pink-500",
      required: false,
      description: "Enable enhanced functionality and personalization.",
      examples: [
        "AI agent preferences",
        "Dashboard customizations",
        "Campaign history",
        "Saved templates and assets",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
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
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Cookie Policy</h1>
              <p className="text-xs text-gray-400">Last updated: February 28, 2026</p>
            </div>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Understanding how Agentcy uses cookies to power your AI marketing platform
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-2 border-white/10 bg-black/60 backdrop-blur-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit our platform. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and enabling our AI agents to work efficiently.
              </p>
              <p className="text-gray-300 leading-relaxed">
                At Agentcy, we use cookies responsibly to maintain your session, optimize our AI orchestration system, and continuously improve our platform based on how it's used.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cookie Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-purple-500/30 transition-all">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl text-white">{type.title}</CardTitle>
                            {type.required ? (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                Required
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                Optional
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-gray-400">{type.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Examples:</h4>
                      <ul className="space-y-2">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI-Specific Cookie Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/30 via-black/80 to-pink-900/20 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <AlertCircle className="w-6 h-6 text-purple-400" />
                <CardTitle className="text-2xl text-white">AI Agent Orchestration</CardTitle>
              </div>
              <CardDescription className="text-gray-400 text-base">
                How cookies power your AI marketing experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Agentcy uses cookies to maintain state across our 6 specialized AI agents (Extractor, Master, Marketing, Legal, Creative, and Distribution). This ensures:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Session Continuity</h4>
                  <p className="text-sm text-gray-400">Your campaigns and agent progress are preserved across page refreshes</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Agent Memory</h4>
                  <p className="text-sm text-gray-400">AI agents remember your brand guidelines and previous outputs</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Real-Time Optimization</h4>
                  <p className="text-sm text-gray-400">Performance data helps agents improve content generation</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Multi-Platform Sync</h4>
                  <p className="text-sm text-gray-400">Seamless distribution across YouTube, Instagram, and more</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <Card className="border-2 border-white/10 bg-black/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Third-Party Services</CardTitle>
              <CardDescription className="text-gray-400">
                We work with trusted partners to enhance your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-white mb-1">Analytics Providers</h4>
                  <p className="text-sm text-gray-400">Help us understand platform usage and performance</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-purple-500">
                  <h4 className="font-semibold text-white mb-1">AI Model Providers</h4>
                  <p className="text-sm text-gray-400">Power our multimodal AI agents with cutting-edge technology</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-4 border-pink-500">
                  <h4 className="font-semibold text-white mb-1">Content Delivery Networks</h4>
                  <p className="text-sm text-gray-400">Ensure fast loading of generated marketing assets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className="border-2 border-white/10 bg-black/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                You can control cookie settings through your browser. However, please note that disabling essential cookies will prevent Agentcy from functioning properly. Here's how to manage cookies in popular browsers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Google Chrome</h4>
                  <p className="text-sm text-gray-400">Settings → Privacy and security → Cookies and other site data</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Mozilla Firefox</h4>
                  <p className="text-sm text-gray-400">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Safari</h4>
                  <p className="text-sm text-gray-400">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Microsoft Edge</h4>
                  <p className="text-sm text-gray-400">Settings → Privacy → Cookies and site permissions</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-200 mb-1">Important Notice</p>
                    <p className="text-sm text-yellow-100/80">
                      Blocking essential cookies will prevent you from logging in and using core platform features, including AI agent orchestration.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact & Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
          <Card className="border-2 border-white/10 bg-black/60 backdrop-blur-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about our cookie policy or how we use cookies on Agentcy, please contact us at:
              </p>
              <div className="flex flex-col gap-2 text-gray-400">
                <p>📧 Email: <span className="text-purple-400">privacy@agentcy.ai</span></p>
                <p>🌐 Website: <span className="text-purple-400">www.agentcy.ai/privacy</span></p>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <p className="text-sm text-purple-200">
                  <strong>Last Updated:</strong> February 28, 2026<br />
                  We may update this cookie policy from time to time. We'll notify you of significant changes via email or platform notification.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <Card className="border-2 border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-black/60 to-pink-900/30 backdrop-blur-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Marketing?</h2>
              <p className="text-gray-400 mb-6">
                Start using Agentcy's AI-powered platform today
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => navigate("/")}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
