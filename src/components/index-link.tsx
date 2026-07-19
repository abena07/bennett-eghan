import Link from "next/link";
import { Undo2 } from "lucide-react";

export function IndexLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1 text-[13px] text-[#0B0F1F]/70 hover-underline mb-6"
    >
      <Undo2 size={14} />
      Index
    </Link>
  );
}
