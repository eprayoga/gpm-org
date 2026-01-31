import Navbar from "@/components/layout/landing/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
