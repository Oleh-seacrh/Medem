import type { Metadata } from "next";
import { FloatingContactPanel } from "./components/floating-contact-panel";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medem | Medical Equipment & Consumables",
  description:
    "Medem LTD supplies radiology, lab and nephrology equipment and consumables worldwide with fast dispatch and transparent deals."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />

        {children}

        <footer className="site-footer">
          <div className="shell">
            <section className="newsletter">
              <div className="newsletter-text">
                <h2>Subscribe to the newsletter!</h2>
                <p>
                  Do you want to receive information about new products and
                  promotions?
                </p>
              </div>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  Send
                </button>
              </form>
            </section>

            <section className="footer-main">
              <div className="footer-top">
                <div className="footer-brand">
                  <img
                    src="https://new.xraymedem.com/wp-content/uploads/2025/08/Logo-White.svg"
                    alt="MEDEM"
                    width={171}
                    height={36}
                    className="footer-logo-image"
                  />
                </div>
              </div>

              <div className="footer-columns">
                <div className="footer-column">
                  <h3>Quick links</h3>
                  <a href="#">About us</a>
                  <a href="#products">Products</a>
                  <a href="#">Services</a>
                  <a href="#">News / Blog</a>
                  <a href="#contact">Contact</a>
                </div>

                <div className="footer-column">
                  <h3>Support / Legal</h3>
                  <a href="#">Privacy policy</a>
                  <a href="#">Terms &amp; conditions</a>
                  <a href="#">Cookies policy</a>
                </div>

                <div className="footer-column footer-column--contacts">
                  <h3>Contacts</h3>
                  <p>Bulgaria, 1000, Sofia Vitosha Blvd. 15, fl. 4, of. 2</p>
                  <a href="mailto:info@xraymedem.com">info@xraymedem.com</a>
                  <a href="tel:+359884910016">+359 88 491 00 16 (WhatsApp)</a>
                  <a href="tel:+359886843640">+359 88 684 3640</a>
                </div>
              </div>
            </section>
          </div>
        </footer>

        <FloatingContactPanel />
      </body>
    </html>
  );
}
