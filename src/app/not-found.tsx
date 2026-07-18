import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-16 font-body">
      <div className="w-full max-w-[560px] text-center">
        <p className="text-crimson text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          Lost in the layout
        </p>

        <h1 className="text-[clamp(5rem,18vw,9rem)] leading-none font-medium text-black">
          404
        </h1>

        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-black">
          This page never made it to production.
        </h2>

        <p className="mt-4 text-[#555] text-[17px] leading-relaxed">
          The page you&apos;re looking for was moved, renamed, or doesn&apos;t
          exist. Let&apos;s get you back to something that does.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-2.5 bg-crimson text-white text-[15px] font-medium
              rounded-full transition-all duration-300 hover:-translate-y-0.5
              hover:shadow-[3px_3px_1.5px_rgba(0,0,0,0.25)]"
          >
            <Compass size={18} />
            Back to home
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-2.5 border-2 border-[#e2e0e0] text-black text-[15px] font-medium
              rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson hover:text-crimson"
          >
            Contact instead
          </Link>
        </div>
      </div>
    </section>
  );
}
