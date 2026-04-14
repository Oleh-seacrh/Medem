import type { Metadata } from "next";

type ContactMethod = {
  label: string;
  href?: string;
  icon: string;
  accent?: boolean;
  external?: boolean;
};

type ContactCard = {
  kicker?: string;
  name: string;
  subtitle: string;
  methods: ContactMethod[];
};

const contactCards: ContactCard[] = [
  {
    name: "Medem Ltd.",
    subtitle: "Inquiries for Equipment and Consumables",
    methods: [
      {
        label: "Bulgaria, 1000, Sofia Vitosha Blvd. 15, fl. 4, of. 2",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-3.svg"
      },
      {
        label: "View profile",
        href: "https://www.linkedin.com/company/medemltd",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-4.svg",
        accent: true,
        external: true
      }
    ]
  },
  {
    kicker: "CEO",
    name: "Sergei Mokrushin",
    subtitle: "Equipment and Consumables",
    methods: [
      {
        label: "+359 88 243 3697",
        href: "tel:+359882433697",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/basil_phone-outline.svg"
      },
      {
        label: "+359 88 684 3640",
        href: "https://wa.me/359886843640",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/whtsp.svg",
        external: true
      },
      {
        label: "info@xraymedem.com",
        href: "mailto:info@xraymedem.com",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-5.svg"
      }
    ]
  },
  {
    kicker: "Head of Business Development",
    name: "Oleh Yunyk",
    subtitle: "Equipment and Consumables",
    methods: [
      {
        label: "+359 88 684 3640",
        href: "tel:+359886843640",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/basil_phone-outline.svg"
      },
      {
        label: "+359 88 684 3640",
        href: "https://wa.me/359886843640",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/whtsp.svg",
        external: true
      },
      {
        label: "sales@xraymedem.com",
        href: "mailto:sales@xraymedem.com",
        icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-5.svg"
      }
    ]
  }
];

export const metadata: Metadata = {
  title: "Contacts | Medem",
  description:
    "Contact Medem for medical equipment and consumables inquiries. Reach our team and request a quote."
};

export default function ContactsPage() {
  return (
    <main className="contacts-page">
      <section className="section">
        <article className="contacts-intro-card">
          <h1 className="contacts-intro-title">Contacts</h1>
        </article>
      </section>

      <section className="section">
        <div className="contacts-cards-grid">
          {contactCards.map((card) => (
            <article key={card.name} className="contacts-info-card">
              <div className="contacts-card-copy">
                {card.kicker ? (
                  <p className="contacts-card-kicker">{card.kicker}</p>
                ) : null}
                <h2>{card.name}</h2>
                <p className="contacts-card-subtitle">{card.subtitle}</p>
              </div>

              <div className="contacts-card-methods">
                {card.methods.map((method) => {
                  const className = `contact-method${
                    method.accent ? " contact-method--accent" : ""
                  }`;
                  const icon = (
                    <span className="contact-method-icon" aria-hidden="true">
                      <img src={method.icon} alt="" loading="lazy" />
                    </span>
                  );

                  if (method.href) {
                    return (
                      <a
                        key={`${card.name}-${method.label}`}
                        href={method.href}
                        className={className}
                        target={method.external ? "_blank" : undefined}
                        rel={method.external ? "noopener noreferrer" : undefined}
                      >
                        {icon}
                        <span>{method.label}</span>
                      </a>
                    );
                  }

                  return (
                    <p key={`${card.name}-${method.label}`} className={className}>
                      {icon}
                      <span>{method.label}</span>
                    </p>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section quote-layout" id="contact">
        <div className="quote-card">
          <h2>Get your quote within 24 hours. Full support guaranteed.</h2>
          <p>Our manager will contact you as soon as possible</p>

          <form className="quote-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone" />
            <textarea rows={3} placeholder="Message" />
            <select defaultValue="">
              <option value="" disabled>
                Products
              </option>
              <option value="model-1">Model 1</option>
              <option value="model-2">Model 2</option>
              <option value="model-3">Model 3</option>
            </select>
            <button type="submit">Ask question</button>
          </form>
        </div>

        <div className="contacts-quote-image-shell" aria-hidden="true">
          <div className="contacts-quote-image" />
        </div>
      </section>
    </main>
  );
}
