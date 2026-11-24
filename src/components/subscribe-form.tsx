const BUTTONDOWN_USER = "bennett-eghan";

export function SubscribeForm({ className = "" }: { className?: string }) {
  return (
    <section className={`not-prose ${className}`}>
      <p className="text-[12px] font-medium text-[#0B0F1F] [font-variant:small-caps] tracking-wide">
        newsletter
      </p>
      <p className="mt-1 text-[12px] text-[#888888]">
        subscribe if you want to keep tabs on me :)
      </p>
      <form
        action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`}
        method="post"
        target="_blank"
        className="mt-3 flex items-end gap-4"
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
          className="min-w-0 flex-1 border-b border-[#0B0F1F]/20 bg-transparent py-1.5 text-[12px] text-[#0B0F1F] placeholder:text-[#888888]/70 focus:border-[#0B0F1F] focus:outline-none"
        />
        <input type="hidden" name="embed" value="1" />
        <button
          type="submit"
          className="shrink-0 py-1.5 text-[12px] text-[#0B0F1F] hover-underline"
        >
          subscribe →
        </button>
      </form>
    </section>
  );
}
