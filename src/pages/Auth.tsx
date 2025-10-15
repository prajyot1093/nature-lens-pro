import { useState } from "react";
import { useLocation } from "wouter";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to Tadoba Conservation!",
      });
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/20 p-4 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Welcome</h1>
          <p className="text-center text-foreground/70 mb-8">
            Sign in to access the conservation system
          </p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@tadoba.com"
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-foreground/70">
            <p>Default credentials: admin@tadoba.com / admin123</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
