"use client";

import { useEffect, useState } from "react";

function useBreakPoint(screenWidth?: number) {
  const [isLowerThan, setIsLowerThan] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${screenWidth || "768"}px)`,
    );

    setIsLowerThan(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsLowerThan(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [screenWidth]);

  return { isLowerThan };
}

export default useBreakPoint;
