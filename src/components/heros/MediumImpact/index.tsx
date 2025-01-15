import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/cn";

export const MediumImpactHero = ({ links, media, richText, reversed }: Page["hero"]) => {
  return (
    <div
      className={cn(
        "container flex flex-col lg:flex-row",
        reversed && "flex-col-reverese lg:flex-row-reverse",
      )}
    >
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="container">
        {media && typeof media === "object" && (
          <div>
            <Media imgClassName="" priority loading="eager" resource={media} />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
