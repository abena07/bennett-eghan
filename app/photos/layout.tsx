import { IndexLink } from "@/components/index-link";

export default function PhotosLayout({
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
