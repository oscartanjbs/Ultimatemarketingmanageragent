import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Youtube,
  Share2,
  Instagram,
  Palette,
  Mail,
  Calendar,
  BarChart3,
  Sparkles,
  Menu,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "YouTube", href: "/dashboard/youtube", icon: Youtube },
  { name: "Social Media", href: "/dashboard/social-media", icon: Share2 },
  { name: "Instagram Studio", href: "/dashboard/instagram", icon: Instagram },
  { name: "Poster Design", href: "/dashboard/poster-design", icon: Palette },
  { name: "Email Marketing", href: "/dashboard/email", icon: Mail },
  { name: "Campaign Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card hidden lg:block">
        <div className="flex h-full flex-col gap-6 p-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">
                Agent<span className="text-purple-500">cy</span>
              </h1>
              <p className="text-xs text-muted-foreground">AI Marketing Platform</p>
            </div>
          </div>
          <NavLinks />
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">
                  Agent<span className="text-purple-500">cy</span>
                </h1>
                <p className="text-xs text-muted-foreground">AI Marketing Platform</p>
              </div>
            </div>
            <NavLinks />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold">
            Agent<span className="text-purple-500">cy</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}