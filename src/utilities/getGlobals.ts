import type { Config } from "@/payload-types";

import configPromise from "@payload-config";
import { DataFromGlobalSlug, getPayload } from "payload";
import { unstable_cache } from "next/cache";
import { Locale } from "@/i18n/config";

type Global = keyof Config["globals"];

export async function getGlobal<T extends Global>(slug: T, depth = 0, locale: Locale) {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    locale,
    depth,
  });

  return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  locale: Locale,
  depth?: number,
): (() => Promise<DataFromGlobalSlug<T>>) =>
  unstable_cache(
    async (): Promise<DataFromGlobalSlug<T>> => {
      return (await getGlobal(slug, depth, locale)) as DataFromGlobalSlug<T>;
    },
    [slug],
    {
      tags: [`global_${slug}`],
    },
  );
