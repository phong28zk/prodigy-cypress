"use client";
import React from "react";
import { AuthUser } from "@supabase/supabase-js";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: {} | null;
}
const DashboardSetup: React.FC<DashboardSetupProps> = ({
  user,
  subscription,
}) => {
  return (
    <Card className={`w-[800px] h-screen sm:h-auto`}>
      <CardHeader>
        <CardTitle>Create a workspace</CardTitle>
        <CardDescription>
          Let{`'`}s create a private workspace for you to start building your
          app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => {}}>
          <div className={`flex flex-col gap-4`}></div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
