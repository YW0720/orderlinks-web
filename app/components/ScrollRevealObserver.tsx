"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ScrollRevealObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]"),
    );
    const mouseElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-mouse-factor]"),
    );
    const tiltElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt-factor]"),
    );
    const magneticElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic-factor]"),
    );
    if (elements.length === 0) {
      if (
        parallaxElements.length === 0 &&
        mouseElements.length === 0 &&
        tiltElements.length === 0 &&
        magneticElements.length === 0
      ) {
        return;
      }
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const navigatorWithConnection = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };
    const connection = navigatorWithConnection.connection;
    const saveData = connection?.saveData === true;
    const isSlowConnection = ["slow-2g", "2g"].includes(
      connection?.effectiveType ?? "",
    );
    const lowCoreDevice =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 4;
    const useLiteMotion = prefersReduced || saveData || isSlowConnection || lowCoreDevice;
    document.documentElement.classList.toggle("motion-lite", useLiteMotion);

    elements.forEach((element, index) => {
      const delayRaw = Number(element.dataset.revealDelay ?? "0");
      const delay = Number.isNaN(delayRaw) ? 0 : delayRaw;
      const liteStagger = Math.min(index * 26, 180);
      const appliedDelay = useLiteMotion ? Math.min(delay, 120) + liteStagger : delay;
      element.style.setProperty("--reveal-delay", `${appliedDelay}ms`);
    });

    let scrollRafId = 0;
    let ticking = false;
    let mouseRafId = 0;
    let mouseAnimating = false;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const tiltCleanup: Array<() => void> = [];
    const magneticCleanup: Array<() => void> = [];

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.parallaxSpeed ?? "0");
        if (Number.isNaN(speed) || speed === 0) {
          element.style.setProperty("--parallax-shift", "0px");
          return;
        }
        const rawShift = scrollY * speed;
        const clamped = Math.max(Math.min(rawShift, 42), -42);
        element.style.setProperty("--parallax-shift", `${clamped.toFixed(2)}px`);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      scrollRafId = window.requestAnimationFrame(updateParallax);
    };

    if (useLiteMotion) {
      parallaxElements.forEach((element) => {
        element.style.setProperty("--parallax-shift", "0px");
      });
    } else {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    const applyMouseShift = (x: number, y: number) => {
      mouseElements.forEach((element) => {
        const factor = Number(element.dataset.mouseFactor ?? "0");
        if (Number.isNaN(factor) || factor === 0) {
          element.style.setProperty("--mouse-shift-x", "0px");
          element.style.setProperty("--mouse-shift-y", "0px");
          return;
        }
        const shiftX = Math.max(Math.min(x * factor, 18), -18);
        const shiftY = Math.max(Math.min(y * factor, 18), -18);
        element.style.setProperty("--mouse-shift-x", `${shiftX.toFixed(2)}px`);
        element.style.setProperty("--mouse-shift-y", `${shiftY.toFixed(2)}px`);
      });
    };

    const runMouseFrame = () => {
      currentMouseX += (targetMouseX - currentMouseX) * 0.14;
      currentMouseY += (targetMouseY - currentMouseY) * 0.14;
      applyMouseShift(currentMouseX, currentMouseY);

      const closeEnough =
        Math.abs(targetMouseX - currentMouseX) < 0.0015 &&
        Math.abs(targetMouseY - currentMouseY) < 0.0015;

      if (closeEnough) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
        applyMouseShift(currentMouseX, currentMouseY);
        mouseAnimating = false;
        mouseRafId = 0;
        return;
      }

      mouseRafId = window.requestAnimationFrame(runMouseFrame);
    };

    const ensureMouseAnimation = () => {
      if (mouseAnimating) {
        return;
      }
      mouseAnimating = true;
      mouseRafId = window.requestAnimationFrame(runMouseFrame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const viewportX = window.innerWidth || 1;
      const viewportY = window.innerHeight || 1;
      targetMouseX = (event.clientX / viewportX - 0.5) * 2;
      targetMouseY = (event.clientY / viewportY - 0.5) * 2;
      ensureMouseAnimation();
    };

    const resetMouseShift = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      ensureMouseAnimation();
    };

    if (!useLiteMotion && supportsFinePointer && mouseElements.length > 0) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", resetMouseShift);
      window.addEventListener("blur", resetMouseShift);
    }

    if (!useLiteMotion && supportsFinePointer && tiltElements.length > 0) {
      tiltElements.forEach((element) => {
        const tiltFactor = Number(element.dataset.tiltFactor ?? "7");
        const maxTilt = Number.isNaN(tiltFactor) ? 7 : Math.min(Math.max(tiltFactor, 3), 14);

        const resetTilt = () => {
          element.style.setProperty("--tilt-rotate-x", "0deg");
          element.style.setProperty("--tilt-rotate-y", "0deg");
          element.style.setProperty("--spotlight-x", "50%");
          element.style.setProperty("--spotlight-y", "50%");
        };

        const onTiltMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            return;
          }
          const relativeX = (event.clientX - rect.left) / rect.width;
          const relativeY = (event.clientY - rect.top) / rect.height;
          const centeredX = relativeX - 0.5;
          const centeredY = relativeY - 0.5;
          const rotateX = Math.max(Math.min(-centeredY * maxTilt * 2, maxTilt), -maxTilt);
          const rotateY = Math.max(Math.min(centeredX * maxTilt * 2, maxTilt), -maxTilt);
          element.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
          element.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
          element.style.setProperty("--spotlight-x", `${(relativeX * 100).toFixed(2)}%`);
          element.style.setProperty("--spotlight-y", `${(relativeY * 100).toFixed(2)}%`);
        };

        element.addEventListener("pointermove", onTiltMove, { passive: true });
        element.addEventListener("pointerleave", resetTilt);
        element.addEventListener("blur", resetTilt);
        tiltCleanup.push(() => {
          element.removeEventListener("pointermove", onTiltMove);
          element.removeEventListener("pointerleave", resetTilt);
          element.removeEventListener("blur", resetTilt);
        });
      });
    }

    if (!useLiteMotion && supportsFinePointer && magneticElements.length > 0) {
      magneticElements.forEach((element) => {
        const magneticFactor = Number(element.dataset.magneticFactor ?? "8");
        const maxOffset = Number.isNaN(magneticFactor) ? 5 : Math.min(Math.max(magneticFactor, 2), 10);
        const layeredNodes = Array.from(
          element.querySelectorAll<HTMLElement>("[data-magnetic-layer-factor]"),
        );

        const resetMagnetic = () => {
          element.style.setProperty("--magnetic-x", "0px");
          element.style.setProperty("--magnetic-y", "0px");
          layeredNodes.forEach((layer) => {
            layer.style.setProperty("--magnetic-layer-x", "0px");
            layer.style.setProperty("--magnetic-layer-y", "0px");
          });
        };

        const onMagneticMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            return;
          }
          const relativeX = (event.clientX - rect.left) / rect.width;
          const relativeY = (event.clientY - rect.top) / rect.height;
          const centeredX = relativeX - 0.5;
          const centeredY = relativeY - 0.5;
          const offsetX = Math.max(Math.min(centeredX * maxOffset * 2, maxOffset), -maxOffset);
          const offsetY = Math.max(Math.min(centeredY * maxOffset * 2, maxOffset), -maxOffset);
          element.style.setProperty("--magnetic-x", `${offsetX.toFixed(2)}px`);
          element.style.setProperty("--magnetic-y", `${offsetY.toFixed(2)}px`);

          layeredNodes.forEach((layer) => {
            const layerFactorRaw = Number(layer.dataset.magneticLayerFactor ?? "1.4");
            const layerFactor = Number.isNaN(layerFactorRaw) ? 1.2 : Math.min(Math.max(layerFactorRaw, 0.6), 1.8);
            const layerX = Math.max(Math.min(offsetX * layerFactor * 0.66, 13), -13);
            const layerY = Math.max(Math.min(offsetY * layerFactor * 0.66, 13), -13);
            layer.style.setProperty("--magnetic-layer-x", `${layerX.toFixed(2)}px`);
            layer.style.setProperty("--magnetic-layer-y", `${layerY.toFixed(2)}px`);
          });
        };

        element.addEventListener("pointermove", onMagneticMove, { passive: true });
        element.addEventListener("pointerleave", resetMagnetic);
        element.addEventListener("blur", resetMagnetic);
        magneticCleanup.push(() => {
          element.removeEventListener("pointermove", onMagneticMove);
          element.removeEventListener("pointerleave", resetMagnetic);
          element.removeEventListener("blur", resetMagnetic);
        });
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const once = target.dataset.revealOnce !== "false";
          if (entry.isIntersecting) {
            target.classList.add("reveal-visible");
            if (once) {
              observer.unobserve(target);
            }
          } else if (!once) {
            target.classList.remove("reveal-visible");
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-lite");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (!useLiteMotion && supportsFinePointer && mouseElements.length > 0) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", resetMouseShift);
        window.removeEventListener("blur", resetMouseShift);
      }
      tiltCleanup.forEach((cleanup) => cleanup());
      magneticCleanup.forEach((cleanup) => cleanup());
      if (scrollRafId) {
        window.cancelAnimationFrame(scrollRafId);
      }
      if (mouseRafId) {
        window.cancelAnimationFrame(mouseRafId);
      }
    };
  }, [routeKey]);

  return null;
}
