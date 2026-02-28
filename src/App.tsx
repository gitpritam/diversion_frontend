import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./layout";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <Layout />
    </TooltipProvider>
  );
}
