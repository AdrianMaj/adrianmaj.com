"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

import type { Theme } from "./types";

import { useTheme } from "..";
import { themeLocalStorageKey } from "./types";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const ThemeSelector = () => {
  const { setTheme, theme } = useTheme();
  const [value, setValue] = useState("");

  const onThemeChange = (themeToSet: Theme & "auto") => {
    if (themeToSet === "auto") {
      setTheme(null);
      setValue("auto");
    } else {
      setTheme(themeToSet);
      setValue(themeToSet);
    }
  };

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey);
    setValue(preference ?? "auto");
  }, []);

  const t = useTranslations("ThemeSelector");

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label={t("label")}
        className="mx-auto w-auto gap-2 border-none bg-transparent pl-3 lg:-mx-3 lg:-my-2 lg:pl-3"
      >
        {theme === "light" && <SunIcon />}
        {theme === "dark" && <MoonIcon />}
        {theme === null && <SunMoonIcon />}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
};
