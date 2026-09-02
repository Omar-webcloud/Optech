import { site, faqs, services } from "@/content/site";

/**
 * JSON-LD for rich results. The FAQPage schema makes the objection-handling
 * answers eligible to appear directly in search, which is high-value for an
 * agency competing on pricing and timeline questions.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        description:
          "Optech Labs is a senior web development and UI/UX studio for founders and SaaS teams. Fixed scope, fixed price, median launch in six weeks.",
        foundingDate: String(site.founded),
        areaServed: "Worldwide",
        address: site.locations.map((location) => ({
          "@type": "PostalAddress",
          addressLocality: location,
        })),
        sameAs: site.social.map((s) => s.href),
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.blurb,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
