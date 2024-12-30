"use client";

import { useEffect, useState } from "react";

function useIsMobile(screenWidth?: number) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${screenWidth || "768"}px)`,
    );

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [screenWidth]);

  return { isMobile };
}

export default useIsMobile;
