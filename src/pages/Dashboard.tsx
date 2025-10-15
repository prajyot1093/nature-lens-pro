import { GlassCard } from "@/components/GlassCard";
import { 
  Camera, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  Activity,
  Eye,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Animals", value: "42", change: "+5", icon: Activity, color: "text-primary" },
  { label: "Today's Alerts", value: "8", change: "+2", icon: AlertTriangle, color: "text-yellow-500" },
  { label: "Active Cameras", value: "24", change: "0", icon: Camera, color: "text-blue-500" },
  { label: "Recent Sightings", value: "156", change: "+12", icon: Eye, color: "text-emerald-500" },
];

const recentDetections = [
  {
    id: 1,
    species: "Bengal Tiger",
    location: "Zone A - Camera 12",
    time: "2 minutes ago",
    confidence: 98,
    status: "active",
  },
  {
    id: 2,
    species: "Leopard",
    location: "Zone C - Camera 7",
    time: "15 minutes ago",
    confidence: 95,
    status: "active",
  },
  {
    id: 3,
    species: "Wild Elephant",
    location: "Zone B - Camera 19",
    time: "1 hour ago",
    confidence: 99,
    status: "moving",
  },
];

const recentAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Tiger near settlement",
    message: "Bengal Tiger spotted 2km from village",
    time: "5 minutes ago",
    priority: "high",
  },
  {
    id: 2,
    type: "info",
    title: "Camera maintenance",
    message: "Camera 15 scheduled for maintenance",
    time: "1 hour ago",
    priority: "low",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-foreground/70">Real-time wildlife monitoring and analytics</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Add Animal
          </Button>
          <Button variant="outline" className="btn-glass gap-2">
            <AlertTriangle className="h-4 w-4" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-primary mt-1">{stat.change} today</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Detections */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Detections</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentDetections.map((detection) => (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{detection.species}</h3>
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {detection.confidence}% confident
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <MapPin className="h-3 w-3" />
                    {detection.location}
                  </div>
                  <p className="text-xs text-foreground/50 mt-1">{detection.time}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {detection.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Alerts */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Alerts</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.priority === "high"
                        ? "text-red-500"
                        : alert.priority === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          alert.priority === "high"
                            ? "border-red-500/30 text-red-500"
                            : alert.priority === "medium"
                            ? "border-yellow-500/30 text-yellow-500"
                            : "border-blue-500/30 text-blue-500"
                        }`}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/70 mb-1">{alert.message}</p>
                    <p className="text-xs text-foreground/50">{alert.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Analytics Chart Placeholder */}
      <GlassCard className="p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
        <div className="h-64 flex items-center justify-center text-foreground/50">
          <TrendingUp className="h-12 w-12 mb-2" />
        </div>
        <p className="text-center text-foreground/70">
          Analytics charts will display wildlife sighting trends and patterns
        </p>
      </GlassCard>
    </div>
  );
}
