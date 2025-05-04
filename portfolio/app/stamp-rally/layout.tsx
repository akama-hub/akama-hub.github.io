/* app/layout.tsx */
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header></Header>
      {children}
    </main>
  );
}
