import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/cn";
import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from "@/blocks/globals";

export const CallToActionBlock = ({
  links,
  richText,
  spacingTop,
  spacingBottom,
  paddingBottom,
  paddingTop,
}: CTABlockProps) => {
  return (
    <div
      className={cn(
        "container",
        spacingTopClasses[spacingTop || "medium"],
        spacingBottomClasses[spacingBottom || "medium"],
        paddingTopClasses[paddingTop || "medium"],
        paddingBottomClasses[paddingBottom || "medium"],
      )}
    >
      <div className="flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[56rem] items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />;
          })}
        </div>
      </div>
    </div>
  );
};
