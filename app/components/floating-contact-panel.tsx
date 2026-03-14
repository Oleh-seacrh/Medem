"use client";

import {
  Instagram,
  type LucideIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SocialLink = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    Icon: Instagram
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    Icon: Linkedin
  },
  {
    href: "https://t.me/+359884910016",
    label: "Telegram",
    Icon: Send
  },
  {
    href: "https://wa.me/359884910016",
    label: "WhatsApp",
    Icon: MessageCircle
  },
  {
    href: "mailto:info@xraymedem.com",
    label: "Email",
    Icon: Mail
  }
];

export function FloatingContactPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPanel = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const closePanelWithDelay = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target || !panelRef.current || panelRef.current.contains(target)) {
        return;
      }

      clearCloseTimer();
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true
    });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <aside className="floating-panel" aria-label="Quick contact panel">
      <div
        ref={panelRef}
        className={`floating-social-panel${isOpen ? " is-open" : ""}`}
        onMouseEnter={openPanel}
        onMouseLeave={closePanelWithDelay}
        onFocusCapture={openPanel}
        onBlur={(event) => {
          const nextFocused = event.relatedTarget as Node | null;

          if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
            closePanelWithDelay();
          }
        }}
      >
        <div className="floating-social-list" role="list">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={label}
              className="floating-social-link"
              role="listitem"
              onClick={() => {
                clearCloseTimer();
                setIsOpen(false);
              }}
            >
              <Icon size={20} strokeWidth={1.95} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="floating-dots-btn"
          aria-label={isOpen ? "Close contact links" : "Open contact links"}
          aria-expanded={isOpen}
          onClick={() => {
            clearCloseTimer();
            setIsOpen((open) => !open);
          }}
        >
          <span className="floating-dots" aria-hidden="true">
            <span className="floating-dot" />
            <span className="floating-dot" />
            <span className="floating-dot" />
          </span>
          <X
            size={28}
            strokeWidth={2.15}
            className="floating-dots-close"
            aria-hidden="true"
          />
        </button>
      </div>

      <a
        href="tel:+359884910016"
        className="floating-phone-btn"
        aria-label="Call MEDEM manager"
      >
        <span className="floating-phone-info">
          <span className="floating-phone-overline">Call now</span>
          <span className="floating-phone-title">MEDEM manager</span>
        </span>
        <span className="floating-phone-icon" aria-hidden="true">
          <Phone size={23} strokeWidth={2.3} />
        </span>
      </a>
    </aside>
  );
}
