import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";
import { marginFields, paddingFields } from "@/fields/spacingFields";

const slideFields: Field[] = [
  {
    name: "image",
    type: "upload",
    relationTo: "media",
    required: true,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_: any, { enableLink }: { enableLink: any }) => Boolean(enableLink),
      },
    },
  }),
];

export const Carousel: Block = {
  slug: "carousel",
  interfaceName: "CarouselBlock",
  imageURL: "/blocksThumbnails/carousel.png",
  imageAltText: "Carousel",
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Logo",
          value: "logo",
        },
      ],
      required: true,
      defaultValue: "default",
    },
    {
      name: "title",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      localized: true,
    },
    {
      name: "slides",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: slideFields,
    },
    {
      name: "autoplay",
      type: "number",
      admin: {
        condition: (_, { type }) => Boolean(type !== "logo"),
      },
    },
    marginFields,
    paddingFields,
  ],
};
