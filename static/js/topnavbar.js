(() => {
  const getFilename = (pathname) => {
    const cleaned = pathname.split("?")[0].split("#")[0];
    const parts = cleaned.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "";
  };

  const setActive = (links, activeLink) => {
    for (const link of links)
      link.classList.toggle("is-active", link === activeLink);
  };

  const init = () => {
    const container = document.querySelector("[data-topnav-links]");
    const toggleButton = document.querySelector("[data-topnav-toggle]");
    const mobileOverlay = document.querySelector("[data-topnav-mobile]");
    const mobileClose = document.querySelector("[data-topnav-close]");

    const setMobileOpen = (open) => {
      if (!toggleButton || !mobileOverlay) return;
      toggleButton.setAttribute("aria-expanded", open ? "true" : "false");
      mobileOverlay.classList.toggle("is-active", open);
    };

    if (toggleButton && mobileOverlay) {
      toggleButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
        setMobileOpen(!isOpen);
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileOverlay.contains(e.target) && !toggleButton.contains(e.target)) {
          setMobileOpen(false);
        }
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMobileOpen(false);
      });
    }

    const current = getFilename(window.location.pathname) || "orus_home.html";

    // Desktop active link (only if desktop links exist)
    if (container) {
      const links = Array.from(
        container.querySelectorAll("[data-topnav-link]"),
      );
      if (links.length === 0) return;

      const activeLink =
        links.find(
          (a) =>
            getFilename(
              new URL(a.getAttribute("href"), window.location.href).pathname,
            ) === current,
        ) ?? links[0];

      setActive(links, activeLink);

      for (const link of links) {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href) return;

          const isModifiedClick =
            e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
          if (isModifiedClick) return;

          const previouslyActive = container.querySelector(
            ".topnav__link.is-active",
          );
          if (previouslyActive === link) return;

          setActive(links, link);

          e.preventDefault();
          window.setTimeout(() => {
            window.location.href = href;
          }, 180);
        });
      }
    }

    // Mobile active highlight
    if (mobileOverlay) {
      const mobileLinks = Array.from(
        mobileOverlay.querySelectorAll("[data-topnav-mobile-link]"),
      );
      for (const link of mobileLinks) {
        const linkFile = getFilename(
          new URL(link.getAttribute("href"), window.location.href).pathname,
        );
        link.classList.toggle("is-active", linkFile === current);
      }
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
