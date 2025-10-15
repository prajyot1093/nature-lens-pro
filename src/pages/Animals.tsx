import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MapPin, Calendar, Activity, Search, Filter, Plus } from "lucide-react";
import { motion } from "framer-motion";

const animals = [
  {
    id: "T-101",
    name: "Bamera",
    species: "Bengal Tiger",
    age: 8,
    gender: "Male",
    status: "Active",
    lastSeen: "Zone A, 2 hours ago",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    health: "Excellent",
    territory: "Sector 1-3",
  },
  {
    id: "T-102",
    name: "Maya",
    species: "Bengal Tiger",
    age: 6,
    gender: "Female",
    status: "Active",
    lastSeen: "Zone B, 30 min ago",
    image: "https://images.unsplash.com/photo-1615963244664-5b845b2025ee?w=400",
    health: "Good",
    territory: "Sector 4-5",
  },
  {
    id: "L-205",
    name: "Shadow",
    species: "Indian Leopard",
    age: 5,
    gender: "Male",
    status: "Active",
    lastSeen: "Zone C, 1 hour ago",
    image: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400",
    health: "Excellent",
    territory: "Sector 6-7",
  },
  {
    id: "E-047",
    name: "Ganesha",
    species: "Asian Elephant",
    age: 25,
    gender: "Male",
    status: "Monitored",
    lastSeen: "Zone B, 3 hours ago",
    image: "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=400",
    health: "Good",
    territory: "Sector 2-4",
  },
  {
    id: "T-103",
    name: "Raju",
    species: "Bengal Tiger",
    age: 4,
    gender: "Male",
    status: "Active",
    lastSeen: "Zone A, 45 min ago",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400",
    health: "Excellent",
    territory: "Sector 1-2",
  },
  {
    id: "L-206",
    name: "Spotty",
    species: "Indian Leopard",
    age: 7,
    gender: "Female",
    status: "Active",
    lastSeen: "Zone C, 2 hours ago",
    image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400",
    health: "Good",
    territory: "Sector 7-8",
  },
];

export default function Animals() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tiger Bloodline</h1>
          <p className="text-foreground/70">Wildlife profiles and tracking database</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Add Animal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4">
          <div className="text-2xl font-bold text-primary">42</div>
          <div className="text-sm text-foreground/70">Total Animals</div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-2xl font-bold text-primary">18</div>
          <div className="text-sm text-foreground/70">Tigers</div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-foreground/70">Leopards</div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-2xl font-bold text-primary">8</div>
          <div className="text-sm text-foreground/70">Elephants</div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search by name, ID, or species..."
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10">
              <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="tiger">Bengal Tiger</SelectItem>
              <SelectItem value="leopard">Indian Leopard</SelectItem>
              <SelectItem value="elephant">Asian Elephant</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="monitored">Monitored</SelectItem>
              <SelectItem value="relocated">Relocated</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="btn-glass gap-2">
            <Filter className="h-4 w-4" />
            More
          </Button>
        </div>
      </GlassCard>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal, index) => (
          <motion.div
            key={animal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover className="overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={`border-0 ${
                      animal.status === "Active"
                        ? "bg-green-500/90"
                        : "bg-blue-500/90"
                    }`}
                  >
                    {animal.status}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-black/50 border-0">
                    {animal.id}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{animal.name}</h3>
                    <p className="text-sm text-foreground/70">{animal.species}</p>
                  </div>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Age</span>
                    <span className="font-medium">{animal.age} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Gender</span>
                    <span className="font-medium">{animal.gender}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Health</span>
                    <Badge className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      {animal.health}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Territory</span>
                    <span className="font-medium text-xs">{animal.territory}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{animal.lastSeen}</span>
                  </div>
                  <Button variant="outline" className="w-full btn-glass text-sm">
                    View Full Profile
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
