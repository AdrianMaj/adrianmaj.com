import type { Page } from "@/payload-types";

import RichText from "@/components/payload/richText";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
    }
  | (Omit<Page["hero"], "richText"> & {
      children?: never;
      richText?: Page["hero"]["richText"];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div>{children || (richText && <RichText data={richText} enableGutter={false} />)}</div>
    </div>
  );
};
