"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
  FieldLabel,
  Field,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { Shield, User, Store } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Demo credentials — shown as quick-fill buttons per Gladiator requirement #6
const DEMO_ACCOUNTS = [
  {
    label: "Admin",
    icon: Shield,
    email: "admin@gmail.com",
    password: "admin1234",
  },
  {
    label: "Seller",
    icon: Store,
    email: "jahid@gmail.com",
    password: "@tawhid@",
  },
  {
    label: "Customer",
    icon: User,
    email: "designwithtawhid@gmail.com",
    password: "@tawhid@",
  },
];

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Logged in successfully", { id: toastId });
       
        window.location.href = "/";
      } catch (err) {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  // Demo button just fills the form fields — user still clicks "Login"
  // themselves, matching the spec: "Demo login button (auto-fill credentials)"
  const fillDemo = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    toast.info("Demo credentials filled — click Login to continue");
  };

  return (
    <Card {...props} className="shadow-lg border-border/60">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Login to your MediStore account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Demo login quick-fill buttons */}
        <div className="grid grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map(({ label, icon: Icon, email, password }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              size="sm"
              className="flex flex-col h-auto gap-1 py-2 text-xs"
              onClick={() => fillDemo(email, password)}
            >
              <Icon size={16} />
              {label}
            </Button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              or login manually
            </span>
          </div>
        </div>

        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 w-full justify-end">
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          form="login-form"
          type="submit"
        >
          Login
        </Button>
        <p className="text-sm text-muted-foreground text-center w-full">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}