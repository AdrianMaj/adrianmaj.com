import { getPayload } from "payload";
import config from "@payload-config";
import { ThemedImage } from "./ThemedImage";
export const ThemedImageServer = async () => {
  const payload = await getPayload({ config });
  const imageLight = await payload.findByID({
    collection: "media",
    id: "6793fc1ce4ea03f1c753f3ce",
  });
  const imageDark = await payload.findByID({
    collection: "media",
    id: "6793f61fe4ea03f1c753e5c2",
  });
  return <ThemedImage imageLight={imageLight} imageDark={imageDark} />;
};
