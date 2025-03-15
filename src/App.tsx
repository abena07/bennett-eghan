import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Layout} from "@/pages/layout";
import Home from "@/pages/home";
import Blog from "@/pages/blog";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
}
