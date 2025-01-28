import { HeaderClient } from "./Component.client";
import { getGlobal } from "@/utilities/getGlobals";

import type { Header } from "@/payload-types";
import { Locale } from "@/i18n/config";

export async function Header({ locale }: { locale: Locale }) {
  const headerData: Header = await getGlobal("header", 1, locale);

  return <HeaderClient data={headerData} />;
}
