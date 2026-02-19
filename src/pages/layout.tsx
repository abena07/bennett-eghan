import { Outlet } from "react-router-dom"; 
import { Navbar } from "@/custom/nav";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 w-full">
      {/* Narrow centered column - content flows top to bottom */}
      <div className="w-full max-w-2xl flex flex-col pt-10 pb-16 min-h-screen">
        <Navbar />
        <main className="w-full mt-2 flex-1">
          <Outlet />
        </main>
        <footer className="mt-auto pt-8 text-left text-sm text-[#0B0F1F]/80">
          © {new Date().getFullYear()} | Phillipa Bennett-Eghan
        </footer>
      </div>
    </div>
  );
}