import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, Clock, MapPin, Check } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const safariTypes = [
  {
    id: "jeep",
    name: "Jeep Safari",
    price: 3500,
    duration: "3 hours",
    capacity: "6 people",
    description: "Experience wildlife in comfort with our guided jeep safaris",
  },
  {
    id: "elephant",
    name: "Elephant Safari",
    price: 5000,
    duration: "2 hours",
    capacity: "4 people",
    description: "Get closer to nature on the back of trained elephants",
  },
  {
    id: "walking",
    name: "Walking Safari",
    price: 2000,
    duration: "4 hours",
    capacity: "8 people",
    description: "Intimate wildlife experience with expert naturalists",
  },
];

const timeSlots = [
  { id: "morning", label: "Morning (6:00 AM - 9:00 AM)", available: true },
  { id: "afternoon", label: "Afternoon (3:00 PM - 6:00 PM)", available: true },
  { id: "evening", label: "Evening (6:00 PM - 8:00 PM)", available: false },
];

export default function Safari() {
  const [date, setDate] = useState<Date>();
  const [selectedType, setSelectedType] = useState("jeep");
  const [guests, setGuests] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const { toast } = useToast();

  const selectedSafari = safariTypes.find((s) => s.id === selectedType);
  const totalPrice = selectedSafari ? selectedSafari.price * guests : 0;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Confirmed!",
      description: `Your ${selectedSafari?.name} has been booked for ${format(
        date || new Date(),
        "PPP"
      )}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Safari Booking</h1>
          <p className="text-foreground/70">Book your wildlife adventure experience</p>
        </div>
      </div>

      {/* Safari Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {safariTypes.map((safari, index) => (
          <motion.div
            key={safari.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard
              hover
              className={`p-6 cursor-pointer ${
                selectedType === safari.id ? "border-primary border-2" : ""
              }`}
              onClick={() => setSelectedType(safari.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold">{safari.name}</h3>
                {selectedType === safari.id && (
                  <div className="bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
              
              <p className="text-foreground/70 text-sm mb-4">{safari.description}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Clock className="h-4 w-4" />
                  <span>{safari.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Users className="h-4 w-4" />
                  <span>Up to {safari.capacity}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="text-2xl font-bold text-primary">
                  ₹{safari.price}
                  <span className="text-sm text-foreground/70 font-normal">/person</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
            
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <Label>Time Slot</Label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedSlot === slot.id
                          ? "border-primary bg-primary/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      } ${!slot.available && "opacity-50 cursor-not-allowed"}`}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{slot.label}</span>
                        {!slot.available && (
                          <Badge variant="destructive" className="text-xs">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 1234567890"
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Special Requirements (Optional)</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any special needs or preferences..."
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full btn-primary text-lg py-6">
                Confirm Booking - ₹{totalPrice.toLocaleString()}
              </Button>
            </form>
          </GlassCard>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-foreground/70 mb-1">Safari Type</div>
                <div className="font-semibold">{selectedSafari?.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-foreground/70 mb-1">Date</div>
                <div className="font-semibold">
                  {date ? format(date, "PPP") : "Not selected"}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-foreground/70 mb-1">Time Slot</div>
                <div className="font-semibold">
                  {timeSlots.find((s) => s.id === selectedSlot)?.label}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-foreground/70 mb-1">Guests</div>
                <div className="font-semibold">{guests} person(s)</div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70">Price per person</span>
                  <span className="font-semibold">₹{selectedSafari?.price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70">Number of guests</span>
                  <span className="font-semibold">× {guests}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                <span>Arrive 15 minutes before your scheduled time</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                <span>Wear comfortable clothing and sturdy shoes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                <span>Bring binoculars and camera equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                <span>Follow guide instructions at all times</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
