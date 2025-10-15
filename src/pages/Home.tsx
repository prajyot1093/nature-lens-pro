import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { BarChart3, Camera, MapPin, Calendar, Bell, FileText } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description: "Monitor wildlife populations, camera feeds, and alerts in one centralized system.",
  },
  {
    icon: Camera,
    title: "AI Surveillance",
    description: "YOLO-powered detection of unauthorized human and vehicle entry in protected zones.",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Track tiger and leopard movements with GPS-enabled collars for conservation insights.",
  },
  {
    icon: Calendar,
    title: "Safari Booking",
    description: "Digital booking system for wildlife safaris with real-time availability.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Instant notifications for wildlife near settlements and unauthorized forest entry.",
  },
  {
    icon: FileText,
    title: "Conservation Tools",
    description: "Complete forest management suite for officials and conservation efforts.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Tadoba Smart</span>
              <br />
              <span className="text-foreground">Conservation System</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl">
              Intelligent wildlife surveillance and conservation management platform featuring real-time tracking, AI-powered detection, and comprehensive forest management tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <a>
                  <Button size="lg" className="btn-primary text-lg px-8">
                    View Dashboard
                  </Button>
                </a>
              </Link>
              <Link href="/safari">
                <a>
                  <Button size="lg" variant="outline" className="btn-glass text-lg px-8">
                    Book Safari
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-foreground/70">
              Advanced technology for wildlife conservation and forest management
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={item}>
                  <GlassCard hover className="p-6 h-full">
                    <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Protecting Tadoba's Wildlife
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
              Our comprehensive system addresses critical wildlife conservation challenges through cutting-edge technology. From real-time surveillance to GPS tracking, we provide forest officials with the tools they need to protect endangered species.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <h3 className="text-2xl font-bold mb-2">24/7 Monitoring</h3>
                <p className="text-foreground/70">Continuous surveillance with AI-powered detection systems</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Real-Time Tracking</h3>
                <p className="text-foreground/70">GPS-enabled wildlife monitoring for better conservation</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Data-Driven Insights</h3>
                <p className="text-foreground/70">Analytics dashboard for informed decision-making</p>
              </div>
            </div>
            <Link href="/dashboard">
              <a>
                <Button size="lg" className="btn-primary text-lg px-8">
                  Explore Dashboard
                </Button>
              </a>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
