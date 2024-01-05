"use client";
import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-provider";
import { Subscription } from "@/lib/supabase/supabase.types";
import React, { useState, useEffect } from "react";
import { Progress } from "../ui/progress";

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}

const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100
  );

  useEffect(() => {
    const stateFoldersLength =
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders.length || 0;

    if (stateFoldersLength === undefined) return;
    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);
  return (
    <article className={`mb-4`}>
      {subscription?.status !== "active" && (
        <div className={`flex gap-2 text-muted-foreground mb-2 items-center`}>
          <div className={`flex justify-between w-full items-center`}>
            <div className={`flex gap-2 items-center`}>
              <div className={`text-sm`}>Free Plan</div>
            </div>
            {/* <div className={`text-sm`}>
              {foldersLength}/{MAX_FOLDERS_FREE_PLAN} Folders
            </div> */}
            <small>{usagePercentage.toFixed(0)}%/100%</small>
          </div>
        </div>
      )}
      {subscription?.status !== "active" && (
        <Progress value={usagePercentage} className={`w-full h-1`} />
      )}
    </article>
  );
};

export default PlanUsage;
