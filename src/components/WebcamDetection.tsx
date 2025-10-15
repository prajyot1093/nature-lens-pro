import { useEffect, useRef, useState } from "react";
import { pipeline, env } from "@huggingface/transformers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/GlassCard";
import { Camera, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Configure transformers
env.allowLocalModels = false;
env.useBrowserCache = true;

interface Detection {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
}

interface WebcamDetectionProps {
  cameraId: string;
  cameraName: string;
  onClose: () => void;
}

export function WebcamDetection({ cameraId, cameraName, onClose }: WebcamDetectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const detectorRef = useRef<any>(null);
  const animationFrameRef = useRef<number>();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initializeCamera = async () => {
      try {
        // Request webcam access
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Load YOLO model
        toast({
          title: "Loading AI Model",
          description: "Initializing object detection...",
        });

        detectorRef.current = await pipeline(
          "object-detection",
          "Xenova/yolov9-c",
          { device: "webgpu" }
        );

        setIsLoading(false);
        setIsDetecting(true);

        toast({
          title: "Camera Active",
          description: "Wildlife detection is now running",
        });
      } catch (error) {
        console.error("Error initializing camera:", error);
        toast({
          title: "Camera Error",
          description: "Failed to access camera or load AI model",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    initializeCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDetecting || !videoRef.current || !canvasRef.current || !detectorRef.current) {
      return;
    }

    const detectObjects = async () => {
      if (!videoRef.current || !canvasRef.current || !detectorRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.readyState !== 4) {
        animationFrameRef.current = requestAnimationFrame(detectObjects);
        return;
      }

      try {
        // Run detection
        const results = await detectorRef.current(video, {
          threshold: 0.3,
          percentage: true,
        });

        // Filter for wildlife-related detections
        const wildlifeLabels = ['bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'];
        const wildlifeDetections = results.filter((det: Detection) =>
          wildlifeLabels.some(label => det.label.toLowerCase().includes(label))
        );

        setDetections(wildlifeDetections);

        // Draw detections on canvas
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          wildlifeDetections.forEach((detection: Detection) => {
            const { xmin, ymin, xmax, ymax } = detection.box;
            const x = xmin * canvas.width;
            const y = ymin * canvas.height;
            const width = (xmax - xmin) * canvas.width;
            const height = (ymax - ymin) * canvas.height;

            // Draw bounding box
            ctx.strokeStyle = "#22c55e";
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);

            // Draw label background
            ctx.fillStyle = "#22c55e";
            const label = `${detection.label} ${Math.round(detection.score * 100)}%`;
            const textWidth = ctx.measureText(label).width;
            ctx.fillRect(x, y - 25, textWidth + 10, 25);

            // Draw label text
            ctx.fillStyle = "#ffffff";
            ctx.font = "16px Inter";
            ctx.fillText(label, x + 5, y - 7);
          });

          // Save high-confidence detections to database
          wildlifeDetections.forEach(async (detection: Detection) => {
            if (detection.score > 0.7) {
              try {
                await supabase.from("detections").insert({
                  camera_id: cameraId,
                  species: detection.label,
                  confidence: detection.score,
                  location: cameraName,
                });
              } catch (error) {
                console.error("Error saving detection:", error);
              }
            }
          });
        }
      } catch (error) {
        console.error("Detection error:", error);
      }

      animationFrameRef.current = requestAnimationFrame(detectObjects);
    };

    detectObjects();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDetecting, cameraId, cameraName]);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">{cameraName}</h3>
          {isDetecting && (
            <Badge className="bg-green-500/90 border-0">
              Live
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-[480px] bg-black/20 rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm text-foreground/70">Loading camera and AI model...</p>
          </div>
        </div>
      )}

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full rounded-lg bg-black ${isLoading ? 'hidden' : ''}`}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      {detections.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Current Detections:</h4>
          <div className="flex flex-wrap gap-2">
            {detections.map((det, idx) => (
              <Badge key={idx} variant="outline" className="bg-primary/10 border-primary/20">
                {det.label} ({Math.round(det.score * 100)}%)
              </Badge>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}
