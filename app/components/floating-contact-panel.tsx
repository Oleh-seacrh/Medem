"use client";

import {
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  X,
  type LucideIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type LinkedinProfile = {
  href: string;
  label: string;
  short: string;
};

type QuickContactLink = {
  id: "whatsapp" | "email";
  href: string;
  label: string;
  Icon: LucideIcon;
};

const linkedinProfiles: LinkedinProfile[] = [
  {
    href: "https://www.linkedin.com/company/medemltd/",
    label: "MEDEM LTD company page",
    short: "CO"
  },
  {
    href: "https://www.linkedin.com/in/oleh-yunyk/",
    label: "Head of sales department",
    short: "HS"
  },
  {
    href: "https://www.linkedin.com/in/sergei-mokrushin/",
    label: "CEO",
    short: "CEO"
  }
];

const quickContactLinks: QuickContactLink[] = [
  {
    id: "whatsapp",
    href: "https://wa.me/359884910016",
    label: "WhatsApp",
    Icon: MessageCircle
  },
  {
    id: "email",
    href: "mailto:info@xraymedem.com",
    label: "Email",
    Icon: Mail
  }
];

export function FloatingContactPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverLocked, setIsHoverLocked] = useState(false);
  const [activeLinkedinLabel, setActiveLinkedinLabel] = useState<string | null>(
    null
  );
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipIntentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipSuppressUntilRef = useRef(0);
  const activeLinkedinLabelRef = useRef<string | null>(null);
  const pendingLinkedinLabelRef = useRef<string | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const clearTooltipSwapTimer = () => {
    if (tooltipSwapTimerRef.current) {
      clearTimeout(tooltipSwapTimerRef.current);
      tooltipSwapTimerRef.current = null;
    }
  };

  const clearTooltipIntentTimer = () => {
    if (tooltipIntentTimerRef.current) {
      clearTimeout(tooltipIntentTimerRef.current);
      tooltipIntentTimerRef.current = null;
    }
  };

  const hideLinkedinTooltip = () => {
    clearTooltipIntentTimer();
    clearTooltipSwapTimer();
    pendingLinkedinLabelRef.current = null;
    activeLinkedinLabelRef.current = null;
    setActiveLinkedinLabel(null);
  };

  const requestLinkedinTooltipLabel = (nextLabel: string | null) => {
    const currentLabel = activeLinkedinLabelRef.current;

    if (!nextLabel) {
      hideLinkedinTooltip();
      return;
    }

    if (!currentLabel) {
      if (tooltipSwapTimerRef.current) {
        pendingLinkedinLabelRef.current = nextLabel;
        return;
      }

      pendingLinkedinLabelRef.current = null;
      activeLinkedinLabelRef.current = nextLabel;
      setActiveLinkedinLabel(nextLabel);
      return;
    }

    if (currentLabel === nextLabel && !tooltipSwapTimerRef.current) {
      return;
    }

    clearTooltipSwapTimer();
    pendingLinkedinLabelRef.current = nextLabel;
    activeLinkedinLabelRef.current = null;
    setActiveLinkedinLabel(null);

    tooltipSwapTimerRef.current = setTimeout(() => {
      const pendingLabel = pendingLinkedinLabelRef.current;

      if (!pendingLabel) {
        tooltipSwapTimerRef.current = null;
        return;
      }

      activeLinkedinLabelRef.current = pendingLabel;
      setActiveLinkedinLabel(pendingLabel);
      pendingLinkedinLabelRef.current = null;
      tooltipSwapTimerRef.current = null;
    }, 110);
  };

  const armLinkedinTooltip = (label: string) => {
    if (Date.now() < tooltipSuppressUntilRef.current) {
      return;
    }

    clearTooltipIntentTimer();
    tooltipIntentTimerRef.current = setTimeout(() => {
      requestLinkedinTooltipLabel(label);
      tooltipIntentTimerRef.current = null;
    }, 70);
  };

  const openPanel = () => {
    if (isHoverLocked) {
      return;
    }

    clearCloseTimer();
    tooltipSuppressUntilRef.current = Date.now() + 180;
    hideLinkedinTooltip();
    setIsOpen(true);
  };

  const closePanelWithDelay = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      hideLinkedinTooltip();
      closeTimerRef.current = null;
    }, 180);
  };

  const handlePanelMouseLeave = () => {
    setIsHoverLocked(false);
    closePanelWithDelay();
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target || !panelRef.current || panelRef.current.contains(target)) {
        return;
      }

      clearCloseTimer();
      setIsOpen(false);
      hideLinkedinTooltip();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true
    });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      clearCloseTimer();
      clearTooltipIntentTimer();
      clearTooltipSwapTimer();
    };
  }, []);

  return (
    <aside className="floating-panel" aria-label="Quick contact panel">
      <div
        ref={panelRef}
        className={`floating-social-panel${isOpen ? " is-open" : ""}${
          isHoverLocked ? " is-hover-locked" : ""
        }`}
        onMouseEnter={openPanel}
        onMouseLeave={handlePanelMouseLeave}
        onFocusCapture={() => {
          setIsHoverLocked(false);
          openPanel();
        }}
        onBlur={(event) => {
          const nextFocused = event.relatedTarget as Node | null;

          if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
            closePanelWithDelay();
          }
        }}
      >
        <div className="floating-social-list" role="list">
          <div
            className="floating-linkedin-item"
            role="listitem"
            onMouseLeave={hideLinkedinTooltip}
          >
            <div
              className="floating-linkedin-pill"
              onMouseLeave={hideLinkedinTooltip}
            >
              <div className="floating-linkedin-mini-list" aria-label="LinkedIn profiles">
                {linkedinProfiles.map(({ href, label, short }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="floating-linkedin-mini"
                    onMouseEnter={() => armLinkedinTooltip(label)}
                    onFocus={() => requestLinkedinTooltipLabel(label)}
                    onBlur={hideLinkedinTooltip}
                    onMouseLeave={hideLinkedinTooltip}
                    onClick={() => {
                      clearCloseTimer();
                      setIsOpen(false);
                      hideLinkedinTooltip();
                    }}
                  >
                    {short}
                  </a>
                ))}
              </div>
              <span className="floating-linkedin-pill-icon" aria-hidden="true">
                <Linkedin size={22} strokeWidth={2.2} />
              </span>
            </div>
            <span
              className={`floating-linkedin-tooltip${
                activeLinkedinLabel ? " is-visible" : ""
              }`}
              aria-hidden={activeLinkedinLabel ? undefined : true}
            >
              {activeLinkedinLabel}
            </span>
          </div>

          {quickContactLinks.map(({ id, href, label, Icon }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={label}
              className={`floating-social-link floating-social-link--${id}`}
              role="listitem"
              onMouseEnter={hideLinkedinTooltip}
              onFocus={hideLinkedinTooltip}
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
            hideLinkedinTooltip();
            setIsOpen((open) => {
              const next = !open;
              setIsHoverLocked(!next);
              return next;
            });
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
