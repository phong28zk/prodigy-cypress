import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./workspace-dropdown";

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  // user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  // subscription
  const { data: subscriptionData, error: subsciptionError } =
    await getUserSubscriptionStatus(user.id);
  // folders
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );
  // errors
  if (foldersError || subsciptionError) redirect("/dashboard");
  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);
  // get all the dif workspaces

  return (
    <aside
      className={twMerge(
        `hidden sm:flex sm:flex-col w-[300px] shrink-0 p-4 md:gap-4 !justify-between`
      )}
    >
      <div className={``}>
        <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultWorkspace={[
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        ></WorkspaceDropdown>
      </div>
    </aside>
  );
};

export default Sidebar;
