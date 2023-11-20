import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <div className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
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
      </div>
    </section>
  );
};

export default HomePage;
