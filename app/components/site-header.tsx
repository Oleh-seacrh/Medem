"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3, PackageCheck, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

type ProductMenuItem = {
  slug: string;
  name: string;
  count: number;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Products", href: "/products" },
  { id: "partnership", label: "Partnership", href: "/partners" },
  { id: "contact", label: "Contact us", href: "/contacts" }
];

// Sourced from xraymedem.WordPress.2026-03-12.xml (product_cat terms).
const productMenuItems: ProductMenuItem[] = [
  { slug: "equipment", name: "Equipment", count: 18 },
  { slug: "spare-parts", name: "Spare parts", count: 23 },
  { slug: "cassette", name: "Cassette", count: 10 },
  { slug: "films", name: "Films", count: 9 },
  { slug: "paper", name: "Paper", count: 9 },
  { slug: "dental", name: "Dental", count: 4 },
  { slug: "uncategorized", name: "Uncategorized", count: 7 }
];

export function SiteHeader() {
  const ctaRectRadius = 10;
  const ctaPillRadius = 30;
  const ctaMorphTransition = {
    duration: 1,
    ease: [0.18, 0.86, 0.32, 1] as const
  };
  const productsDropdownTransition = {
    duration: 0.26,
    ease: [0.16, 1, 0.3, 1] as const
  };
  const productsListVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.032,
        delayChildren: 0.03
      }
    }
  };
  const productsItemVariants = {
    hidden: {
      opacity: 0,
      y: 6
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.2, 0.84, 0.3, 1] as const
      }
    }
  };

  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitStatus, setQuoteSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const closeProductsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const quoteTriggerRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const productsHref = "/products";
  const contactHref = "/contacts";

  const clearProductsCloseTimer = () => {
    if (closeProductsTimerRef.current) {
      clearTimeout(closeProductsTimerRef.current);
      closeProductsTimerRef.current = null;
    }
  };

  const openProductsMenu = () => {
    clearProductsCloseTimer();
    setIsProductsOpen(true);
  };

  const closeProductsMenuWithDelay = () => {
    clearProductsCloseTimer();
    closeProductsTimerRef.current = setTimeout(() => {
      setIsProductsOpen(false);
      closeProductsTimerRef.current = null;
    }, 100);
  };

  const openQuoteModal = () => {
    clearProductsCloseTimer();
    setIsProductsOpen(false);
    setQuoteSubmitStatus(null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteSubmitStatus(null);
    window.setTimeout(() => {
      quoteTriggerRef.current?.focus();
    }, 0);
  };

  const submitQuoteRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteSubmitStatus(null);
    setIsSubmittingQuote(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      product: String(formData.get("product") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setQuoteSubmitStatus({
        type: "success",
        message: "Request sent. We will contact you shortly."
      });
    } catch {
      setQuoteSubmitStatus({
        type: "error",
        message: "Failed to send request. Please try again."
      });
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearProductsCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (!isQuoteModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeQuoteModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isQuoteModalOpen]);

  useEffect(() => {
    if (pathname === "/partners" || pathname === "/partnership") {
      setActiveNav("partnership");
      return;
    }

    if (pathname === "/contacts") {
      setActiveNav("contact");
      return;
    }

    if (pathname === "/catalog" || pathname === "/products") {
      setActiveNav("products");
      return;
    }

    if (pathname === "/") {
      setActiveNav("home");
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}
      >
        <div className="shell">
          <motion.div
            className="header-row"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
          <motion.a
            href="/"
            className="header-block header-block--logo-modern"
            aria-label="Medem home"
            animate={{
              borderRadius: isScrolled ? ctaPillRadius : ctaRectRadius
            }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
              borderRadius: ctaMorphTransition
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.992 }}
          >
            <img
              src={
                isScrolled
                  ? "https://new.xraymedem.com/wp-content/uploads/2025/08/Logo-White.svg"
                  : "https://new.xraymedem.com/wp-content/uploads/2025/08/LOGO.svg"
              }
              alt="MEDEM"
              width={171}
              height={36}
              className="header-logo-image"
            />
          </motion.a>

          <nav
            className="header-block header-block--menu-modern"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const itemHref =
                item.id === "products"
                  ? productsHref
                  : item.id === "contact"
                    ? contactHref
                    : item.href;

              if (item.id === "products") {
                return (
                  <div
                    key={item.id}
                    className={`menu-pill-dropdown-wrap ${
                      isProductsOpen ? "is-open" : ""
                    }`}
                    onMouseEnter={openProductsMenu}
                    onMouseLeave={closeProductsMenuWithDelay}
                    onBlur={(event) => {
                      const nextFocused = event.relatedTarget as Node | null;

                      if (
                        !nextFocused ||
                        !event.currentTarget.contains(nextFocused)
                      ) {
                        closeProductsMenuWithDelay();
                      }
                    }}
                  >
                    <motion.div
                      className={`menu-pill menu-pill--modern menu-pill--products ${
                        isActive ? "menu-pill--active-modern" : ""
                      }`}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="header-menu-active-pill"
                          className="menu-pill-active-bg"
                          transition={{
                            type: "spring",
                            stiffness: 460,
                            damping: 36
                          }}
                        />
                      ) : null}

                      <a
                        href={itemHref}
                        className="menu-pill-products-link"
                        onClick={() => {
                          clearProductsCloseTimer();
                          setActiveNav(item.id);
                          setIsProductsOpen(false);
                        }}
                      >
                        <span>{item.label}</span>
                      </a>

                      <button
                        type="button"
                        className="menu-pill-products-toggle"
                        aria-label="Toggle products menu"
                        aria-expanded={isProductsOpen}
                        aria-controls="header-products-dropdown"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          clearProductsCloseTimer();
                          setActiveNav(item.id);
                          setIsProductsOpen((open) => !open);
                        }}
                      >
                        <span className="menu-pill-plus" aria-hidden="true" />
                      </button>
                    </motion.div>

                    <AnimatePresence>
                      {isProductsOpen ? (
                        <motion.div
                          id="header-products-dropdown"
                          className="header-products-dropdown"
                          initial={{ opacity: 0, y: 12, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.992 }}
                          transition={productsDropdownTransition}
                          style={{ transformOrigin: "top left" }}
                        >
                          <motion.ul
                            className="header-products-list"
                            variants={productsListVariants}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                          >
                            {productMenuItems.map((menuItem) => (
                              <motion.li
                                key={menuItem.slug}
                                variants={productsItemVariants}
                              >
                                <a
                                  href={productsHref}
                                  className="header-products-link"
                                  onClick={() => {
                                    clearProductsCloseTimer();
                                    setActiveNav(item.id);
                                    setIsProductsOpen(false);
                                  }}
                                >
                                  <span>{menuItem.name}</span>
                                  <span className="header-products-count">
                                    {menuItem.count}
                                  </span>
                                </a>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.a
                  key={item.id}
                  href={itemHref}
                  onClick={() => setActiveNav(item.id)}
                  className={`menu-pill menu-pill--modern ${
                    isActive ? "menu-pill--active-modern" : ""
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="header-menu-active-pill"
                      className="menu-pill-active-bg"
                      transition={{ type: "spring", stiffness: 460, damping: 36 }}
                    />
                  ) : null}
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            className="header-tools header-tools--modern"
            aria-label="Header actions"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <motion.button
              type="button"
              className="header-tool header-tool--modern header-tool--lang"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              EN
            </motion.button>
          </motion.div>

          <motion.button
            type="button"
            ref={quoteTriggerRef}
            className="header-block header-block--cta header-block--cta-modern"
            onClick={openQuoteModal}
            aria-haspopup="dialog"
            aria-expanded={isQuoteModalOpen}
            animate={
              shouldReduceMotion
                ? { borderRadius: isScrolled ? ctaPillRadius : ctaRectRadius }
                : {
                    y: [0, 0, 0, 0, -5.12, 1.28, -2.56, 0],
                    borderRadius: isScrolled ? ctaPillRadius : ctaRectRadius
                  }
            }
            transition={
              shouldReduceMotion
                ? {
                    borderRadius: ctaMorphTransition
                  }
                : {
                    y: {
                      duration: 5.75,
                      times: [0, 0.74, 0.8, 0.86, 0.9, 0.94, 0.97, 1],
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY
                    },
                    borderRadius: ctaMorphTransition
                  }
            }
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            whileFocus={{ y: -2 }}
          >
            <span className="header-cta-label">Get a quote</span>
          </motion.button>
        </motion.div>
      </div>
    </header>

      <AnimatePresence>
        {isQuoteModalOpen ? (
          <motion.div
            className="quote-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.22 }
            }
            onClick={closeQuoteModal}
          >
            <motion.div
              className="quote-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quote-modal-title"
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, y: 16, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.99 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1]
                    }
              }
              onClick={(event) => event.stopPropagation()}
            >
              <aside className="quote-modal-aside">
                <p className="quote-modal-kicker">Fast dispatch. Full transparency.</p>
                <h2 id="quote-modal-title">Get a tailored quote in 24 hours</h2>
                <p className="quote-modal-copy">
                  Share your request and we will prepare the best matching offer for
                  your project.
                </p>
                <ul className="quote-modal-benefits">
                  <li>
                    <Clock3 size={16} aria-hidden="true" />
                    Offer within 24 hours
                  </li>
                  <li>
                    <PackageCheck size={16} aria-hidden="true" />
                    Access to premium brands
                  </li>
                  <li>
                    <ShieldCheck size={16} aria-hidden="true" />
                    Transparent and secure deals
                  </li>
                </ul>
              </aside>

              <div className="quote-modal-main">
                <button
                  type="button"
                  className="quote-modal-close"
                  aria-label="Close quote form"
                  onClick={closeQuoteModal}
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <form
                  className="quote-modal-form"
                  onSubmit={submitQuoteRequest}
                >
                  <div className="quote-modal-grid">
                    <label className="quote-modal-field">
                      <span>Name</span>
                      <input type="text" name="name" placeholder="Your name" required />
                    </label>

                    <label className="quote-modal-field">
                      <span>Phone</span>
                      <input type="tel" name="phone" placeholder="+359" />
                    </label>

                    <label className="quote-modal-field">
                      <span>Email</span>
                      <input type="email" name="email" placeholder="name@company.com" required />
                    </label>

                    <label className="quote-modal-field">
                      <span>Product category</span>
                      <select name="product" defaultValue="">
                        <option value="" disabled>
                          Select category
                        </option>
                        {productMenuItems.map((menuItem) => (
                          <option key={menuItem.slug} value={menuItem.slug}>
                            {menuItem.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="quote-modal-field quote-modal-field--full">
                      <span>Message</span>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us what models, quantity or specs you need..."
                      />
                    </label>
                  </div>

                  <div className="quote-modal-actions">
                    <button
                      type="submit"
                      className="quote-modal-submit"
                      disabled={isSubmittingQuote}
                    >
                      {isSubmittingQuote ? "Sending..." : "Send request"}
                    </button>
                  </div>
                  {quoteSubmitStatus ? (
                    <p
                      className={`quote-modal-status quote-modal-status--${quoteSubmitStatus.type}`}
                      role="status"
                    >
                      {quoteSubmitStatus.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
