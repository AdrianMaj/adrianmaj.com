import { Config } from "payload";
import {
  LinkFeature,
  lexicalEditor,
  BlocksFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from "payload-lexical-typography";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      ...defaultFeatures,
      BlocksFeature({
        inlineBlocks: [MediaBlock],
      }),
      InlineToolbarFeature(),
      LinkFeature({
        enabledCollections: ["pages", "posts"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
            },
          ];
        },
      }),
      TextColorFeature(),
      TextSizeFeature(),
      TextLetterSpacingFeature(),
      TextLineHeightFeature(),
      TextFontFamilyFeature(),
    ];
  },
});
