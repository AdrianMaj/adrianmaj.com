import type { CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    plural: {
      en: "Posts Categories",
      pl: "Kategorie postów",
    },
    singular: {
      en: "Post Category",
      pl: "Kategoria postów",
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
