import { motion } from "framer-motion";

function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <p className="text-xl font-medium">projects 🖥️</p>

      <p className="text-[18px] mt-4 leading-relaxed text-[#494949]">
        wow such empty 💀
      </p>
    </motion.div>
  );
}

export default Projects;
