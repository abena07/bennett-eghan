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
                `relative px-3 py-1.5 text-[16px] font-medium transition-all duration-200 rounded-md
                 ${
                   isActive
                     ? "bg-gray-500/15 text-gray-600"
                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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