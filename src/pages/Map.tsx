import { useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, AlertTriangle, Navigation as NavigationIcon } from "lucide-react";

export default function Map() {
  useEffect(() => {
    // Leaflet will be initialized here
    console.log("Map component mounted");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tracking Map</h1>
          <p className="text-foreground/70">Real-time wildlife location and geofencing</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="btn-glass gap-2">
            <NavigationIcon className="h-4 w-4" />
            My Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <GlassCard className="p-2 h-[600px]">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Map Loading</h3>
                <p className="text-foreground/70">Leaflet map with wildlife tracking will display here</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <GlassCard className="p-4">
            <h3 className="font-bold mb-4">Map Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">Active Tigers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">Leopards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Elephants</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-3 h-3 text-primary" />
                <span className="text-sm">Cameras</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-orange-500" />
                <span className="text-sm">Alert Zones</span>
              </div>
            </div>
          </GlassCard>

          {/* Active Animals */}
          <GlassCard className="p-4">
            <h3 className="font-bold mb-4">Active Animals</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Tiger T-101</span>
                  <Badge className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <p className="text-xs text-foreground/70">Zone A • 2 min ago</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Leopard L-205</span>
                  <Badge className="text-xs bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                    Moving
                  </Badge>
                </div>
                <p className="text-xs text-foreground/70">Zone C • 15 min ago</p>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">Elephant E-047</span>
                  <Badge className="text-xs bg-blue-500/20 text-blue-500 border-blue-500/30">
                    Detected
                  </Badge>
                </div>
                <p className="text-xs text-foreground/70">Zone B • 1 hour ago</p>
              </div>
            </div>
          </GlassCard>

          {/* Map Controls */}
          <GlassCard className="p-4">
            <h3 className="font-bold mb-4">Map Controls</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full btn-glass justify-start text-sm">
                Toggle Heat Map
              </Button>
              <Button variant="outline" className="w-full btn-glass justify-start text-sm">
                Show Geofences
              </Button>
              <Button variant="outline" className="w-full btn-glass justify-start text-sm">
                Camera Locations
              </Button>
              <Button variant="outline" className="w-full btn-glass justify-start text-sm">
                Animal Trails
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
