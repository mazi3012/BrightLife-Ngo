export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Brightlife NGO",
    "url": "https://brightlife.ngo",
    "logo": "https://brightlife.ngo/logo.png",
    "description": "Brightlife NGO is dedicated to community development, health initiatives, and local empowerment in Barpeta, Assam.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barpeta",
      "addressRegion": "Assam",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/brightlife.ngo",
      "https://www.twitter.com/brightlife_ngo",
      "https://www.instagram.com/brightlife_ngo"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
