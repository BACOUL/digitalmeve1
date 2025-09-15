(function () {
  try {
    var ls = typeof window !== "undefined" ? window.localStorage : null;
    var pref = ls ? ls.getItem("dm-theme") : null;
    if (pref === "light") {
      document.documentElement.classList.add("theme-light");
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", "#FFFFFF");
    } else {
      document.documentElement.classList.remove("theme-light");
      var meta2 = document.querySelector('meta[name="theme-color"]');
      if (meta2) meta2.setAttribute("content", "#0B1220");
    }
  } catch (e) {}
})();
