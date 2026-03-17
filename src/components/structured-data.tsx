import { siteConfig } from "@/config/site";

interface WebsiteSchemaProps {
  type?: "website";
}

interface CourseSchemaProps {
  type: "course";
  name: string;
  description: string;
  provider?: string;
}

interface ArticleSchemaProps {
  type: "article";
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: { name: string; url: string }[];
}

interface FAQSchemaProps {
  type: "faq";
  questions: { question: string; answer: string }[];
}

type StructuredDataProps =
  | WebsiteSchemaProps
  | CourseSchemaProps
  | ArticleSchemaProps
  | BreadcrumbSchemaProps
  | FAQSchemaProps;

export function StructuredData(props: StructuredDataProps) {
  let schema: Record<string, unknown>;

  switch (props.type) {
    case "course":
      schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: props.name,
        description: props.description,
        provider: {
          "@type": "Organization",
          name: props.provider || siteConfig.name,
          sameAs: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
        inLanguage: "vi",
        isAccessibleForFree: true,
      };
      break;

    case "article":
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        author: {
          "@type": "Organization",
          name: props.author || siteConfig.name,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo.png`,
          },
        },
        datePublished: props.datePublished || new Date().toISOString(),
        dateModified: props.dateModified || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
        },
        inLanguage: "vi",
      };
      break;

    case "breadcrumb":
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
        })),
      };
      break;

    case "faq":
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: props.questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      };
      break;

    default:
      // Website schema (default)
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        inLanguage: "vi",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/glossary?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization schema for the whole site
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "Vietnamese",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Educational organization schema
export function EducationalOrgSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    availableLanguage: {
      "@type": "Language",
      name: "Vietnamese",
      alternateName: "vi",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
