"use client";
import { useTheme } from "@/providers/Theme";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ThemedImage = () => {
  const { theme } = useTheme();

  const t = useTranslations("ThemedImage");

  if (!theme) {
    return null;
  }

  return theme === "light" ? (
    <Image
      src="/api/media/file/welcome-light.jpg"
      width="948"
      className="min-h-80 w-full object-cover object-left"
      height="517"
      priority={true}
      loading="eager"
      alt={t("alt")}
    />
  ) : (
    <Image
      src="/api/media/file/welcome-dark.jpg"
      width="948"
      height="517"
      priority={true}
      loading="eager"
      className="min-h-80 w-full object-cover object-left"
      alt={t("alt")}
    />
  );
};
