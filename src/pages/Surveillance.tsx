import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Clock, Download, Filter, Video } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { WebcamDetection } from "@/components/WebcamDetection";
import { useToast } from "@/hooks/use-toast";

interface Camera {
  id: string;
  name: string;
  location: string;
  status: string;
  is_live: boolean;
}

interface Detection {
  id: string;
  camera_id: string;
  species: string;
  confidence: number;
  detected_at: string;
  location: string;
}

export default function Surveillance() {
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const { toast } = useToast();

  // Fetch cameras
  useEffect(() => {
    const fetchCameras = async () => {
      const { data, error } = await supabase
        .from("cameras")
        .select("*")
        .eq("status", "active");

      if (error) {
        console.error("Error fetching cameras:", error);
        toast({
          title: "Error",
          description: "Failed to load cameras",
          variant: "destructive",
        });
      } else {
        setCameras(data || []);
      }
    };

    fetchCameras();
  }, []);

  // Fetch detections and subscribe to real-time updates
  useEffect(() => {
    const fetchDetections = async () => {
      const { data, error } = await supabase
        .from("detections")
        .select("*")
        .order("detected_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching detections:", error);
      } else {
        setDetections(data || []);
      }
    };

    fetchDetections();

    // Subscribe to real-time detection updates
    const channel = supabase
      .channel("detections")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "detections",
        },
        (payload) => {
          setDetections((prev) => [payload.new as Detection, ...prev].slice(0, 50));
          toast({
            title: "New Detection",
            description: `${(payload.new as Detection).species} detected!`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredDetections = detections.filter((detection) => {
    const matchesSpecies = selectedSpecies === "all" || detection.species.toLowerCase().includes(selectedSpecies.toLowerCase());
    const matchesSearch = detection.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          detection.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Surveillance</h1>
          <p className="text-foreground/70">Real-time wildlife detection powered by YOLOv9</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="btn-glass gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Live Camera Feed */}
      {selectedCamera && (
        <div className="mb-8">
          <WebcamDetection
            cameraId={selectedCamera.id}
            cameraName={selectedCamera.name}
            onClose={() => setSelectedCamera(null)}
          />
        </div>
      )}

      {/* Camera Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Cameras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cameras.map((camera) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard
                hover
                className="p-4 cursor-pointer"
                onClick={() => setSelectedCamera(camera)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{camera.name}</h3>
                    <p className="text-xs text-foreground/70">{camera.location}</p>
                    <Badge className="mt-1 bg-green-500/90 border-0 text-xs">
                      {camera.status}
                    </Badge>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
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

      {/* Recent Detections */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Detections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDetections.length === 0 ? (
            <div className="col-span-full">
              <GlassCard className="p-12 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-foreground/50" />
                <p className="text-foreground/70">No detections yet. Activate a camera to start detecting wildlife!</p>
              </GlassCard>
            </div>
          ) : (
            filteredDetections.map((detection, index) => (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{detection.species}</h3>
                      <Badge className="bg-primary/90 text-primary-foreground border-0">
                        {Math.round(detection.confidence * 100)}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{detection.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(detection.detected_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
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
