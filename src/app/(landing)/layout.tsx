import Footer from "@/components/layout/landing/footer-landing";
import Navbar from "@/components/layout/landing/navbar-landing";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
