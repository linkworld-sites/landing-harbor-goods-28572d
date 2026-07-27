import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-16">
      <Link href="/" className="text-[13px] font-medium uppercase tracking-[0.22em] text-white">
        Harbor Goods
      </Link>
      <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] text-white/80 md:gap-8">
        <Link href="/shop" className="transition-colors hover:text-white">Shop</Link>
        <Link href="/blog" className="transition-colors hover:text-white">Journal</Link>
        <Link href="#story" className="hidden transition-colors hover:text-white sm:inline">Story</Link>
      </nav>
    </header>
  );
}
