import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define registration schema
const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string().min(1, { message: "Server name is required" }),
  customDomain: z.string().optional(),
  plan: z.enum(["free", "premium"]),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = registrationSchema.parse(req.body);
      
      // Create a new user
      const user = await storage.createUser({
        username: validatedData.email,
        password: "hashed_password_would_go_here", // In a real app, you'd hash this
      });
      
      // In a real app, you would:
      // 1. Store the server name and custom domain
      // 2. Set up the user's moderation account
      // 3. Send a verification email
      // 4. Handle payment information for premium plan
      
      return res.status(201).json({ 
        success: true, 
        message: "Registration successful",
        user: {
          id: user.id,
          email: user.username
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
