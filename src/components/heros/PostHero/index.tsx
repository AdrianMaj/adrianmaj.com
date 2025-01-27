import { formatDateTime } from "src/utilities/formatDateTime";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { formatAuthors } from "@/utilities/formatAuthors";
import { Fragment } from "react";

export const PostHero = ({ post }: { post: Post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== "";

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <div className="mb-5 text-sm uppercase">
            {categories?.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || "Untitled category";

                const isLast = index === categories.length - 1;

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <>, &nbsp;</>}
                  </Fragment>
                );
              }
              return null;
            })}
          </div>

          <div className="">
            <h1 className="mb-5 text-3xl sm:mb-6 md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== "string" && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[55%] w-full bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};
