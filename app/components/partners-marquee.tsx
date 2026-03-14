"use client";

import { useEffect, useRef, useState } from "react";

type Brand = {
  name: string;
  logo: string;
};

type PartnersMarqueeProps = {
  brands: Brand[];
};

export function PartnersMarquee({ brands }: PartnersMarqueeProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasStarted || !sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      {
        root: null,
        threshold: 0.25
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  const topPartnerRow = brands;
  const bottomPartnerRow = [...brands].reverse();

  return (
    <div className="partners-marquee-card" ref={sectionRef}>
      <div className="partners-marquee-head">
        <h2>
          Our <span>partners</span>
        </h2>
        <p>Trusted brands we supply for medical equipment and consumables</p>
      </div>

      <div
        className={`partners-marquee-grid${
          hasStarted ? " partners-marquee-grid--started" : ""
        }`}
        aria-label="Brands we supply"
      >
        <div className="partners-row partners-row--top">
          {[...topPartnerRow, ...topPartnerRow].map((brand, index) => (
            <div
              key={`top-${brand.name}-${index}`}
              className="partner-cell"
              aria-label={brand.name}
            >
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="partners-row partners-row--bottom">
          {[...bottomPartnerRow, ...bottomPartnerRow].map((brand, index) => (
            <div
              key={`bottom-${brand.name}-${index}`}
              className="partner-cell"
              aria-label={brand.name}
            >
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
