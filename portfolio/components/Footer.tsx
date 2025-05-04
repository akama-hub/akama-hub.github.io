export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Akama System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
