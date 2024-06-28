"use client"
import { Nav, NavLink } from "@/components/Nav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
    <html lang="en">
    <body className={inter.className}>
      <div>
      <Nav>
      <NavLink  href="/admin">Dashboad</NavLink>
      <NavLink href="/admin/products">Product</NavLink>
      <NavLink href="/admin/sellers">Sellers</NavLink>
      <NavLink href="/admin/users">Users</NavLink>
    </Nav>
      </div>
    {children}
    </body>
  </html>
    </>

  );
}
