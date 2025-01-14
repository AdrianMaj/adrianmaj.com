"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

import type { Theme } from "./types";

import { useTheme } from "..";
import { themeLocalStorageKey } from "./types";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

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

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="-mx-3 -my-2 w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
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
