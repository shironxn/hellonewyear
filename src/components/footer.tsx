"use client";

export function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 md:text-lg p-4 text-center">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          shironxn, built with ❤️
        </p>
      </aside>
    </footer>
  );
}
