export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hello New Year",
    alternateName: "HNW",
    url: "https://hny.shironstudio.com",
    description:
      "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together with our interactive New Year countdown.",
    publisher: {
      "@type": "Organization",
      name: "Shiron Studio",
      url: "https://www.shironstudio.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hny.shironstudio.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    } as const,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
