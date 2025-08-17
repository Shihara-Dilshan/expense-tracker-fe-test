import Link from 'next/link';

const NavBar = () => (
  <nav className="bg-blue-600 text-white px-4 py-3 flex gap-4 justify-center">
    <Link
      href="/"
      className="hover:underline focus:text-yellow-200 active:text-yellow-300 text-white"
    >
      Dashboard
    </Link>
    <Link
      href="/expenses"
      className="hover:underline focus:text-yellow-200 active:text-yellow-300 text-white"
    >
      Expenses
    </Link>
    <Link
      href="/settings"
      className="hover:underline focus:text-yellow-200 active:text-yellow-300 text-white"
    >
      Settings
    </Link>
  </nav>
);

export default NavBar;
