import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import {Layout} from "@/pages/layout";
import Home from "@/pages/home";
import Blog from "@/pages/blog/index";
import BlogPost from "@/pages/blog/[slug]";
import Projects from "@/pages/projects";

// import Hello from '@/pages/blog/hello.mdx';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="blog/:slug" element={<BlogPost />} /> {/* 👈 ADD THIS */}

          {/* <Route path="/hello" element={<Hello />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
