import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import {
  BgColorFeature,
  HighlightColorFeature,
  TextColorFeature,

} from "payloadcms-lexical-ext";

import { linkGroup } from "@/fields/linkGroup";
import { spacingFields } from "@/fields/spacingFields";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            TextColorFeature(),
            HighlightColorFeature(),
            BgColorFeature(),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ["default", "outline"],
      overrides: {
        maxRows: 2,
      },
    }),
    ...spacingFields,
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
