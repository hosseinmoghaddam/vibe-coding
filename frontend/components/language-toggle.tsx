'use client';

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/context/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { toggleDirection, currentLang } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDirection}
      className="relative"
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="absolute text-[0.7rem] font-bold">
        {currentLang.toUpperCase()}
      </span>
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}
