import { NavLink } from "react-router-dom";

const navItems = {
  "/": { name: "home" },
  "/projects": { name: "projects" },
  "/blog": { name: "blog" },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-12 mt-10">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-row items-center gap-1 px-0" id="nav">
          {Object.entries(navItems).map(([path, { name }]) => (
            <NavLink
              key={path}
              to={path}
              end // important for exact match on "/"
              className={({ isActive }) =>
                `relative px-2 py-1 text-[12px] font-medium transition-all duration-200
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