import type { Metadata } from "next";

import { RelatedPosts } from "@/blocks/RelatedPosts/Component";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import config from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";
import RichText from "@/components/RichText";

import type { Post } from "@/payload-types";

import { PostHero } from "@/components/heros/PostHero";
import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = routing.locales.flatMap((locale) => {
    return posts.docs.map(({ slug }) => {
      return { locale, slug };
    });
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale: Locale;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "", locale } = await paramsPromise;
  const url = "/posts/" + slug;
  const post = await queryPostBySlug({ slug, locale });

  if (!post) return <PayloadRedirects locale={locale} url={url} />;

  return (
    <article className="pb-16 pt-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="mx-auto max-w-[48rem]" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
              docs={post.relatedPosts.filter((post) => typeof post === "object")}
            />
          )}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "", locale } = await paramsPromise;
  const post = await queryPostBySlug({ slug, locale });

  return generateMeta({ doc: post });
}

const queryPostBySlug = unstable_cache(
  async ({ slug, locale }: { slug: string; locale: Locale }) => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "posts",
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  },
  ["post-by-slug"],
  {
    tags: ["posts-content", "pages-content"],
  },
);
