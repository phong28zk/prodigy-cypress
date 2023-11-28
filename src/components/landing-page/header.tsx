"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Tuchel from "../../../public/tuchel.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const routes = [
  { title: "Features", href: "#features" },
  { title: "Resources", href: "#resources" },
  { title: "Contact", href: "#contact" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "Sign Up", href: "#signup" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Component Driven",
    href: "#",
    description: `Build encapsulated components that manage their state, then compose them to make complex UIs.`,
  },
  {
    title: "Developer Experience",
    href: "#",
    description: `Build encapsulated components that manage their state, then compose them to make complex UIs.`,
  },
  {
    title: "Design First",
    href: "#",
    description: `Build encapsulated components that manage their state, then compose them to make complex UIs.`,
  },
  {
    title: "Open Source",
    href: "#",
    description: `Build encapsulated components that manage their state, then compose them to make complex UIs.`,
  },
];

const Header = () => {
  const [path, setPath] = useState("#products");
  return (
    <header className="p-4 flex justify-center items-center">
      <Link href={"/"} className="w-full flex flex-row items-center">
        <Image src={Tuchel} alt="Maoffff" width={25} height={25} />
        <span className="font-semibold dark:text-white">Cypress</span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn({
                "dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "#resources",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    Welcome
                  </span>
                </li>
                <ListItem href="#" title="Intro">
                  Reuseable comps built using Radix and Tailwind
                </ListItem>
                <ListItem href="#" title="Intro">
                  Reuseable comps built using Radix and Tailwind
                </ListItem>
                <ListItem href="#" title="Intro">
                  Reuseable comps built using Radix and Tailwind
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#pricing")}
              className={cn({
                "dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem title="Pro Plan" href={"#"}>
                  All the features are available to access
                </ListItem>
                <ListItem title="Free Plan" href={"#"}>
                  Basic Plan for free
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuContent>
              <ul
                className="grid w-[400px]
              gap-3
              p-4
              md:w-[500px]
              md:grid-cols-2 
              lg:w-[600px]
              "
              >
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                'dark:text-white': path === '#testimonials',
                'dark:text-white/40': path !== '#testimonials',
                'font-normal': true,
                'text-xl': true,
              })}
            >
              Testimonial
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full gap-2 justify-end">
        <Link href={"/login"}>
          <Button variant="btn-secondary" className="p-1 hidden sm:block">
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button variant="btn-primary" className="whitespace-nowrap">
            Register
          </Button>
        </Link>
      </aside>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}
        >
          <div className="text-white text-sm font-medium leading-none">
            {title}
          </div>
          <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug text-white/40">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
