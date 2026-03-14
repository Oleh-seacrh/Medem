import { PartnersMarquee } from "./components/partners-marquee";

type CategoryCard = {
  title: string;
  description: string;
  products: string;
  className: string;
};

type ValueCard = {
  title: string;
  description: string;
  icon: string;
};

type Brand = {
  name: string;
  logo: string;
};

type NewsCard = {
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

const categoryCards: CategoryCard[] = [
  {
    title: "Radiology equipment and consumables",
    description:
      "One of our main fields of working is radiology equipment and consumables. We provide our products to partners all around the globe. Our partners are official distrib...",
    products: "44 products",
    className: "category-card--primary"
  },
  {
    title: "Lab equipment and consumables",
    description:
      "Laboratories requires a vareity of equipment and instrumentation to run tests and research. These staple, workhouse general lab equipment can be found acro...",
    products: "122 products",
    className: "category-card--muted"
  },
  {
    title: "MRI systems",
    description:
      "MRI systems support precise diagnostic work by delivering detailed imaging of internal organs and soft tissues. Clinics rely on these systems for consistent quality, reliability, and confident medical decisions",
    products: "25 products",
    className: "category-card--dark"
  },
  {
    title: "Nephrology",
    description:
      "Clinics and hospitals require reliable dialysis equipment and consumables to support kidney treatment. Our nephrology selection includes dialyzers and dry bicarbonate mixes from trusted...",
    products: "7 products",
    className: "category-card--accent"
  }
];

const valueCards: ValueCard[] = [
  {
    title: "1000+ certified products",
    description: "Ready for immediate shipment - via your transport agent or ours.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/1000-certified-products.svg"
  },
  {
    title: "Offer within 24 hours",
    description: "Get a fast, customized quote designed for your business.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Offer-within-24-hours.svg"
  },
  {
    title: "Transparent deals",
    description: "No hidden fees or legal risks. Protected by EU law.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Transparent-deals.svg"
  },
  {
    title: "Globally recognized brands",
    description: "Direct supply with zero risk of counterfeit products.",
    icon: "https://new.xraymedem.com/wp-content/uploads/2025/08/Globally-recognized-brands.svg"
  }
];

const brands: Brand[] = [
  {
    name: "Philips",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Mask-group.svg"
  },
  {
    name: "Carestream",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Group-569.svg"
  },
  {
    name: "Fujifilm",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Group-570.svg"
  },
  {
    name: "Drager",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Group-571.svg"
  },
  {
    name: "Konica Minolta",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Group-572.svg"
  },
  {
    name: "General Electric",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/image-71.svg"
  },
  {
    name: "Fresenius",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/image-70.svg"
  },
  {
    name: "BioMerieux",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Mask-group-2.svg"
  },
  {
    name: "Siemens",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/Mask-group-1.svg"
  },
  {
    name: "Sony",
    logo: "https://new.xraymedem.com/wp-content/uploads/2025/08/image-69.svg"
  }
];

const latestNews: NewsCard[] = [
  {
    date: "September 7, 2025",
    title: "Why delivery times for medical imaging equipment are improving",
    excerpt:
      "Global logistics improved, OEMs resumed production, lead times cut, buyers confirm specs and book slots.",
    href: "https://new.xraymedem.com/times-for-medical-imaging/",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/News1.jpg"
  },
  {
    date: "September 7, 2025",
    title:
      "Scandal in South Africa: What the oxygen fraud teaches us about procurement risk",
    excerpt:
      "Oxygen fraud showed risks, rushed tenders failed, poor controls harmed patients, stronger checks prevent it.",
    href: "https://new.xraymedem.com/scandal-in-south-africa/",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/News3.jpg"
  },
  {
    date: "September 7, 2025",
    title:
      "Everyone blames inflation for rising MedTech prices. But that's not the full story.",
    excerpt:
      "Rising MedTech costs caused by supply delays, freight, compliance. Plan early, compare, save more money.",
    href: "https://new.xraymedem.com/everyone-blames-inflation-for-rising-medtech-prices-but-thats-not-the-full-story/",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/News2.jpg"
  },
  {
    date: "September 7, 2025",
    title: "Check out our new catalog!",
    excerpt:
      "Browse updated catalog: equipment, consumables, monitors. Request tailored offers for your projects today.",
    href: "https://new.xraymedem.com/new-catalog/",
    image: "https://new.xraymedem.com/wp-content/uploads/2025/09/4-1.png"
  }
];

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M19 12L5 12M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="hero-left-eyebrow">Fast dispatch. Full transparency.</p>
        <h1 className="hero-title-main">
          World known <br />
          <span>brands for medical</span> <br />
          <span>business</span>
        </h1>
      </section>

      <section className="section" id="products">
        <div className="categories-grid">
          {categoryCards.map((card) => (
            <article key={card.title} className={`category-card ${card.className}`}>
              <div>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <footer className="category-card-footer">
                <span className="category-products">{card.products}</span>
                <ArrowRightIcon />
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="about-card">
          <p>
            Medem LTD, established in Sofia, Bulgaria in 2015, specializes in the
            <strong className="about-highlight">
              {" "}
              buying and selling of quality used medical, imaging, and hospital
              equipment
            </strong>
            . Our primary goal is to provide exceptional customer service by
            meeting the unique needs of our clients in the medical equipment
            industry.
          </p>
        </div>
      </section>

        <section className="section partnership-grid" id="partnership">
          {valueCards.map((card) => (
            <article key={card.title} className="value-mini-card">
              <div className="value-icon" aria-hidden="true">
                <img src={card.icon} alt="" loading="lazy" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
          </article>
        ))}

        <article className="value-price-card value-price-card--dark">
          <h3>Why our price is better?</h3>
          <p>
            We maximize your savings by consolidating bulk orders and negotiating
            the best terms with top suppliers using quantity as our leverage.
            MEDEM ltd supplies world-leading brands Fujifilm, Agfa, Carestream,
            Konica Minolta, Sony and more.
          </p>
          <span className="value-price-symbol">€</span>
        </article>

        <article className="value-price-card value-price-card--blue">
          <h3>By 4 to 15% with special offers from Medem</h3>
          <p>
            Cover as much as 80% of your clients requirements for X-ray
            consumables and lab reagents. Use our comprehensive selection of
            1,000+ premium products at unbeatable prices.
          </p>
          <span className="value-price-symbol">%</span>
        </article>
      </section>

      <section className="section">
        <PartnersMarquee brands={brands} />
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
              <li>Nigeria, Kenya, Ghana, Egypt, South Africa</li>
              <li>Mexico, Brazil, Argentina, Colombia</li>
              <li>UAE, Saudi Arabia, Jordan, Kuwait</li>
              <li>India, Philippines, Vietnam, Malaysia</li>
              <li>And others</li>
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
              <option value="radiology">Model 1</option>
              <option value="nephrology">Model 2</option>
              <option value="other">Model 3</option>
            </select>
            <button type="submit">Ask question</button>
          </form>
        </div>
        <div className="quote-image" aria-hidden="true" />
      </section>

      <section className="section news-section">
        <header className="news-headline">
          <h2>Latest news</h2>
        </header>
        <div className="news-grid">
          {latestNews.map((post) => (
            <article key={post.href} className="news-card">
              <div className="news-copy-block">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span>{post.date}</span>
              </div>
              <a href={post.href} target="_blank" rel="noreferrer" className="news-media">
                <img src={post.image} alt={post.title} loading="lazy" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
