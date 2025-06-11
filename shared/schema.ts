import { z } from "zod";

// Define registration schema
export const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string().min(3, { message: "Server name is required (min 3 characters)" }),
  customDomain: z.string().min(3, { message: "Subdomain is required (min 3 characters)" }),
  plan: z.enum(["free", "premium"]).default("free"),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
});

export type Registration = z.infer<typeof registrationSchema>;

// Define server schema (conceptual for MongoDB)
export const serverSchema = z.object({
  adminEmail: z.string().email(),
  serverName: z.string(),
  customDomain: z.string(),
  plan: z.enum(["free", "premium"]),
});

export type InsertServer = z.infer<typeof serverSchema>;
export type Server = InsertServer & { id: string; databaseName: string };
