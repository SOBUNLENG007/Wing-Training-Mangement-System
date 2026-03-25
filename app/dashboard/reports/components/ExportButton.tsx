import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  function handleExport() {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  }

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-slate-700 shadow-sm hover:bg-slate-50 active:scale-95"
    >
      {isExporting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#1f6fff]" />
      ) : (
        <Download className="mr-2 h-4 w-4 text-slate-400" />
      )}
      {isExporting ? "Generating PDF..." : "Export All"}
    </Button>
  );
}
