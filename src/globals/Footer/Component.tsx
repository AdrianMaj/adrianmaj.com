import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";

import type { Footer } from "@/payload-types";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import LocaleSwitch from "@/components/LocaleSwitch/LocaleSwitch";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerData: Footer = await getCachedGlobal("footer", locale, 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="mt-auto border-t border-border bg-black text-white dark:bg-card">
      <div className="container flex gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-4 md:flex-row">
          <nav className="flex flex-row items-center gap-4 lg:gap-8">
            {navItems.map(({ link, icon }, i) => {
              return (
                <CMSLink
                  icon={typeof icon !== "string" ? icon : null}
                  className="text-white"
                  key={i}
                  {...link}
                />
              );
            })}
          </nav>
        </div>
      </div>
      {footerData.attribution ? (
        <div className="flex border-t p-4 text-xs">
          <div className="container">
            <RichText data={footerData.attribution} />
          </div>
        </div>
      ) : null}
    </footer>
  );
}
