import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import config from "@payload-config";
import { getPayload } from "payload";
import RichText from "@/components/RichText";

import { CollectionArchive } from "@/components/CollectionArchive";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

export const ArchiveBlock = async (
  props: ArchiveBlockProps & {
    id?: string;
  },
) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props;

  const limit = limitFromProps || 3;

  let posts: Post[] = [];

  const locale = (await getLocale()) as Locale;

  if (populateBy === "collection") {
    const payload = await getPayload({ config });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      locale,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
              _status: {
                equals: "published",
              },
            },
          }
        : {
            where: {
              _status: {
                equals: "published",
              },
            },
          }),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value;
      }) as Post[];

      posts = filteredSelectedPosts;
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
