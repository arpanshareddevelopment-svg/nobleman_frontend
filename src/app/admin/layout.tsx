import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nobleman Learning — Super Admin",
  description: "Super Admin Portal for Nobleman Learning",
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
