"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { cn } from "@/utilities/cn";
import { CMSLink } from "@/components/Link";
import type { Header } from "@/payload-types";
import { Logo } from "@/components/Logo/Logo";

export const FloatingHeader = ({ data, theme }: { data: Header; theme: string | null }) => {
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [scrollDown, setScrollDown] = useState(false);

  const toggleMenu = () => {
    setisMenuOpened((menuState) => !menuState);
    document.body.classList.toggle("overflow-clip");
    document.body.classList.toggle("overflow-y-clip");
  };

  useEffect(() => {
    let lastScrollValue = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (data.hideOnScroll) {
        if (scrollTop > lastScrollValue && scrollTop > 300) {
          setScrollDown(true);
        } else if (scrollTop < lastScrollValue) {
          setScrollDown(false);
        }
        lastScrollValue = scrollTop;
      }

      setScrollValue(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const classes = cn(
    `sticky flex w-full top-0 justify-center md:px-12 transition-transformColors z-50`,
    `${scrollValue > 0 && !isMenuOpened ? "md:translate-y-6" : ""}`,
    `${data.hideOnScroll && scrollDown ? "-translate-y-full md:-translate-y-full" : ""}`,
    { ...(theme ? { "data-theme": theme } : {}) },
  );

  return (
    <header
      className={classes}
      style={data.background && scrollValue === 0 ? { background: data.background } : {}}
    >
      <div
        className={`header ${scrollValue > 0 ? "scrolled" : ""} ${isMenuOpened ? "opened" : ""}`}
        style={data.background ? { background: data.background } : {}}
      >
        <Link href="/" className="mr-auto">
          {data.logo && typeof data.logo !== "string" && data.logo.url && data.logo.alt ? (
            <Image
              src={data.logo.url}
              alt={data.logo.alt}
              width={data.logo.width ?? 256}
              height={data.logo.height ?? 256}
              className={`${isMenuOpened && "invert lg:invert-0"} -my-7 h-[88px] w-full max-w-[9.375rem]`}
            />
          ) : (
            <Logo />
          )}
        </Link>
        <button
          aria-label="Toggle Menu"
          className="order-1 ml-8 flex flex-col items-end justify-center gap-[6px] lg:hidden"
          onClick={toggleMenu}
        >
          <div
            className={`h-[3px] w-7 rounded-full bg-white transition-transform ${isMenuOpened && "absolute top-1/2 -translate-y-1/2 rotate-45 invert"}`}
          />
          <div
            className={`h-[3px] w-[22px] rounded-full bg-white transition-opacity ${isMenuOpened && "opacity-0"}`}
          />
          <div
            className={`h-[3px] w-7 rounded-full bg-white transition-transform ${isMenuOpened && "absolute top-1/2 -translate-y-1/2 -rotate-45 invert"}`}
          />
        </button>
        <nav
          className={`absolute left-1/2 top-0 -z-10 flex origin-bottom transition-opacity duration-300 ${isMenuOpened ? "opacity-100" : "scale-y-0 opacity-0"} h-dvh w-screen -translate-x-1/2 flex-col items-start justify-between bg-white p-8 pb-16 md:p-12 lg:static lg:h-auto lg:w-fit lg:translate-x-0 lg:scale-100 lg:flex-row lg:bg-transparent lg:p-0 lg:opacity-100`}
        >
          <div className="flex flex-col items-start gap-12 pt-24 lg:flex-row lg:pt-0">
            {data.navItems &&
              data.navItems.map(({ link }, i) => {
                return <CMSLink key={i} {...link} appearance="link" className="text-black lg:text-white" />;
              })}
          </div>
        </nav>
        <CMSLink className="ml-auto hidden md:flex" />
        <div className="backdrop_blur absolute left-1/2 -z-30 h-full w-full -translate-x-1/2" />
      </div>
    </header>
  );
};
