import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShieldCheck, HeartPulse, Store, Users } from "lucide-react";

export const metadata = {
  title: "About Us | MediStore",
  description:
    "Learn about MediStore's mission to make authentic medicine access safe, transparent, and reliable.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Sellers",
    desc: "Every pharmacy on MediStore goes through a verification process before they can list a single product.",
  },
  {
    icon: HeartPulse,
    title: "Patient First",
    desc: "Every design and process decision starts with what's safest and clearest for the person buying medicine.",
  },
  {
    icon: Store,
    title: "Built for Pharmacies",
    desc: "We give sellers real tools to manage inventory, orders, and customers — not just a listing page.",
  },
  {
    icon: Users,
    title: "Secure by Default",
    desc: "Role-based access and order safeguards protect customers, sellers, and admins alike.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <Badge variant="secondary" className="mx-auto w-fit">
          About MediStore
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Making medicine access
          <span className="text-primary"> safe and simple</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          MediStore connects customers with verified pharmacies to ensure
          authentic medicines, transparent pricing, and fast delivery — all
          in one secure platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="space-y-4 text-muted-foreground">
          <p>
            We created MediStore to remove the confusion and risk from buying
            medicines online. Every seller is verified, every product is
            monitored, and every order is handled with care.
          </p>
          <p>
            Whether you&apos;re a customer, pharmacy owner, or healthcare
            partner, MediStore provides a secure and scalable system built
            for real-world medical needs.
          </p>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            Our platform is designed around one principle: buying medicine
            online should never feel uncertain. That means clear seller
            information, honest reviews, and no shortcuts around
            authenticity checks.
          </p>
          <p>
            As we grow, our goal stays the same — connect more verified
            pharmacies with more patients, without compromising on trust.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {values.map(({ icon: Icon, title, desc }) => (
          <Card
            key={title}
            className="flex gap-4 rounded-xl border border-border p-5 shadow-sm dark:border-white/10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold leading-none">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}