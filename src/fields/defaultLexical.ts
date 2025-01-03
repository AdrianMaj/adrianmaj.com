import { Config } from "payload";
import { LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BgColorFeature,
  HighlightColorFeature,
  TextColorFeature,
  YoutubeFeature,
  VimeoFeature,
} from "payloadcms-lexical-ext";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      ...defaultFeatures,
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
      // TextColorFeature(),
      // HighlightColorFeature(),
      // BgColorFeature(),


      //   YoutubeFeature(),
      //   VimeoFeature(),
    ];
  },
});
