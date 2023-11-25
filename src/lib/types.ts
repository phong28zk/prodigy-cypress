import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe("Email address").email({
        message: "Invalid email address",
    }),
    password: z.string().describe("Password").min(8, "Password is not shorter than 8 letters").max(100),
})