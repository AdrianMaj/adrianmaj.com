import { useTranslations } from "next-intl";
import PageTemplate, { generateMetadata } from "./[slug]/page";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ThemedImage } from "@/components/HomePage/ThemedImage";
import { getPayload } from "payload";
import config from "@payload-config";

const HomePage = async ({ params }) => {
  const t = useTranslations("HomePage");
  const payload = await getPayload({ config });
  const imageLight = await payload.findByID({
    collection: "media",
    id: "6793fc1ce4ea03f1c753f3ce",
  });
  const imageDark = await payload.findByID({
    collection: "media",
    id: "6793f61fe4ea03f1c753e5c2",
  });

  return (
    <main>
      <section className="container mr-0 flex max-w-sm-half flex-col gap-16 py-20 pr-0 md:max-w-md-half lg:max-w-lg-half lg:flex-row lg:gap-0 xl:max-w-xl-half 2xl:max-w-2xl-half">
        <div className="flex flex-col justify-center lg:w-1/2">
          <h1 className="mb-9 text-4xl font-semibold">{t("title")}</h1>
          <p className="mb-12 text-xl font-light xl:max-w-md xl:pr-4">{t("subtitle")}</p>
          <div className="flex space-x-6">
            <Button asChild>
              <Link href="/blog">{t("button")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">{t("portfolio-button")}</Link>
            </Button>
          </div>
        </div>
        <ThemedImage imageLight={imageLight} imageDark={imageDark} />
      </section>
      <PageTemplate params={params} />
    </main>
  );
};
export default HomePage;

export { generateMetadata };
