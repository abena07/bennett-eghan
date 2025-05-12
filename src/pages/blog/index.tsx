import { Link } from "react-router-dom";
import posts from "./_index";

export default function Blog() {
  return (
    <div>
      <p className="text-2xl font-medium">blog 📚</p>

      {posts.length === 0 ? (
        <p className="text-[22px] mt-4 leading-relaxed">wow such empty 💀</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                to={`/blog/${slug}`}
                className="group block border-b border-gray-200 pb-1 transition duration-200 ease-in-out hover:text-black"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[20px] text-[#494949] group-hover:text-black">
                    {meta.title}
                  </span>
                  {meta.date && (
                    <span className="text-[18px] ml-4 whitespace-nowrap">
                      {new Date(meta.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


