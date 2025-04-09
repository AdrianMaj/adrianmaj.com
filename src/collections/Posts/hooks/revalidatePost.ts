import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Post } from "@/payload-types";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Always revalidate the general cache tags
    revalidateTag("posts-content");
    revalidateTag("pages-content");

    // For published posts, also revalidate the specific path
    if (doc._status === "published") {
      const path = `/posts/${doc.slug}`;
      payload.logger.info(`Revalidating post at path: ${path}`);

      revalidatePath(path);
      revalidateTag(`post_${doc.slug}`);
      revalidateTag("posts-sitemap");
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath = `/posts/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old post at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag(`post_${previousDoc.slug}`);
      revalidateTag("posts-sitemap");
    }

    // If the slug changed, revalidate both old and new slugs
    if (previousDoc && previousDoc.slug !== doc.slug) {
      payload.logger.info(`Slug changed from ${previousDoc.slug} to ${doc.slug}, revalidating both`);

      revalidateTag(`post_${previousDoc.slug}`);
      if (doc.slug) {
        revalidateTag(`post_${doc.slug}`);
      }
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating after deleting post: ${doc?.slug}`);

    // Revalidate the general cache tags
    revalidateTag("posts-content");
    revalidateTag("pages-content");

    // If we have a slug, revalidate the specific path and tag
    if (doc?.slug) {
      const path = `/posts/${doc.slug}`;
      revalidatePath(path);
      revalidateTag(`post_${doc.slug}`);
      revalidateTag("posts-sitemap");
    }
  }

  return doc;
};
