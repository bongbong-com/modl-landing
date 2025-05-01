import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import SuccessModal from "./SuccessModal";

const registrationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  serverName: z.string().min(1, { message: "Server name is required" }),
  customDomain: z.string().optional(),
  plan: z.enum(["free", "premium"]),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/register");
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialPlan = new URLSearchParams(window.location.search).get("plan") || "free";

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      serverName: "",
      customDomain: "",
      plan: initialPlan as "free" | "premium",
      agreeTerms: false,
    },
  });

  const onSubmit = async (values: RegistrationValues) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/register", values);
      if (res.ok) {
        setShowSuccess(true);
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
      
      <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); backToHome(); }} className="flex items-center">
              <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
              <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
            </a>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground flex items-center" onClick={backToHome}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </nav>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Gaming setup with colorful RGB lighting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-md px-8">
            <div className="text-4xl font-bold mb-4">Join the revolution in game moderation</div>
            <div className="text-muted-foreground">Set up your moderation system in minutes, not months.</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create your account</h2>
              <p className="text-muted-foreground">
                Get started with your free modl account
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Admin Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="px-4 py-3 rounded-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Server Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Awesome Game"
                          {...field}
                          className="px-4 py-3 rounded-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Custom Domain <span className="text-muted-foreground text-xs">(optional)</span>
                      </FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="yourcompany"
                            {...field}
                            className="px-4 py-3 rounded-l-md bg-card/50 border border-gray-700 text-foreground focus:outline-none focus:border-primary"
                          />
                        </FormControl>
                        <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-700 bg-card/80 text-muted-foreground">
                          .modl.gg
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">You can also use your own domain later</p>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Plan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <div className={`relative p-4 rounded-md border ${field.value === 'free' ? 'border-primary' : 'border-gray-700'} bg-card/50 hover:bg-card/80 transition-colors cursor-pointer`}>
                            <RadioGroupItem value="free" id="free-plan" className="absolute right-4 top-4 opacity-0" />
                            <Label htmlFor="free-plan" className="cursor-pointer">
                              <div className="font-medium">Free Plan</div>
                              <div className="text-sm text-muted-foreground mt-1">$0/month</div>
                            </Label>
                          </div>
                          
                          <div className={`relative p-4 rounded-md border ${field.value === 'premium' ? 'border-primary' : 'border-gray-700'} bg-card/50 hover:bg-card/80 transition-colors cursor-pointer`}>
                            <RadioGroupItem value="premium" id="premium-plan" className="absolute right-4 top-4 opacity-0" />
                            <Label htmlFor="premium-plan" className="cursor-pointer">
                              <div className="font-medium">Premium Plan</div>
                              <div className="text-sm text-muted-foreground mt-1">$20/month</div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="agree-terms"
                          className="h-4 w-4 rounded border-gray-700 bg-card/50 text-primary focus:ring-primary focus:ring-offset-background"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label
                          htmlFor="agree-terms"
                          className="text-sm text-foreground cursor-pointer"
                        >
                          I agree to the <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
                        </Label>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center text-muted-foreground">
              Already have an account? <a href="#" className="text-primary hover:text-primary/80">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
