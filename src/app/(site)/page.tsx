import Image from "next/image";
import React from "react";

import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";


import banner from "../../../public/appBanner.png";
import Cal from "../../../public/cal.png";

import { CLIENTS, USERS } from "@/lib/constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { randomUUID } from "crypto";
import CustomCard from "@/components/landing-page/custom-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <div
              key={arr}
              className="flex flex-nowrap animate-slide"
            >
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className="relative w-[200px] m-20 shrink-0 flex items-center">
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
        <div className="w-[30%] blur-[120[px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-22"/>
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Cap ur ideas, thoughts, and meeting notes in a str"
          pill="🎨 Features"
        />
        <div className="mt-10 max-w-[450px] flex justify-center items-center relative sm:ml-0 border-8 border-washed-purple-300 border-opacity-10">
          <Image
            src={Cal}
            alt="Banner"
            className="rounded-2xl"
          />
        </div>
      </section>
      <section className="relative">
        <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-washedPurple/50 -z-10 top-56"/>
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
                  clsx('mt-10 flex flex-nowrap gap-6 self-start', {
                    'flex-row-reverse': index === 1,
                    'animate-[slide_250s_linear_infinite]': true,
                    'animate-[slide_250s_linear_infinite_reverse]': index === 1,
                  }), 'hover:paused'
                )}
              >
                {USERS.map((testimonial, index) => (
                  <CustomCard 
                    key={testimonial.name}
                    className="w-[380px] shrink-0s rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background"
                    cardHeader={
                      <div
                        className="flex items-center gap-4"
                      >
                        <Avatar>
                          <AvatarImage
                            src={`/avatars/${index+1}.png`}
                          />
                          <AvatarFallback>
                            AV
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    }
                  >

                  </CustomCard>
                ))}
              </div>
            ))}
          </div>
      </section>
    </>
  );
};

export default HomePage;
