import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import nodemailer from "nodemailer"; // Added
import crypto from "crypto"; // Added

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
      const emailVerificationToken = crypto.randomBytes(32).toString("hex"); // Added
      
      // Create the server entry in MongoDB
      const serverInfo = await storage.createServer({
        adminEmail: validatedData.email,
        serverName: validatedData.serverName,
        customDomain: validatedData.customDomain,
        plan: validatedData.plan,
        emailVerificationToken, // Added
        emailVerified: false, // Added
      });

      // Send verification email
      const transporter = nodemailer.createTransport({
        host: "localhost", // Assuming postfix is running on localhost
        port: 25,
        secure: false, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      });

      const verificationLink = `http://${serverInfo.customDomain}.${process.env.DOMAIN || 'modl.pro'}/verify-email?token=${emailVerificationToken}`;

      await transporter.sendMail({
        from: '"MODL" <noreply@modl.pro>', // sender address
        to: validatedData.email, // list of receivers
        subject: "Verify Your Email Address for MODL", // Subject line
        text: `Please verify your email address by clicking the following link: ${verificationLink}`, // plain text body
        html: `<p>Please verify your email address by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`, // html body
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Registration successful. Please check your email to verify your account.", // Updated message
        server: {
          id: serverInfo.id,
          name: serverInfo.serverName
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation failed. Please check the details you provided and try again.", 
          errors: error.errors
        });
      }
      // Handle duplicate entry errors from storage.createServer
      if (error instanceof Error && error.message.startsWith("DUPLICATE_ENTRY:")) {
        return res.status(409).json({
          success: false,
          message: error.message.replace("DUPLICATE_ENTRY: ", ""), // More user-friendly message
        });
      }
      
      console.error("Registration error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An internal server error occurred during registration. Please try again later. If the issue persists, contact support."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
