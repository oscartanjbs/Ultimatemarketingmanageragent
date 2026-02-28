import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Camera, Video, Upload, ArrowLeft, ArrowRight, Sparkles, Check, Loader2, Image as ImageIcon, AlertCircle, Brain, Wand2, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";

type CaptureMode = "photo" | "video" | "upload";
type ProcessingStep = "capture" | "processing" | "generating" | "complete";

export default function ProductCapture() {
  const navigate = useNavigate();
  const [captureMode, setCaptureMode] = useState<CaptureMode | null>(null);
  const [processingStep, setProcessingStep] = useState<ProcessingStep>("capture");
  const [progress, setProgress] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartCapture = async (mode: CaptureMode) => {
    setCaptureMode(mode);
    setCameraError(null);
    
    if (mode === "photo" || mode === "video") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: mode === "video"
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // Handle camera access errors gracefully
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") {
            setCameraError("Camera access was denied. Please allow camera access in your browser settings or upload a file instead.");
          } else if (err.name === "NotFoundError") {
            setCameraError("No camera found on this device. Please upload a file instead.");
          } else if (err.name === "NotReadableError") {
            setCameraError("Camera is already in use by another application. Please close other apps and try again.");
          } else {
            setCameraError("Unable to access camera. Please try uploading a file instead.");
          }
        } else {
          setCameraError("Unable to access camera. Please try uploading a file instead.");
        }
      }
    }
  };

  const handleCapture = () => {
    if (captureMode === "photo" && videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL("image/png");
        setCapturedMedia(imageUrl);
        stopCamera();
        startProcessing();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedMedia(e.target?.result as string);
        setCaptureMode("upload"); // Set capture mode so user knows how they captured
        startProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const startProcessing = () => {
    setProcessingStep("processing");
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 30 && processingStep === "processing") {
        setProcessingStep("generating");
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProcessingStep("complete");
      }
    }, 600);
  };

  const steps = [
    { id: "capture", label: "Capture Product", icon: Camera },
    { id: "processing", label: "Create 3D Model", icon: Sparkles },
    { id: "generating", label: "Generate Content", icon: Video },
    { id: "complete", label: "Ready to Upload", icon: Check }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.id === processingStep);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
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
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === getCurrentStepIndex();
              const isCompleted = index < getCurrentStepIndex();
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white scale-110" :
                      isCompleted ? "bg-green-500 text-white" :
                      "bg-gray-200 text-gray-400"
                    }`}>
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm text-center ${isActive ? "font-bold" : ""}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 mb-8 rounded ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {processingStep === "capture" && !captureMode && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Capture Your Product</h2>
                <p className="text-muted-foreground">
                  Choose how you'd like to capture your product for AI processing
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-blue-300" onClick={() => handleStartCapture("photo")}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-center">Take Photo</CardTitle>
                    <CardDescription className="text-center">
                      Use your camera to capture product images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      Open Camera
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-blue-300" onClick={() => handleStartCapture("video")}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-center">Record Video</CardTitle>
                    <CardDescription className="text-center">
                      Record a 360° video of your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      Start Recording
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-blue-300" onClick={() => fileInputRef.current?.click()}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-center">Upload File</CardTitle>
                    <CardDescription className="text-center">
                      Upload existing photos or videos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      Choose File
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {processingStep === "capture" && captureMode && !capturedMedia && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {captureMode === "photo" ? "Position Your Product" : "Record Your Product"}
                </CardTitle>
                <CardDescription>
                  {captureMode === "photo" 
                    ? "Center your product in the frame and ensure good lighting"
                    : "Slowly rotate around your product for best 3D results"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cameraError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Camera Access Error</AlertTitle>
                    <AlertDescription className="space-y-2">
                      <p>{cameraError}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setCaptureMode(null);
                          setCameraError(null);
                          fileInputRef.current?.click();
                        }}
                        className="mt-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File Instead
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                {!cameraError && (
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-dashed border-white/30 m-8 rounded-lg pointer-events-none" />
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { stopCamera(); setCaptureMode(null); setCameraError(null); }} className="flex-1">
                    Cancel
                  </Button>
                  {!cameraError && (
                    <Button onClick={handleCapture} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Camera className="w-4 h-4 mr-2" />
                      {captureMode === "photo" ? "Capture Photo" : "Stop Recording"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {(processingStep === "processing" || processingStep === "generating") && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  {processingStep === "processing" ? "Creating 3D Model..." : "Generating Marketing Content..."}
                </CardTitle>
                <CardDescription className="text-center">
                  {processingStep === "processing" 
                    ? "Our AI is analyzing your product and building a detailed 3D model"
                    : "Creating videos, photos, and descriptions optimized for each platform"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {capturedMedia && (
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img src={capturedMedia} alt="Captured product" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Processing Progress</span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "YouTube Video", icon: Video, status: progress > 25 ? "complete" : "pending" },
                    { label: "Instagram Reel", icon: ImageIcon, status: progress > 50 ? "complete" : "pending" },
                    { label: "Product Photos", icon: Camera, status: progress > 75 ? "complete" : "pending" },
                    { label: "Descriptions", icon: Sparkles, status: progress > 90 ? "complete" : "pending" }
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-lg border bg-white">
                        <ItemIcon className={`w-6 h-6 ${item.status === "complete" ? "text-green-500" : "text-gray-400"}`} />
                        <span className="text-xs text-center">{item.label}</span>
                        {item.status === "complete" && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* AI Agents Working */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground">AI Agents Working:</h3>
                  {[
                    { name: "3D Model Builder", icon: Wand2, color: "from-blue-500 to-cyan-500", active: progress < 40, completed: progress >= 40 },
                    { name: "Trend Analyzer", icon: TrendingUp, color: "from-purple-500 to-pink-500", active: progress >= 20 && progress < 60, completed: progress >= 60 },
                    { name: "Content Generator", icon: Sparkles, color: "from-orange-500 to-red-500", active: progress >= 40 && progress < 80, completed: progress >= 80 },
                    { name: "Platform Optimizer", icon: Target, color: "from-green-500 to-emerald-500", active: progress >= 60 && progress < 100, completed: progress >= 100 }
                  ].map((agent) => {
                    const AgentIcon = agent.icon;
                    return (
                      <div key={agent.name} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        agent.active ? "bg-white shadow-md border-blue-300" : 
                        agent.completed ? "bg-green-50 border-green-300" : 
                        "bg-gray-50 border-gray-200"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center ${
                            agent.active ? "animate-pulse" : ""
                          }`}>
                            <AgentIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{agent.name}</p>
                            {agent.active && (
                              <p className="text-xs text-muted-foreground">Processing...</p>
                            )}
                            {agent.completed && (
                              <p className="text-xs text-green-600">Completed</p>
                            )}
                            {!agent.active && !agent.completed && (
                              <p className="text-xs text-muted-foreground">Waiting...</p>
                            )}
                          </div>
                        </div>
                        {agent.completed && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                        {agent.active && (
                          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {processingStep === "complete" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Content Generated Successfully!</CardTitle>
                <CardDescription className="text-center">
                  Your marketing materials are ready to view
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Preview captured image */}
                  {capturedMedia && (
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={capturedMedia} alt="Your product" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Generated Content Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600">4</div>
                      <div className="text-sm text-muted-foreground">Videos Created</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-muted-foreground">Photos Generated</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
                      <div className="text-3xl font-bold text-orange-600">8</div>
                      <div className="text-sm text-muted-foreground">Platform Posts</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                      <div className="text-3xl font-bold text-green-600">1</div>
                      <div className="text-sm text-muted-foreground">3D Model</div>
                    </div>
                  </div>

                  {/* Sample Generated Content Preview */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Generated Content Preview:</h3>
                    <div className="grid gap-3">
                      <div className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start gap-3">
                          <Video className="w-5 h-5 text-blue-500 mt-1" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Instagram Reel (0:15)</p>
                            <p className="text-xs text-muted-foreground">360° product rotation with trending audio</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Ready</Badge>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start gap-3">
                          <ImageIcon className="w-5 h-5 text-purple-500 mt-1" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Product Photos (12)</p>
                            <p className="text-xs text-muted-foreground">Multiple angles, lifestyle shots, close-ups</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Ready</Badge>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border bg-white">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-orange-500 mt-1" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">AI-Written Descriptions</p>
                            <p className="text-xs text-muted-foreground">Optimized for Instagram, YouTube, Reddit, TikTok</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Ready</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                      Capture Another
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500" onClick={() => navigate("/agent-processing")}>
                      View Strategy & Recommendations
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}