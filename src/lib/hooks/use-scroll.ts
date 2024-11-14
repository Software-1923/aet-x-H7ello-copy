// src/lib/hooks/use-scroll.ts
import { useState, useEffect } from "react";

export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
