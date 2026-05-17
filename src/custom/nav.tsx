import { Link, NavLink } from "react-router-dom";

const navItems = {
  "/projects": { name: "projects" },
  "/blog": { name: "blog" },
  "/photos": { name: "keepsakes" },
};

export function Navbar() {
  return (
    <aside className="mb-6 w-full">
      <div className="flex w-full flex-row items-center justify-between gap-4 lg:sticky lg:top-8 lg:z-10">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center py-[6px] pl-0 pr-2 font-extrabold text-[14px] leading-none text-[#0B0F1F]"
          aria-label="home — Phillipa Bennett-Eghan"
        >
          PBE.
        </Link>

        <nav className="flex shrink-0 flex-row items-center gap-1" id="nav">
          {Object.entries(navItems).map(([path, { name }]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `inline-flex items-center justify-center rounded-[2px] px-2 py-[6px] text-[12px] font-medium leading-none transition-all duration-200
                 ${
                   isActive
                     ? "bg-[#E1E4EA] text-[#0B0F1F]"
                     : "text-[#0B0F1F] hover:bg-[#E1E4EA]/60"
                 }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
