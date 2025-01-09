import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "attribution",
      type: "richText",
      label: "Attribution",
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/globals/Footer/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
