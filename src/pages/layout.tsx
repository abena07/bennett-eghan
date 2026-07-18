import { Outlet, useLocation, Link } from "react-router-dom";
import { Undo2 } from "lucide-react";

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const backTo = pathname.startsWith("/blog/") ? "/blog" : "/";

  return (
    <div className="min-h-screen flex flex-col items-center px-6 w-full">
      {/* Fixed top offset — same anchor point on every page, independent of content length */}
      <div className="w-full max-w-2xl flex flex-col pt-40">
        {!isHome && (
          <Link
            to={backTo}
            className="inline-flex w-fit items-center gap-1 text-[13px] text-[#0B0F1F]/70 hover-underline mb-6"
          >
            <Undo2 size={14} />
            Index
          </Link>
        )}
        <main className="w-full mt-0.5 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}