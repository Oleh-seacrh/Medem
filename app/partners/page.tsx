import type { Metadata } from "next";
import { PartnersMarquee } from "../components/partners-marquee";

type PartnerValue = {
  title: string;
  description: string;
  icon: string;
};

type TeamMember = {
  role: string;
  name: string;
  description: string;
  image: string;
};

type PartnerBrand = {
  name: string;
  logo: string;
};

const partnerValues: PartnerValue[] = [
  {
    title: "Orders from 1 pallet",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-2087326849.svg"
  },
  {
    title: "Original brands only",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/1000-certified-products.svg"
  },
  {
    title: "EU law protection",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Frame-2087326849-1.svg"
  }
];

const teamMembers: TeamMember[] = [
  {
    role: "CEO",
    name: "Sergei Mokrushin",
    description: "20+ years in equipment for healthcare",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/Yone.png"
  },
  {
    role: "Head of Business Development",
    name: "Oleh Yunyk",
    description: "Works directly with our partners",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/Oleh.jpg"
  }
];

const partnerBrands: PartnerBrand[] = [
  {
    name: "Toshiba",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Toshiba_logo.svg"
  },
  {
    name: "Sony",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Sony_logo.svg"
  },
  {
    name: "Siemens",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Siemens_AG_logo.svg"
  },
  {
    name: "Roche",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Roche_Logo.svg"
  },
  {
    name: "Abbott",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Logo_Abbott_Laboratories.svg"
  },
  {
    name: "Konica Minolta",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Konica_Minolta-Logo.svg"
  },
  {
    name: "General Electric",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/General_Electric_logo.svg"
  },
  {
    name: "Fujifilm",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Fujifilm_logo.svg"
  },
  {
    name: "Fresenius Medical Care",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Fresenius_Medical_Care_logo.svg"
  },
  {
    name: "Drager",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Drager_Logo.svg"
  },
  {
    name: "Carestream",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Carestream_Logo.svg"
  },
  {
    name: "bioMerieux",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/BioMerieux_logo.svg"
  },
  {
    name: "BD",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Becton_Dickinson_logo.svg"
  },
  {
    name: "Beckman Coulter",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Beckman_Coulter_Logo.svg"
  }
];

const countries = [
  "Nigeria, Kenya, Ghana, Egypt, South Africa",
  "Mexico, Brazil, Argentina, Colombia",
  "UAE, Saudi Arabia, Jordan, Kuwait",
  "India, Philippines, Vietnam, Malaysia",
  "And others"
];

export const metadata: Metadata = {
  title: "Partnership | Medem",
  description:
    "Expand your portfolio with premium medical brands and partner with Medem worldwide."
};

export default function PartnersPage() {
  return (
    <main className="partners-page">
      <section className="section">
        <article className="partners-intro-card">
          <h1 className="partners-intro-title">
            Expand your portfolio
            <br />
            with premium brands
          </h1>

          <div className="partners-intro-copy">
            <p>
              Medem Ltd supplies high-demand medical equipment, imaging
              solutions, and consumables from trusted global brands such as
              FUJIFILM, AGFA, SONY, KONICA MINOLTA, CARESTREAM and others.
            </p>
            <p>
              We work directly with healthcare resellers, procurement agents,
              and regional distributors across Europe, the Middle East, Asia,
              and Africa.
            </p>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="partners-values-grid">
          {partnerValues.map((value) => (
            <article key={value.title} className="partners-value-card">
              <span className="partners-value-icon" aria-hidden="true">
                <img src={value.icon} alt="" loading="lazy" />
              </span>

              <div className="partners-value-copy">
                <h2>{value.title}</h2>
                <p>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="partners-team-section-card">
          <p className="partners-section-kicker">Meet the Team</p>

          <div className="partners-team-grid">
            {teamMembers.map((member) => (
              <a
                key={member.name}
                href="/contacts/"
                className="partners-team-card"
                aria-label={`${member.role} ${member.name}`}
              >
                <div className="partners-team-photo-wrap" aria-hidden="true">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="partners-team-photo"
                    loading="lazy"
                  />
                </div>
                <div className="partners-team-copy">
                  <p className="partners-team-role">{member.role}</p>
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                </div>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="section" id="partnership">
        <PartnersMarquee brands={partnerBrands} />
      </section>

      <section className="section">
        <div className="map-card">
          <div className="map-copy">
            <h2>We supply medical equipment worldwide</h2>
            <p>
              Shipping to Africa, Latin America, Middle East, and Asia - safely
              and reliably
            </p>
          </div>
          <div className="countries-card">
            <h3>Countries we serve:</h3>
            <ul>
              {countries.map((countryLine) => (
                <li key={countryLine}>{countryLine}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section quote-layout" id="contact">
        <div className="quote-card">
          <h2>
            Get your quote within 24 hours. <br />
            Full support guaranteed.
          </h2>
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
              <option value="model-1">Model1</option>
              <option value="model-2">Model2</option>
              <option value="model-3">Model3</option>
            </select>
            <button type="submit">Ask question</button>
          </form>
        </div>
        <div className="quote-image" aria-hidden="true" />
      </section>
    </main>
  );
}
