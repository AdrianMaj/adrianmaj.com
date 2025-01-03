import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import { spacingBottomClasses, spacingTopClasses } from "@/blocks/globals";

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  spacingTop,
  spacingBottom,
}) => {
  return (
    <div
      className={cn(
        "container",
        spacingTopClasses[spacingTop || "medium"],
        spacingBottomClasses[spacingBottom || "medium"],
      )}
    >
      <div className="flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[48rem] items-center">
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

