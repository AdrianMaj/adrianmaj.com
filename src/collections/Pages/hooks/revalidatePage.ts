import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Page } from "@/payload-types";

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Always revalidate the general cache tags
    revalidateTag("pages-content");

    if (doc._status === "published") {
      const path = doc.slug === "home" ? "/" : `/${doc.slug}`;
      payload.logger.info(`Revalidating page at path: ${path}`);

      revalidatePath(path);
      revalidateTag(`page_${doc.slug}`);
      revalidateTag("pages-sitemap");
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath = previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old page at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag(`page_${previousDoc.slug}`);
      revalidateTag("pages-sitemap");
    }

    // If the slug changed, revalidate both old and new slugs
    if (previousDoc && previousDoc.slug !== doc.slug) {
      payload.logger.info(`Slug changed from ${previousDoc.slug} to ${doc.slug}, revalidating both`);

      revalidateTag(`page_${previousDoc.slug}`);
      if (doc.slug) {
        revalidateTag(`page_${doc.slug}`);
      }
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating after deleting page: ${doc?.slug}`);

    // Revalidate the general cache tag
    revalidateTag("pages-content");

    // If we have a slug, revalidate the specific path and tag
    if (doc?.slug) {
      const path = doc.slug === "home" ? "/" : `/${doc.slug}`;
      revalidatePath(path);
      revalidateTag(`page_${doc.slug}`);
      revalidateTag("pages-sitemap");
    }
  }

  return doc;
};
