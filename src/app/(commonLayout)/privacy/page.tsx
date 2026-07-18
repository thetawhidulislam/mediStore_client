import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | MediStore",
  description: "How MediStore collects, uses, and protects your data.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — such as your name, email, phone number, and delivery address when you create an account or place an order. We also collect order history and prescription details necessary to fulfill your purchases.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, verify prescriptions where required, communicate order updates, and improve our platform. We do not sell your personal information to third parties.",
  },
  {
    title: "Sharing With Sellers",
    body: "When you place an order, relevant order details (such as delivery address and items purchased) are shared with the verified pharmacy fulfilling your order, so they can process and deliver it.",
  },
  {
    title: "Data Security",
    body: "We use role-based access controls and industry-standard security practices to protect your account and order data from unauthorized access.",
  },
  {
    title: "Cookies",
    body: "MediStore uses cookies to keep you signed in, remember your preferences, and understand how the platform is used so we can improve it.",
  },
  {
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of your personal data at any time by contacting our support team.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this policy from time to time. Continued use of MediStore after changes means you accept the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <Badge variant="secondary" className="mx-auto w-fit">
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="text-sm text-muted-foreground">Last updated: July 2026</p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
