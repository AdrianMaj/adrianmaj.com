"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useDebounce } from "@/utilities/useDebounce";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const Search = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
  }, [debouncedValue, router]);

  const t = useTranslations("SearchPage");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label htmlFor="search" className="sr-only">
          {t("input-placeholder")}
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder={t("input-placeholder")}
        />
        <button type="submit" className="sr-only">
          {t("search-button")}
        </button>
      </form>
    </div>
  );
};
