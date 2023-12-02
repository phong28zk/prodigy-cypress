import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe("Email address").email({
        message: "Invalid email address",
    }),
    password: z.string().describe("Password").min(8, "Password is not shorter than 8 letters").max(100),
})

export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z
        .string()
        .describe('Workspace Nme')
        .min(1, "minimum 1 char"),
    logo: z.any(),
})