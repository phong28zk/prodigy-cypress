import Image from "next/image";
import React from "react";

import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";

import banner from "../../../public/appBanner.png";
import Cal from "../../../public/cal.png";
import Diamond from "../../../public/diamond.svg";
import Check from "../../../public/check.svg";

import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { randomUUID } from "crypto";
import CustomCard from "@/components/landing-page/custom-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <>
      <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="✨ Your workspace"
          title="All in one Collab and Product Platform"
        />
        <div className="bg-white p-[2px] mt-[6] rounded-xl bg-gradient-to-l from-primary to-brand-primaryBlue sm:w-[300px]">
          <Button
            variant="secondary"
            className="w-full rounded-[10px] p-6 text-2xl bg-background text-accent-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Get Free
          </Button>
        </div>
        <div
          className="md:mt-[-90px]
          sm:w-full w-[750px]
          flex justify-center items-center
          mt-[-40px] relative sm:ml-0 ml-[-50px]"
        >
          <Image src={banner} alt="Application Banner" />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="relative">
        <div
          className="overflow-hidden flex 
        after:absolute
        after:content[''] 
        after:dark:from-brand-dark 
        after:to-transparent 
        after:from-background 
        after:bg-gradient-to-l 
        after:right-0 
        after:bottom-0
        after:top-0 
        after:w-20 
        after:z-10
        before:absolute
        before:content[''] 
        before:dark:from-brand-dark 
        before:to-transparent 
        before:from-background 
        before:bg-gradient-to-r 
        before:right-0 
        before:top-0
        before:bottom-0 
        before:w-20 
        before:z-10
        "
        >
          {[...Array(2)].map((arr) => (
            <div key={arr} className="flex flex-nowrap animate-slide">
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className="relative w-[200px] m-20 shrink-0 flex items-center"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    className="object-contain max-w-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 sm:px-6 flex justify-center items-center flex-col relative">
        <div className="w-[30%] blur-[120[px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22" />
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Cap ur ideas, thoughts, and meeting notes in a str"
          pill="🎨 Features"
        />
        <div className="mt-10 max-w-[450px] flex justify-center items-center relative sm:ml-0 border-8 border-washed-purple-300 border-opacity-10">
          <Image src={Cal} alt="Banner" className="rounded-2xl" />
        </div>
      </section>
      <section className="relative">
        <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-washedPurple/50 -z-10 top-56" />
        <div className="mt-20 px-4 sm:px-6 flex flex-col overflow-x-hidden overflow-visible">
          <TitleSection
            title="Trusted by the world's best teams"
            subheading="Join 5m+ of satisfied users, personal and professional productivity needs."
            pill="🌏 Testimonials"
          />
          {[...Array(2)].map((arr, index) => (
            <div
              key={randomUUID()}
              className={twMerge(
                clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                  "flex-row-reverse": index === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                }),
                "hover:paused"
              )}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="w-[380px] shrink-0s rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background"
                  cardHeader={
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`/avatars/${index + 1}.png`} />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.name
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("")}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="text-accent-foreground text-sm">
                      {testimonial.message}
                    </p>
                  }
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="mt-20 px-4 sm:px-6">
        <TitleSection
          title="Perfect for your team"
          subheading="Experience all the benefits of our platform. Select a plan that fits your needs."
          pill="💶 Plan"
        />
        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center sm:items-stretch items-center mt-10">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={clsx(
                "w-[300px] rounded-2xl dark:bg-black/95 background-blur-3xl relative",
                {
                  "border-brand-primaryPurple/70":
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              cardHeader={
                <CardTitle className="text-2xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div className="hidden dark:block w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/80 -z-10 top-0"/>
                        <Image
                          src={Diamond}
                          alt="Pro Plan"
                          className="absolute top-6 right-6"
                        />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0 flex flex-row">
                  <span className="font-normal text-2xl">
                    <p
                      className={clsx(
                        "rounded-2xl dark:bg-black/95 background-blur-3xl relative",
                        {
                          "text-washed-purple-800":
                            card.planType === PRICING_PLANS.freeplan,
                        }
                      )}
                    >
                      {card.price}
                      {"$"}
                    </p>
                  </span>
                  {+card.price > 0 ? (
                    <span className="font-normal text-2xl">/month</span>
                  ) : (
                    ""
                  )}
                </CardContent>
              }
              cardFooter={
                <ul className="font-normal flex mb-2 flex-col gap-4">
                  <small>{card.highlightFeature}</small>
                  {card.freatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Image src={Check} alt="Check" className="" />
                      <div className="w-4 h-4 rounded-full bg-brand-primaryPurple/50 flex justify-center items-center">
                        <div className="w-2 h-2 rounded-full bg-brand-primaryPurple"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              }
            ></CustomCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
