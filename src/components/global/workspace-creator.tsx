"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { User, workspace } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LockIcon, Plus, ShareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import { addCollaborators, createWorkspace } from "@/lib/supabase/queries";
import CollaboratorSearch from "./collaborator-search";

interface WorkspaceCreatorProps {}

const WorkspaceCreator: React.FC<WorkspaceCreatorProps> = ({}) => {
  const { user } = useSupabaseUser();
  const router = useRouter();
  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);

  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborator = (user: User) => {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  };

  const createItem = async () => {
    const uuid = v4();
    if (user?.id) {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: "🏢",
        id: uuid,
        inTrash: "",
        title,
        workspaceOwner: user.id,
        logo: null,
        bannerUrl: "",
      };
      if (permissions === "private") {
        await createWorkspace(newWorkspace);
        router.refresh();
      }

      if (permissions === "shared") {
        await createWorkspace(newWorkspace);
        await addCollaborators(collaborators, uuid);
        router.refresh();
      }
    }
  };

  return (
    <>
      <div className={`flex gap-4 flex-col`}>
        <div className={``}>
          <Label htmlFor="name" className={`text-sm text-muted-foreground`}>
            Name
          </Label>
          <div className={`flex justify-center items-center gap-2`}>
            <Input
              name="name"
              value={title}
              placeholder="Workspace name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <>
          <Label
            htmlFor={`permissions`}
            className={`text-sm text-muted-foreground`}
          >
            permissions
          </Label>
          <Select
            defaultValue={permissions}
            onValueChange={(val: React.SetStateAction<string>) => {
              setPermissions(val);
            }}
          >
            <SelectTrigger className={`w-full h-26 -mt-3`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="private">
                  <div className={`p-2 flex gap-4 justify-center items-center`}>
                    <LockIcon size={16} />
                    <article className={`text-left flex flex-col`}>
                      <span>Private</span>
                      <p>
                        Your workspace is private to you. You can choose it to
                        public it later 🔒{" "}
                      </p>
                    </article>
                  </div>
                </SelectItem>
                <SelectItem value="shared">
                  <div className={`p-2 flex gap-4 justify-center items-center`}>
                    <ShareIcon size={16} />
                    <article className={`text-left flex flex-col`}>
                      <span>Shared</span>
                      <p>You can invite your collaborators 👦</p>
                    </article>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
        {permissions === "shared" && (
          <>
            <CollaboratorSearch
              existingCollaborators={collaborators}
              getCollaborator={(user) => {
                addCollaborator(user[0]);
              }}
            >
              <Button type="button" className={`text-sm mt-4`}>
                <Plus />
                Add Collaborators
              </Button>
            </CollaboratorSearch>
          </>
        )}
        <Button
          type="button"
          disabled={
            !title || (permissions === "shared" && collaborators.length === 0)
          }
          variant={"secondary"}
          onClick={createItem}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default WorkspaceCreator;
