import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Package, Briefcase, Sparkles, ArrowRight, User, Camera, Video, Wand2, Upload, Instagram, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const marketingOptions = [
  {
    id: "product",
    title: "Physical Product",
    description: "Capture your product with camera, generate 3D models, and auto-create content for all platforms",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    features: [
      "📸 Camera capture (photo/video)",
      "🎯 AI 3D model generation",
      "🎬 Auto-generate videos from angles",
      "✍️ AI-written descriptions",
      "📱 Auto-upload to Instagram, YouTube, Reddit"
    ],
    workflow: [
      { icon: Camera, text: "Capture with camera" },
      { icon: Wand2, text: "AI creates 3D model" },
      { icon: Video, text: "Generate content" },
      { icon: Upload, text: "Auto-upload" }
    ]
  },
  {
    id: "service",
    title: "Service or Business",
    description: "Grow your service-based business and attract more clients across all marketing channels",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    features: [
      "🎯 Lead generation campaigns",
      "💼 Professional branding",
      "📊 Case study showcases",
      "📧 Email nurture sequences",
      "💬 Multi-platform social strategy"
    ],
    workflow: [
      { icon: Briefcase, text: "Define service" },
      { icon: Wand2, text: "AI creates strategy" },
      { icon: Upload, text: "Schedule posts" },
      { icon: Youtube, text: "Track results" }
    ]
  }
];

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === "product") {
      // For physical products, go directly to camera capture
      navigate("/product-capture");
    } else {
      // For services, show the form
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Agent<span className="text-purple-500">cy</span>
              </h1>
              <p className="text-xs text-muted-foreground">AI Marketing Platform</p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <User className="w-4 h-4" />
              My Account
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Marketing Solutions
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            What Would You Like to Market Today?
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your marketing journey and let our AI agent create a comprehensive strategy across all channels
          </p>
        </div>

        {/* Marketing Options */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {marketingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-purple-200"
                onClick={() => handleGetStarted(option.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{option.title}</CardTitle>
                  <CardDescription className="text-base">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Workflow visualization */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">How it works:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {option.workflow.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                          <div key={index} className="flex flex-col items-center gap-1">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.color} bg-opacity-10 flex items-center justify-center`}>
                              <StepIcon className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-xs text-center text-muted-foreground">{step.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">What you'll get:</p>
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li key={index} className="text-sm">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full group-hover:shadow-lg transition-shadow" size="lg">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              All-in-One Marketing Solution
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI agent handles every aspect of your marketing across all major channels
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              { title: "YouTube", desc: "Video campaigns & content", emoji: "🎥" },
              { title: "Social Media", desc: "Multi-platform posting", emoji: "📱" },
              { title: "Instagram", desc: "Stories, reels & posts", emoji: "📸" },
              { title: "Email Marketing", desc: "Automated sequences", emoji: "📧" },
              { title: "Poster Design", desc: "Physical marketing", emoji: "🎨" },
              { title: "Analytics", desc: "Real-time insights", emoji: "📊" },
              { title: "AI Content", desc: "Smart generation", emoji: "✨" },
              { title: "Scheduling", desc: "Campaign calendar", emoji: "📅" },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{feature.emoji}</div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of businesses using AI to grow their brand
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Start Free Campaign
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Campaign Setup Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us About Your {marketingOptions.find(o => o.id === selectedOption)?.title}
            </DialogTitle>
            <DialogDescription>
              Provide some details so our AI can create the perfect marketing strategy for you
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {selectedOption === "product" ? "Product Name" : "Service Name"}
              </Label>
              <Input id="name" placeholder="Enter a name..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what makes it unique..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input id="target-audience" placeholder="e.g., 25-40 year olds" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Marketing Budget</Label>
                <Select>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">$500 - $2,000</SelectItem>
                    <SelectItem value="medium">$2,000 - $10,000</SelectItem>
                    <SelectItem value="large">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Marketing Goals</Label>
              <Textarea
                id="goals"
                placeholder="What do you want to achieve? (e.g., brand awareness, sales, leads)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Channels (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {["YouTube", "Instagram", "Facebook", "Email", "LinkedIn", "TikTok", "Print/Posters", "Blog"].map((channel) => (
                  <label key={channel} className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{channel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600" asChild>
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