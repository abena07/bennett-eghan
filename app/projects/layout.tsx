import { IndexLink } from "@/components/index-link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IndexLink href="/" />
      {children}
    </>
  );
}
