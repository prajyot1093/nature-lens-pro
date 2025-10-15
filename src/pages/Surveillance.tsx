import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Clock, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";

const detections = [
  {
    id: 1,
    species: "Bengal Tiger",
    camera: "Camera 12",
    zone: "Zone A",
    lat: 20.1234,
    lng: 79.3456,
    confidence: 98,
    timestamp: "2024-01-15 14:23:45",
    status: "active",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400",
  },
  {
    id: 2,
    species: "Leopard",
    camera: "Camera 7",
    zone: "Zone C",
    lat: 20.2345,
    lng: 79.4567,
    confidence: 95,
    timestamp: "2024-01-15 14:15:30",
    status: "moving",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400",
  },
  {
    id: 3,
    species: "Wild Elephant",
    camera: "Camera 19",
    zone: "Zone B",
    lat: 20.3456,
    lng: 79.5678,
    confidence: 99,
    timestamp: "2024-01-15 13:45:12",
    status: "detected",
    image: "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=400",
  },
  {
    id: 4,
    species: "Sloth Bear",
    camera: "Camera 5",
    zone: "Zone A",
    lat: 20.1567,
    lng: 79.3789,
    confidence: 92,
    timestamp: "2024-01-15 13:20:08",
    status: "detected",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400",
  },
  {
    id: 5,
    species: "Wild Boar",
    camera: "Camera 14",
    zone: "Zone C",
    lat: 20.2678,
    lng: 79.4890,
    confidence: 88,
    timestamp: "2024-01-15 12:55:22",
    status: "detected",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400",
  },
  {
    id: 6,
    species: "Spotted Deer",
    camera: "Camera 3",
    zone: "Zone B",
    lat: 20.3789,
    lng: 79.5901,
    confidence: 94,
    timestamp: "2024-01-15 12:30:45",
    status: "detected",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400",
  },
];

export default function Surveillance() {
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDetections = detections.filter((detection) => {
    const matchesSpecies = selectedSpecies === "all" || detection.species.toLowerCase().includes(selectedSpecies.toLowerCase());
    const matchesSearch = detection.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          detection.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          detection.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Surveillance</h1>
          <p className="text-foreground/70">Real-time wildlife detection feed powered by YOLOv8</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="btn-glass gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by species, camera, or zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10">
              <SelectValue placeholder="Filter by species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="tiger">Bengal Tiger</SelectItem>
              <SelectItem value="leopard">Leopard</SelectItem>
              <SelectItem value="elephant">Wild Elephant</SelectItem>
              <SelectItem value="bear">Sloth Bear</SelectItem>
              <SelectItem value="boar">Wild Boar</SelectItem>
              <SelectItem value="deer">Spotted Deer</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="btn-glass gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </GlassCard>

      {/* Detection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDetections.map((detection, index) => (
          <motion.div
            key={detection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover className="overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={detection.image}
                  alt={detection.species}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/90 text-primary-foreground border-0">
                    {detection.confidence}% confident
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge
                    className={`border-0 ${
                      detection.status === "active"
                        ? "bg-green-500/90"
                        : detection.status === "moving"
                        ? "bg-yellow-500/90"
                        : "bg-blue-500/90"
                    }`}
                  >
                    {detection.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{detection.species}</h3>
                
                <div className="space-y-2 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span>{detection.camera} • {detection.zone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{detection.timestamp}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button variant="outline" className="w-full btn-glass text-sm">
                    View Details
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" className="btn-glass">
          Load More Detections
        </Button>
      </div>
    </div>
  );
}
