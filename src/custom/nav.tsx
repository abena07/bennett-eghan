import { Link } from "react-router-dom";

const navItems = {
  "/": { name: "home" },
  "/blog": { name: "blog" },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-12 mt-10">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
              key={path}
              to={path}
              className="!text-[#494949] dark:text-white transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 text-[22px]"
            >
              {name}
            </Link>
            
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
