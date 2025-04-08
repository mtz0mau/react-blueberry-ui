import React, { useRef, useState, useEffect } from "react";

interface ResponsiveScalerProps {
  baseWidth: number;
  baseHeight: number;
  children: React.ReactNode;
}

export const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({
  baseWidth,
  baseHeight,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;

        // Calcula escala que mantiene la relación de aspecto sin desbordar
        const scaleX = offsetWidth / baseWidth;
        const scaleY = offsetHeight / baseHeight;
        const newScale = Math.min(scaleX, scaleY);

        setScale(newScale);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [baseWidth, baseHeight]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};
