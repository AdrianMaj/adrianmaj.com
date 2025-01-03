import { cn } from '@/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { spacingTopClasses, spacingBottomClasses, getCenteringClasses } from "@/blocks/globals";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    oneSixth: "2",
    oneThird: "4",
    half: "6",
    twoThirds: "8",
    fiveSixth: "10",
    full: "12",
  };

  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[props["spacingTop"] || "medium"],
        spacingBottomClasses[props["spacingBottom"] || "medium"],
        getCenteringClasses(props.alignment || undefined),
      )}
    >
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  "md:col-span-2": size !== "full",
                })}
                key={index}
              >
                {richText && <RichText data={richText} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </section>
  )
}
