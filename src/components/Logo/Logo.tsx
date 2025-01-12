import clsx from "clsx";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  // const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  // const loading = loadingFromProps || "lazy";
  // const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    // <img
    //   alt="Pimento logo"
    //   width={125}
    //   height={88}
    //   loading={loading}
    //   fetchPriority={priority}
    //   decoding="async"
    //   className={clsx("-my-7 h-[88px] w-full max-w-[9.375rem]", className)}
    //   src="/pimento.svg"
    // />
    <p className="twp text-xl font-semibold">adrianmaj.com</p>
  );
};
