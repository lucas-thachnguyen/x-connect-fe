import React from "react";
import Helmet from "react-helmet";
import { string } from "prop-types";

function SEO({ title, description }) {
  const schemaOrgJSONLD = [
    {
      "@context": "https://www.schema.org",
      "@type": "product",
      brand: "ryandee.com",
      logo: "https://ryandee.com/logo192.png",
      name: "Todos",
      description: { description },
    },
    {
      "@context": "http://schema.org/",
      "@type": "Person",
      name: "Minh Do",
      alternateName: "Ryan Dee",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho Chi Minh City",
        addressCountry: "Vietnam",
      },
      url: "www.ryandee.com",
      sameAs: [
        "https://twitter.com/ryandee",
        "https://www.linkedin.com/in/ryandee/",
        "https://github.com/ryandee",
      ],
      jobTitle: "Product Designer and Front-End Developer",
      worksFor: {
        "@type": "Organization",
        name: "ryandee.com",
      },
    },
  ];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:site" content="@ryandee" />
      <meta name="twitter:creator" content="@ryandee" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ryandee.com" />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}

SEO.propTypes = {
  title: string.isRequired,
  description: string,
};

SEO.defaultProps = {
  description:
    "A website created by my organization. | From Ryan with love",
};

export default SEO;
