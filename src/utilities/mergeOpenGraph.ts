import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "adrianmaj.com blog",
  images: [
    {
      url: `${getServerSideURL()}/meta-og.webp`,
    },
  ],
  siteName: "adrianmaj.com",
  title: "adrianmaj.com",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
