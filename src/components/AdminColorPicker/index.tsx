"use client";

import { GradientPicker } from "../ui/backgroundPicker";
import { TextFieldClientComponent } from "payload";
import { useField } from "@payloadcms/ui";

export const AdminColorPicker: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<{ value: string | undefined }>({ path });

  console.log(value);

  return (
    <div
      className="preview twp flex h-full min-h-[150px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background: typeof value === "string" ? value : "transparent" }}
    >
      <GradientPicker background={typeof value === "string" ? value : ""} setBackground={setValue} />
    </div>
  );
};
