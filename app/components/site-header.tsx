"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  { id: "home", label: "Home", href: "#" },
  { id: "products", label: "Products", href: "#products" },
  { id: "partnership", label: "Partnership", href: "#partnership" },
  { id: "contact", label: "Contact us", href: "#contact" }
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
  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const closeProductsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

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

  return (
    <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
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
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.992 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
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
                        href={item.href}
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
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ul className="header-products-list">
                            {productMenuItems.map((menuItem) => (
                              <li key={menuItem.slug}>
                                <a
                                  href="#products"
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
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.a
                  key={item.id}
                  href={item.href}
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

          <motion.a
            href="#contact"
            className="header-block header-block--cta header-block--cta-modern"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 0, 0, 0, -5.12, 1.28, -2.56, 0] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 5.75,
                    times: [0, 0.74, 0.8, 0.86, 0.9, 0.94, 0.97, 1],
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY
                  }
            }
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            whileFocus={{ y: -2 }}
          >
            Get a quote
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
}
