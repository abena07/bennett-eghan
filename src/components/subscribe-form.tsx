import { ArrowUpRight } from "lucide-react";

const BUTTONDOWN_USER = "bennett-eghan";

export function SubscribeForm({ className = "" }: { className?: string }) {
  return (
    <section className={`not-prose ${className}`}>
      <div className="border-t border-[#0B0F1F]/10 mb-8" />

      <div className="flex flex-col gap-1.5">
        <div className="text-[14px] font-medium text-[#0B0F1F] [font-variant:small-caps]">
          newsletter
        </div>
        <p className="text-[12px] text-[#0B0F1F]/80">
          subscribe if you want to keep tabs on me :)
        </p>

        <form
          action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`}
          method="post"
          target="_blank"
          className="mt-2 flex flex-wrap items-center gap-3"
        >
          <label htmlFor="bd-email" className="sr-only">
            email address
          </label>
          <input
            id="bd-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full max-w-[240px] rounded-[4px] bg-[#E1E4EA] px-2.5 py-1.5 text-[12px] text-[#0B0F1F] placeholder:text-[#0B0F1F]/40 outline-none focus-visible:ring-1 focus-visible:ring-[#0B0F1F]/30"
          />
          <input type="hidden" name="embed" value="1" />
          <button
            type="submit"
            className="inline-flex items-center gap-1 text-[12px] text-[#0B0F1F] hover-underline"
          >
            subscribe
            <ArrowUpRight size={12} />
          </button>
        </form>
      </div>
    </section>
  );
}
