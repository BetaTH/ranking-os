import { useEffect, useState } from "react";

export const useViewport = () => {
    const mobileBreakPoint = 450
    const [width, setWidth] = useState(window.innerWidth);
    const [isMobileBreakPoint, setIsMobileBreakPoint] = useState<boolean>(window.innerWidth<=mobileBreakPoint)
  
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(() => {
        const verifyMobileBreakPointWhenResize = () => setIsMobileBreakPoint(window.innerWidth<=mobileBreakPoint);
        window.addEventListener("resize", verifyMobileBreakPointWhenResize);
        return () => window.removeEventListener("resize", verifyMobileBreakPointWhenResize);
      }, []);

    return { width , isMobileBreakPoint};


}