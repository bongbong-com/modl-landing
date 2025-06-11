import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define registration schema
const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string().min(3, { message: "Server name is required (min 3 characters)" }),
  customDomain: z.string().min(3, { message: "Subdomain is required (min 3 characters)" }),
  plan: z.enum(["free", "premium"]).default("free"),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registrationSchema.parse(req.body);
      
      // Create the server entry in MongoDB and its dedicated database
      const serverInfo = await storage.createServer({
        adminEmail: validatedData.email,
        serverName: validatedData.serverName,
        customDomain: validatedData.customDomain,
        plan: validatedData.plan,
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Registration successful. Server created.",
        server: {
          id: serverInfo.id,
          name: serverInfo.serverName,
          database: serverInfo.databaseName
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors
        });
      }
      
      console.error("Registration error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Registration failed. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
