<header
  className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow ${
    scrolled ? "shadow-md" : ""
  }`}
>
  <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-900">
    {/* Logo dégradé */}
    <Link
      href="/"
      className="mr-1 -mx-1 px-1 rounded-lg focus-ring text-lg font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
    >
      DigitalMeve
    </Link>

    {/* Nav desktop */}
    <nav className="ml-2 hidden items-center gap-6 text-sm md:flex">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-1 -mx-1 rounded-lg transition ${
            isActive(item.href)
              ? "text-emerald-600 font-semibold"
              : "text-slate-700 hover:text-emerald-600"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>

    <div className="flex-1" />

    {/* Bouton burger mobile */}
    <button
      onClick={() => setOpen(true)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 focus-ring md:hidden"
    >
      <Menu className="h-5 w-5 text-slate-700" />
    </button>
  </div>
</header>
