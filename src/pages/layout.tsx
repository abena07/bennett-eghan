import { Outlet } from "react-router-dom"; 
import { Navbar } from "@/custom/nav";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 w-full">
      {/* Narrow centered column - content flows top to bottom */}
      <div className="w-full max-w-2xl flex flex-col pt-8 pb-16 min-h-screen">
        <Navbar />
        <main className="w-full mt-0.5 flex-1">
          <Outlet />
        </main>
        <footer className="mt-auto pt-7 text-left text-[12px] text-[#0B0F1F]/80 space-y-1.5">
          <p className="font-medium text-[#0B0F1F]/90 leading-snug">
            breaking building & engineering things
          </p>
          <p>
            © {new Date().getFullYear()} | Phillipa Bennett-Eghan
          </p>
        </footer>
      </div>
    </div>
  );
}