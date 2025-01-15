import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import config from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { Search } from "@/components/search/Component";
import PageClient from "./page.client";
import { CardPostData } from "@/components/Card";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config });
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("SearchPage");

  const posts = await payload.find({
    collection: "search",
    depth: 1,
    limit: 12,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                "meta.description": {
                  like: query,
                },
              },
              {
                "meta.title": {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  });

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none text-center dark:prose-invert">
          <h1 className="mb-8 lg:mb-16">{t("title")}</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">{t("not-found")}</div>
      )}
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SearchPage");
  return {
    title: t("meta-title"),
  };
}
