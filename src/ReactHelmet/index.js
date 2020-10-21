import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = () => {
  return (
    <Helmet>
      <html lang="en" />
      <title>seo content của child override content của parent</title>
      <meta name="description" content="Tutorial for React Helmet" />
      <meta name="theme-color" content="#E6E6FA" />
    </Helmet>
  );
};

export default ReactHelmet;

// react helmet quản lý document head, update những thẻ meta trên server(node js) lẫn client(react app). những thẻ này sẽ được đọc
// bởi search engine and social media crawlers
