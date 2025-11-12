import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Practices from "./pages/Practices";
import Submit from "./pages/Submit";
import Highlights from "./pages/Highlights";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import EnviarPratica from "./pages/EnviarPratica";
import admin from "@/pages/admin";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practices" element={<Practices />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/about" element={<About />} />
            <Route path="/enviar-pratica" element={<EnviarPratica />} />
            <Route path="/admin" element={<admin />} />


            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
