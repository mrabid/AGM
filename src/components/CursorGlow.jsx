import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(198,168,109,0.07) 0%, transparent 70%)",
        willChange: "transform",
        transition: "transform 0.12s ease-out",
      }}
    />
  );
}
