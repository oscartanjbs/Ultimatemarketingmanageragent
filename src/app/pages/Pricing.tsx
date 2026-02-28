import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Check, Sparkles, ArrowLeft, Zap, Crown, Rocket, Brain, TrendingUp, Shield, Infinity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";
import Footer from "../components/Footer";

type BillingCycle = "monthly" | "annual";

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for solo entrepreneurs and small businesses",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      "5 AI-generated campaigns per month",
      "2 platforms (YouTube + Instagram)",
      "Basic 3D product modeling",
      "1080p video generation",
      "Email support",
      "Campaign analytics",
      "10 GB cloud storage",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses and marketing teams",
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    monthlyPrice: 79,
    annualPrice: 790,
    popular: true,
    features: [
      "25 AI-generated campaigns per month",
      "All platforms (YouTube, Instagram, TikTok, Twitter, LinkedIn)",
      "Advanced 3D product modeling",
      "4K video generation",
      "Priority email & chat support",
      "Advanced analytics & A/B testing",
      "100 GB cloud storage",
      "Custom branding",
      "API access",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large teams and agencies",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    monthlyPrice: 199,
    annualPrice: 1990,
    features: [
      "Unlimited AI-generated campaigns",
      "All platforms + custom integrations",
      "Premium 3D modeling with AR support",
      "8K video generation",
      "24/7 phone, email & chat support",
      "White-label solution",
      "Unlimited cloud storage",
      "Dedicated account manager",
      "Custom AI agent training",
      "Advanced team collaboration",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
  },
];

const features = [
  {
    icon: Brain,
    title: "6 Specialized AI Agents",
    description: "Extractor, Master, Marketing, Legal, Creative, and Distribution agents working together",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Trend Analysis",
    description: "Stay ahead with AI-powered trend insights and predictive engagement metrics",
  },
  {
    icon: Shield,
    title: "Legal Compliance Check",
    description: "Automatic copyright and compliance verification for all generated content",
  },
  {
    icon: Infinity,
    title: "Multi-Platform Optimization",
    description: "Content automatically optimized for YouTube, Instagram, TikTok, and more",
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const navigate = useNavigate();

  const getPrice = (plan: typeof pricingPlans[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getSavings = (plan: typeof pricingPlans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice;
    return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Grid background */}
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

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
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
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required.
            <br />Scale your marketing with AI-powered automation.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Annual
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                Save 20%
              </Badge>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none px-4 py-1">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`relative h-full flex flex-col ${
                    plan.popular
                      ? "border-2 border-purple-500/50 bg-gradient-to-b from-purple-900/30 via-black/80 to-black/80 shadow-2xl shadow-purple-500/20 scale-105"
                      : "border-2 border-white/10 bg-black/60 backdrop-blur-xl"
                  }`}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                    
                    <div className="pt-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">${getPrice(plan)}</span>
                        <span className="text-gray-400">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                      </div>
                      {billingCycle === "annual" && (
                        <p className="text-sm text-green-400 mt-2">
                          Save ${plan.monthlyPrice * 12 - plan.annualPrice}/year ({getSavings(plan)}% off)
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          : `bg-gradient-to-r ${plan.color}`
                      }`}
                      size="lg"
                      onClick={() => navigate("/product-capture")}
                    >
                      {plan.cta}
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-400">All plans include these powerful features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="border-2 border-white/10 bg-black/40 backdrop-blur-xl h-full hover:border-purple-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <Card className="border-2 border-white/10 bg-gradient-to-br from-purple-900/20 via-black/80 to-pink-900/20 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Can I change plans later?</h3>
                <p className="text-gray-400">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400">We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Is there a free trial?</h3>
                <p className="text-gray-400">Yes! All plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">What happens if I exceed my campaign limit?</h3>
                <p className="text-gray-400">You'll be notified when approaching your limit. You can upgrade anytime or purchase additional campaigns.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-20"
        >
          <Card className="border-2 border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-black/60 to-pink-900/30 backdrop-blur-xl max-w-4xl mx-auto">
            <CardContent className="p-12">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Marketing?</h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of businesses using AI to scale their marketing efforts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
                  onClick={() => navigate("/product-capture")}
                >
                  Start Free Trial
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-lg px-8"
                  onClick={() => navigate("/")}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}