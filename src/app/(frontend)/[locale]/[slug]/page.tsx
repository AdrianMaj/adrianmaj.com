import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import config from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { Locale } from "@/i18n/config";

import type { Page as PageType } from "@/payload-types";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/components/heros/RenderHero";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = routing.locales.flatMap((locale) => {
    return pages.docs
      ?.filter((doc) => doc.slug !== "home")
      .map(({ slug }) => {
        return { locale, slug };
      });
  });

  return params;
}

type Args = {
  params: Promise<{
    locale: Locale;
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  // const { isEnabled: draft } = await draftMode();
  const { slug = "home", locale } = await paramsPromise;

  const url = `/${locale}/${slug}`;


  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
    locale,
  });

  if (!page) {
    return <PayloadRedirects url={url} locale={locale} />;
  }

  const { hero, layout } = page;

  return (
    <article className="pb-24 pt-16">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      {!page && slug !== "home" && <PayloadRedirects disableNotFound locale={locale} url={url} />}

      {/* {draft && <LivePreviewListener />} */}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "home", locale } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
    locale,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    locale,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
