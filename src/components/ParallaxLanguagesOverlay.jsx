import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxLanguagesOverlay({ visible }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate children with parallax
    const elements = gsap.utils.toArray(
      containerRef.current.querySelectorAll("[data-speed]")
    );

    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 1;
      gsap.to(el, {
        y: () => -(ScrollTrigger.maxScroll(window) * speed * 0.1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      autoAlpha: visible ? 1 : 0,
      duration: 0.8,
      ease: "power2.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[15] pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0">
        <span
          className="absolute text-white/15 font-black select-none"
          style={{ top: "20%", left: "25%", fontSize: "2.2rem" }}
          data-speed="0.8"
        >
          js
        </span>
        <span
          className="absolute text-white/12 font-black select-none"
          style={{ top: "70%", left: "10%", fontSize: "2rem" }}
          data-speed="1.2"
        >
          ts
        </span>
        <span
          className="absolute text-white/10 font-black select-none"
          style={{ top: "35%", left: "70%", fontSize: "2.4rem" }}
          data-speed="1.0"
        >
          html
        </span>
        <span
          className="absolute text-white/18 font-black select-none"
          style={{ top: "50%", left: "55%", fontSize: "2.1rem" }}
          data-speed="0.9"
        >
          css
        </span>
        <span
          className="absolute text-white/14 font-black select-none"
          style={{ top: "40%", left: "15%", fontSize: "2.3rem" }}
          data-speed="1.1"
        >
          react
        </span>
        <span
          className="absolute text-white/11 font-black select-none"
          style={{ top: "80%", left: "80%", fontSize: "2rem" }}
          data-speed="1.3"
        >
          node
        </span>
        <span
          className="absolute text-white/16 font-black select-none"
          style={{ top: "25%", left: "40%", fontSize: "2.2rem" }}
          data-speed="1.0"
        >
          vue
        </span>
        <span
          className="absolute text-white/13 font-black select-none"
          style={{ top: "60%", left: "65%", fontSize: "2rem" }}
          data-speed="0.7"
        >
          python
        </span>
      </div>
    </div>
  );
}