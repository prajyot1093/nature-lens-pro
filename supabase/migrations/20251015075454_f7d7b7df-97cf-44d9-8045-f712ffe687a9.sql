-- Create cameras table
CREATE TABLE IF NOT EXISTS public.cameras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'active',
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create detections table for AI wildlife detection
CREATE TABLE IF NOT EXISTS public.detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camera_id UUID REFERENCES public.cameras(id) ON DELETE CASCADE,
  species TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  image_url TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  location TEXT
);

-- Enable RLS
ALTER TABLE public.cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;

-- Public read access for cameras
CREATE POLICY "Anyone can view cameras"
  ON public.cameras FOR SELECT
  USING (true);

-- Public read access for detections
CREATE POLICY "Anyone can view detections"
  ON public.detections FOR SELECT
  USING (true);

-- Public insert access for detections (AI can add)
CREATE POLICY "Anyone can insert detections"
  ON public.detections FOR INSERT
  WITH CHECK (true);

-- Insert some default cameras
INSERT INTO public.cameras (name, location, status) VALUES
  ('Camera 1 - North Gate', 'Zone A', 'active'),
  ('Camera 2 - Waterhole', 'Zone B', 'active'),
  ('Camera 3 - Forest Trail', 'Zone C', 'active'),
  ('Camera 4 - East Border', 'Zone A', 'active'),
  ('Camera 5 - Lake View', 'Zone D', 'active')
ON CONFLICT DO NOTHING;

-- Enable realtime for detections
ALTER PUBLICATION supabase_realtime ADD TABLE public.detections;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_detections_camera_id ON public.detections(camera_id);
CREATE INDEX IF NOT EXISTS idx_detections_created_at ON public.detections(detected_at DESC);