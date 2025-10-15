import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Surveillance from "./pages/Surveillance";
import Map from "./pages/Map";
import Animals from "./pages/Animals";
import Safari from "./pages/Safari";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/surveillance" component={Surveillance} />
        <Route path="/map" component={Map} />
        <Route path="/animals" component={Animals} />
        <Route path="/safari" component={Safari} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
