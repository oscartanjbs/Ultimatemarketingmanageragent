import { useState, useEffect } from "react";
import { Settings, AlertTriangle, Circle, Cookie } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

export default function DisclaimerDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const hasAccepted = localStorage.getItem("agentcy-disclaimer-accepted");
    if (!hasAccepted) {
      // Small delay to ensure page has loaded
      setTimeout(() => setOpen(true), 500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("agentcy-disclaimer-accepted", "true");
    setOpen(false);
  };

  const handleDecline = () => {
    // Redirect to a different page or show a message
    window.location.href = "https://www.google.com";
  };

  const handleCookiePolicyClick = () => {
    setOpen(false);
    // Use setTimeout to ensure dialog closes before navigation
    setTimeout(() => {
      window.location.href = "/cookies-policy";
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-3xl bg-black border-2 border-white/20 text-white max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl text-white mb-2">Important Disclaimers</DialogTitle>
              <DialogDescription className="text-gray-400 text-base">
                Before continuing, please review our notices:
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cookies Section */}
          <div className="relative p-6 rounded-lg bg-gradient-to-br from-green-900/20 to-transparent border-l-4 border-green-500">
            <div className="flex items-start gap-4 mb-3">
              <Cookie className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  🍪 Site (Cookies & Session) - Desktop
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies to maintain your session, keep our orchestrator agents running smoothly, and improve your experience. By continuing to use the platform, you agree to our{" "}
                  <button 
                    onClick={handleCookiePolicyClick}
                    className="text-green-400 hover:underline cursor-pointer"
                  >
                    cookie policy
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Agentic Usage Warning */}
          <div className="relative p-6 rounded-lg bg-gradient-to-br from-blue-900/20 to-transparent border-l-4 border-blue-500">
            <div className="flex items-start gap-4 mb-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ⚠️ Agentic Usage (The Hallucination Guardrail)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-200">Notice:</span> You are operating an autonomous AI network. While our agents use state-of-the-art multimodal models, AI can occasionally hallucinate or misinterpret brand guidelines. Please review all generated assets carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Publishing Check */}
          <div className="relative p-6 rounded-lg bg-gradient-to-br from-red-900/20 to-transparent border-l-4 border-red-500">
            <div className="flex items-start gap-4 mb-3">
              <Circle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1 fill-current" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  🔴 Publishing (The Human-in-the-Loop Check)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-200">Final Review Required:</span> You are about to approve these assets for deployment. You are the final human-in-the-loop. By clicking 'Publish', you confirm that all video, audio, and copy have been reviewed for accuracy, brand safety, and quality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <Button
            variant="outline"
            size="lg"
            onClick={handleDecline}
            className="flex-1 border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white text-lg py-6"
          >
            Decline
          </Button>
          <Button
            size="lg"
            onClick={handleAccept}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold text-lg py-6"
          >
            I Understand & Accept
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 text-center pt-2">
          By accepting, you agree to our{" "}
          <button 
            onClick={handleCookiePolicyClick}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Cookie Policy
          </button>
          {" "}and acknowledge the AI usage disclaimers above.
        </p>
      </DialogContent>
    </Dialog>
  );
}