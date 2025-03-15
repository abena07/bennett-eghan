import { Outlet } from "react-router-dom"; 
import { Navbar } from "@/custom/nav";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col px-8 md:px-[400px] w-full">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className=" w-full">
        <Outlet /> 
      </main>

      {/* Footer */}
      {/* <footer className="text-center p-4 text-gray-500">
        © {new Date().getFullYear()} My Website
      </footer> */}
    </div>
  );
}
