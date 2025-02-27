import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "src/utilities/cn";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import type { Media, Page, Post } from "@/payload-types";

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  onClick?: () => void;
  reference?: {
    relationTo: "pages" | "posts";
    value: Page | Post | string | number;
  } | null;
  size?: ButtonProps["size"] | null;
  icon?: Media | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

export const CMSLink = (props: CMSLinkType) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    icon,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onClick,
  } = props;

  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${reference.value.slug}`
      : url;

  if (!href) return null;

  const size = appearance === "link" ? "clear" : sizeFromProps;
  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link onClick={onClick} className={cn(className, "min-w-6")} href={href || url || ""} {...newTabProps}>
        {icon && icon.url && (
          <Image
            alt={icon.alt}
            src={icon.url}
            width={icon.width ?? 36}
            height={icon.height ?? 36}
            className="min-w-6 invert"
          />
        )}
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={cn(className, "min-w-6")} size={size} variant={appearance}>
      <Link onClick={onClick} className={cn(className, "min-w-6")} href={href || url || ""} {...newTabProps}>
        {icon && icon.url && (
          <Image
            alt={icon.alt}
            src={icon.url}
            width={icon.width ?? 36}
            height={icon.height ?? 36}
            className="min-w-6 invert"
          />
        )}
        {label && label}
        {children && children}
      </Link>
    </Button>
  );
};
