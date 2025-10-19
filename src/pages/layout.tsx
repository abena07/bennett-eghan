import { Outlet } from "react-router-dom"; 
import { Navbar } from "@/custom/nav";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 w-full">
      {/* Navbar - constrained width */}
      <div className="w-full max-w-3xl">
        <Navbar />
      </div>

      {/* Main content - constrained width */}
      <main className="w-full max-w-3xl">
        <Outlet /> 
      </main>
    </div>
  );
}