"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import WorkspaceCreator from "../global/workspace-creator";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultWorkspace: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultWorkspace,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultWorkspace);
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch, state } = useAppState();

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({
            ...workspace,
            folders: [],
          })),
        },
      });
    }
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left`}>
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace
              workspace={selectedOption}
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            "Select a workspace"
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className={`origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
        >
          <div className={`rounded-md flex flex-col`}>
            <div className={`!p-2`}>
              {!!privateWorkspaces.length && (
                <>
                  <p className={`text-muted-foreground`}>Private</p>
                  <hr className={``}></hr>
                  {privateWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className={`text-muted-foreground`}>Shared</p>
                  <hr className={``}></hr>
                  {sharedWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className={`text-muted-foreground`}>Collaborating</p>
                  <hr className={``}></hr>
                  {collaboratingWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              )}
              <CustomDialogTrigger
                header="Create a new workspace"
                content={<WorkspaceCreator />}
                description="Create a new workspace"
              >
                <>
                    <div className={`flex transition-all hover:bg-muted justify-center items-center gap-2 p-2 w-full`}>
                      <article className={`text-slate-500 rounded-full bg-slate-800 w-4 h-4 flex items-center justify-center`}>
                        +
                      </article>
                      <p className={`text-sm text-slate-500`}>Create a new workspace</p>
                    </div>
                </>
              </CustomDialogTrigger>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
