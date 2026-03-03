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
    if (elements.length === 0) {
      if (parallaxElements.length === 0 && mouseElements.length === 0) {
        return;
      }
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    elements.forEach((element) => {
      const delay = element.dataset.revealDelay;
      if (delay) {
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      }
    });

    if (prefersReduced) {
      elements.forEach((element) => element.classList.add("reveal-visible"));
      return;
    }

    let scrollRafId = 0;
    let ticking = false;
    let mouseRafId = 0;
    let mouseAnimating = false;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

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

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

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

    if (supportsFinePointer && mouseElements.length > 0) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", resetMouseShift);
      window.addEventListener("blur", resetMouseShift);
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (supportsFinePointer && mouseElements.length > 0) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", resetMouseShift);
        window.removeEventListener("blur", resetMouseShift);
      }
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
