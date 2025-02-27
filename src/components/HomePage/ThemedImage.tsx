"use client";
import { Media } from "@/payload-types";
import { useTheme } from "@/providers/Theme";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ThemedImage = ({ imageLight, imageDark }: { imageLight: Media; imageDark: Media }) => {
  const { theme } = useTheme();

  const t = useTranslations("ThemedImage");

  if (!theme) {
    return null;
  }

  return theme === "light" ? (
    <Image
      src={imageLight.url ?? ""}
      width={imageLight.width ?? 948}
      className="max-h-[700px] min-h-80 w-full object-cover object-left sm:object-contain sm:object-right"
      height={imageLight.height ?? 517}
      priority={true}
      loading="eager"
      alt={t("alt")}
    />
  ) : (
    <Image
      src={imageDark.url ?? ""}
      width={imageDark.width ?? 948}
      height={imageDark.height ?? 517}
      priority={true}
      loading="eager"
      className="max-h-[700px] min-h-80 w-full object-cover object-left sm:object-contain sm:object-right"
      alt={t("alt")}
    />
  );
};
