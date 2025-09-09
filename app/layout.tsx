<body className="min-h-screen bg-white text-slate-900 antialiased">
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
    <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <a href="/" className="text-xl font-semibold">
        Digital<span className="text-teal-600">Meve</span>
      </a>

      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="/generate" className="hover:text-teal-700">Generate</a>
        <a href="/verify" className="hover:text-teal-700">Verify</a>
        <a href="/docs" className="hover:text-teal-700">Docs</a>
        <a href="/pricing" className="hover:text-teal-700">Pricing</a>
        <a href="/contact" className="hover:text-teal-700">Contact</a>
        <a href="/generate" className="ml-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
          Get Started
        </a>
      </div>

      {/* Menu mobile très simple (on fera mieux plus tard) */}
      <div className="md:hidden">
        <a href="/generate" className="rounded-lg bg-teal-600 px-3 py-2 text-white">Start</a>
      </div>
    </nav>
  </header>

  <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
</body>
