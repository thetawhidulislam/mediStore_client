import { SignupForm } from "@/components/modules/auth/signup-form";
import { AuthBrandPanel } from "@/components/modules/auth/auth-brand-panel";

export default function Page() {
  return (
    <div className="min-h-svh w-full grid lg:grid-cols-2">
      <AuthBrandPanel />
      <div className="flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
