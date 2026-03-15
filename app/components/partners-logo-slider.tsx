"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PartnerBrand = {
  name: string;
  href: string;
  logo: string;
  large?: boolean;
};

type PartnersLogoSliderProps = {
  brands: PartnerBrand[];
};

const AUTOPLAY_DELAY_MS = 2500;

export function PartnersLogoSlider({ brands }: PartnersLogoSliderProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const clearAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const scrollByStep = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const firstTile = scroller.querySelector<HTMLElement>(".partners-brand-tile");

    if (!firstTile) {
      return;
    }

    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "8");
    const step = firstTile.offsetWidth + gap;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    let nextScrollLeft = scroller.scrollLeft + step * direction;

    if (direction > 0 && nextScrollLeft >= maxScrollLeft - 2) {
      nextScrollLeft = 0;
    }

    if (direction < 0 && nextScrollLeft <= 2) {
      nextScrollLeft = maxScrollLeft;
    }

    scroller.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    clearAutoplay();

    if (isHovered || brands.length === 0) {
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      scrollByStep(1);
    }, AUTOPLAY_DELAY_MS);

    return clearAutoplay;
  }, [isHovered, brands.length]);

  useEffect(() => clearAutoplay, []);

  return (
    <div
      className="partners-brands-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="partners-brands-nav" aria-label="Brands slider controls">
        <button
          type="button"
          className="partners-brands-nav-btn"
          aria-label="Previous brands"
          onClick={() => scrollByStep(-1)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="partners-brands-nav-btn"
          aria-label="Next brands"
          onClick={() => scrollByStep(1)}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="partners-brands-viewport" ref={scrollerRef}>
        {brands.map((brand) => (
          <a
            key={brand.name}
            href={brand.href}
            target="_blank"
            rel="noreferrer"
            aria-label={brand.name}
            className={`partners-brand-tile${brand.large ? " partners-brand-tile--large" : ""}`}
          >
            <img src={brand.logo} alt={brand.name} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  );
}
