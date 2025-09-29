import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkerMonitoring from "./pages/WorkerMonitoring";
import Environment from "./pages/Environment";
import AIRisk from "./pages/AIRisk";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import WorkerProfiles from "./pages/WorkerProfiles";
import DeviceManagement from "./pages/DeviceManagement";
import TrainingMode from "./pages/TrainingMode";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workers" element={<WorkerMonitoring />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/ai-risk" element={<AIRisk />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profiles" element={<WorkerProfiles />} />
          <Route path="/devices" element={<DeviceManagement />} />
          <Route path="/training" element={<TrainingMode />} />
          <Route path="/admin" element={<AdminSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
