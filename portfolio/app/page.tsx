import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 flex-grow">
        <Profile />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
