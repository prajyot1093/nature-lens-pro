import { Link, useLocation } from "wouter";
import { Shield, Home, BarChart3, Camera, Map, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/surveillance", label: "Surveillance", icon: Camera },
  { path: "/map", label: "Tracking Map", icon: Map },
  { path: "/animals", label: "Tiger Bloodline", icon: Heart },
  { path: "/safari", label: "Safari", icon: Calendar },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-lg">Tadoba Conservation</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <a>
                    <Button
                      variant="ghost"
                      className={cn(
                        "gap-2 transition-all duration-300",
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </a>
                </Link>
              );
            })}
          </div>

          <Link href="/auth">
            <a>
              <Button className="btn-primary">Sign In</Button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
