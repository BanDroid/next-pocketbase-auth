import { auth } from "@/util/auth";
import Link from "next/link";

export default async function Navbar() {
  const { token } = await auth();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost btn-sm text-xl">
          PocketAuth
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {!token && (
          <>
            <Link href="/signin" className="btn btn-sm btn-primary">
              Sign In
            </Link>
            <Link href="/signup" className="btn btn-sm">
              Sign Up
            </Link>
          </>
        )}
        {token && (
          <a href="/signout" className="btn btn-error">
            Sign Out
          </a>
        )}
      </div>
    </div>
  );
}
