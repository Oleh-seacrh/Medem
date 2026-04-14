import type { Metadata } from "next";
import catalogProducts from "../data/catalog-products.json";

type CatalogProduct = {
  id: number;
  title: string;
  slug: string;
  desc: string;
  img: string;
  link: string;
};

type BrandGroup = {
  name: string;
  logo: string;
  href?: string;
  productIds?: number[];
};

type CatalogAccordionItem = {
  id: string;
  title: string;
  mode: "products" | "brands";
  brands: BrandGroup[];
};

type CatalogSection = {
  id: string;
  title: string;
  items: CatalogAccordionItem[];
};

const products = catalogProducts as CatalogProduct[];
const productMap = new Map(products.map((product) => [product.id, product]));

const downloadCatalogUrl =
  "https://new.xraymedem.com/wp-content/uploads/2025/09/Catalog_MEDEM.pdf";

function normalizeText(value: string): string {
  return value
    .replaceAll("вЂ‘", "-")
    .replaceAll("вЂ“", "-")
    .replaceAll("вЂ”", "-")
    .replaceAll("Г©", "é");
}

const catalogSections: CatalogSection[] = [
  {
    id: "radiology",
    title: "Radiology",
    items: [
      {
        id: "radiology-equipment",
        title: "Equipment",
        mode: "products",
        brands: [
          {
            name: "Carestream",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Carestream_Logo.svg",
            productIds: [1054, 1056, 1058]
          },
          {
            name: "Fujifilm",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Fujifilm_logo.svg",
            productIds: [323, 318, 317, 316, 264]
          },
          {
            name: "Agfa",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Agfa_logo.svg",
            productIds: [563, 565, 567, 569, 571, 573]
          },
          {
            name: "Sony",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Sony_logo.svg",
            productIds: [609]
          }
        ]
      },
      {
        id: "radiology-films",
        title: "Films",
        mode: "products",
        brands: [
          {
            name: "Fujifilm",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Fujifilm_logo.svg",
            productIds: [325, 324]
          },
          {
            name: "Carestream",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Carestream_Logo.svg",
            productIds: [258, 541, 543, 547, 549]
          },
          {
            name: "Agfa",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Agfa_logo.svg",
            productIds: [559, 561]
          }
        ]
      },
      {
        id: "radiology-paper",
        title: "Paper",
        mode: "products",
        brands: [
          {
            name: "Sony",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Sony_logo.svg",
            productIds: [591, 593, 595, 597, 599, 601, 603, 605, 607]
          }
        ]
      },
      {
        id: "radiology-dental",
        title: "Dental",
        mode: "products",
        brands: [
          {
            name: "Carestream",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Carestream_Logo.svg",
            productIds: [551, 553, 555, 557]
          }
        ]
      },
      {
        id: "radiology-cassette",
        title: "Cassette",
        mode: "products",
        brands: [
          {
            name: "Agfa",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Agfa_logo.svg",
            productIds: [575, 577, 579, 581, 583, 585, 587, 589]
          },
          {
            name: "Carestream",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Carestream_Logo.svg",
            productIds: [263, 262]
          }
        ]
      }
    ]
  },
  {
    id: "ct-mri",
    title: "CT/MRI",
    items: [
      {
        id: "ct-mri-equipment",
        title: "Equipment",
        mode: "products",
        brands: [
          {
            name: "Toshiba",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Toshiba_logo.svg",
            productIds: [1060, 1062, 1064]
          }
        ]
      },
      {
        id: "ct-mri-spare-parts",
        title: "Spare parts",
        mode: "products",
        brands: [
          {
            name: "General Electric",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/General_Electric_logo.svg",
            productIds: [1066, 1068, 1070, 1072, 1074, 1076, 1078, 1080, 1082]
          },
          {
            name: "Philips",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Philips_logo_new.svg",
            productIds: [1084, 1086, 1088, 1090, 1092, 1094, 1096]
          },
          {
            name: "Siemens",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Siemens_AG_logo.svg",
            productIds: [1098, 1100, 1102, 1104, 1106, 1108, 1110]
          }
        ]
      }
    ]
  },
  {
    id: "nephrology",
    title: "Nephrology",
    items: [
      {
        id: "nephrology-equipment",
        title: "Equipment",
        mode: "products",
        brands: [
          {
            name: "Fresenius Medical Care",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Fresenius_Medical_Care_logo.svg",
            productIds: [611, 613, 615, 617, 623, 621, 619]
          }
        ]
      }
    ]
  },
  {
    id: "lab-equipment",
    title: "Lab equipment",
    items: [
      {
        id: "lab-equipment-spare-parts",
        title: "Spare parts",
        mode: "brands",
        brands: [
          {
            name: "Siemens",
            href: "https://www.siemens.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Siemens_AG_logo.svg"
          },
          {
            name: "Roche",
            href: "https://www.roche.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Roche_Logo.svg"
          },
          {
            name: "Abbott",
            href: "https://www.abbott.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Logo_Abbott_Laboratories.svg"
          },
          {
            name: "bioMerieux",
            href: "https://www.biomerieux.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/BioMerieux_logo.svg"
          },
          {
            name: "BD",
            href: "https://www.bd.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Becton_Dickinson_logo.svg"
          },
          {
            name: "Beckman Coulter",
            href: "https://www.beckmancoulter.com/",
            logo: "https://new.xraymedem.com/wp-content/uploads/2025/10/Beckman_Coulter_Logo.svg"
          }
        ]
      }
    ]
  }
];

export const metadata: Metadata = {
  title: "Products | Medem",
  description:
    "Medem catalog of radiology, CT/MRI, nephrology and lab equipment products."
};

function getProductsByIds(ids: number[] | undefined): CatalogProduct[] {
  if (!ids || ids.length === 0) {
    return [];
  }

  return ids
    .map((id) => productMap.get(id))
    .filter((product): product is CatalogProduct => Boolean(product));
}

type CatalogPageProps = {
  searchParams?: {
    item?: string;
  };
};

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  const activeItemId = searchParams?.item ?? "";

  return (
    <main className="catalog-page">
      <section className="section">
        <article className="catalog-intro-card">
          <div className="catalog-intro-copy">
            <h1>Products</h1>
            <p>
              Medem ltd. is a global medical distributor of equipment and
              consumables.
              <br />
              We provide reliable service for our partners all around the globe.
              Offering well-known brands such as Fujifilm Healthcare, Carestream
              Health, Konica Minolta Healthcare and many others. Minimum order
              quantity is 1 pallet.
            </p>
          </div>

          <a
            className="catalog-download-btn"
            href={downloadCatalogUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Download catalog</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11.0834 7.00002L2.91669 7.00002M11.0834 7.00002L7.58335 3.50002M11.0834 7.00002L7.58335 10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </article>
      </section>

      {catalogSections.map((section) => (
        <section key={section.id} className="section" id={section.id}>
          <div className="catalog-section-label">{section.title}</div>

          <div className="catalog-accordion">
            {section.items.map((item, index) => (
              <details
                key={item.id}
                id={item.id}
                className="catalog-accordion-item"
                open={item.id === activeItemId || (index === 0 && !activeItemId)}
              >
                <summary>
                  <span>{item.title}</span>
                  <span className="catalog-accordion-icon" aria-hidden="true" />
                </summary>

                <div className="catalog-accordion-body">
                  {item.mode === "brands" ? (
                    <div className="catalog-brand-grid-only">
                      {item.brands.map((brand) => (
                        <a
                          key={brand.name}
                          href={brand.href}
                          target="_blank"
                          rel="noreferrer"
                          className="catalog-brand-only-card"
                          aria-label={brand.name}
                        >
                          <img src={brand.logo} alt={brand.name} loading="lazy" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    item.brands.map((brand) => {
                      const brandProducts = getProductsByIds(brand.productIds);

                      return (
                        <div className="catalog-brand-group" key={brand.name}>
                          <div className="catalog-brand-logo">
                            <img src={brand.logo} alt={brand.name} loading="lazy" />
                          </div>

                          <div className="catalog-products-grid">
                            {brandProducts.map((product) => (
                              <article key={product.id} className="catalog-product-card">
                                <a
                                  href={product.link}
                                  className="catalog-product-image-link"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={product.img}
                                    alt={product.title}
                                    loading="lazy"
                                  />
                                </a>
                                <h3>{normalizeText(product.title)}</h3>
                                <p>{normalizeText(product.desc)}</p>
                                <a href="#form-catalog" className="catalog-card-cta">
                                  Request price
                                </a>
                              </article>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="section quote-layout" id="form-catalog">
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
              <option value="radiology">Radiology</option>
              <option value="ct-mri">CT/MRI</option>
              <option value="nephrology">Nephrology</option>
              <option value="lab-equipment">Lab equipment</option>
              <option value="other">Other</option>
            </select>
            <button type="submit">Ask question</button>
          </form>
        </div>
        <div className="quote-image" aria-hidden="true" />
      </section>
    </main>
  );
}
