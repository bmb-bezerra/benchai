(function () {
  const collapseKey = "benchai-sidebar-v1-collapsed";
  const navLiquidOriginKey = "benchai-nav-liquid-origin";
  const themeKey = "benchai-theme";
  let navIndicatorFrame = 0;
  let navResizeReady = false;
  let navLiquidTimers = [];

  const readStored = key => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const writeStored = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage failures; controls still work for the current page.
    }
  };

  const readSession = key => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const writeSession = (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Ignore storage failures; the animation simply starts at the current item.
    }
  };

  const takeSession = key => {
    const value = readSession(key);
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Ignore storage failures; the value is non-critical visual state.
    }
    return value;
  };

  function applyTheme(theme, persist = false) {
    document.body.dataset.theme = theme;

    document.querySelectorAll("[data-theme-switch]").forEach(button => {
      button.setAttribute("aria-checked", String(theme === "dark"));
      button.setAttribute("aria-label", theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
      button.title = theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro";
    });

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#111113" : "#f5f5f7");
    if (persist) writeStored(themeKey, theme);
  }

  function createSwitchButton() {
    const button = document.createElement("button");
    button.className = "theme-switch";
    button.type = "button";
    button.setAttribute("role", "switch");
    button.setAttribute("data-theme-switch", "");
    button.innerHTML = `
      <span class="theme-switch-track" aria-hidden="true">
        <span class="theme-switch-thumb"></span>
      </span>
    `;
    return button;
  }

  function prepareSwitchButton(button) {
    if (button.dataset.themeReady === "true") return;
    button.dataset.themeReady = "true";
    button.className = "theme-switch";
    button.type = "button";
    button.setAttribute("role", "switch");
    button.setAttribute("data-theme-switch", "");

    if (!button.querySelector(".theme-switch-track")) {
      button.innerHTML = `
        <span class="theme-switch-track" aria-hidden="true">
          <span class="theme-switch-thumb"></span>
        </span>
      `;
    }

    button.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  function initThemeSwitches() {
    document.querySelectorAll("[data-theme-switch-host]").forEach(host => {
      if (!host.querySelector("[data-theme-switch]")) host.appendChild(createSwitchButton());
    });

    document.querySelectorAll("[data-theme-switch]").forEach(prepareSwitchButton);

    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = readStored(themeKey);
    const initialTheme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : (document.body.dataset.theme || (systemDark ? "dark" : "light"));
    applyTheme(initialTheme);
  }

  function initSidebarCollapse() {
    const collapseButton = document.getElementById("sidebarCollapse");
    const revealButton = document.getElementById("sidebarReveal");
    const sidebar = document.getElementById("sidebar");
    if (!collapseButton || !revealButton || !sidebar || collapseButton.dataset.sidebarReady === "true") return;

    collapseButton.dataset.sidebarReady = "true";
    revealButton.dataset.sidebarReady = "true";
    const desktopQuery = window.matchMedia("(min-width: 1121px)");

    const render = () => {
      const collapsed = desktopQuery.matches && readStored(collapseKey) === "true";
      document.body.classList.toggle("sidebar-collapsed", collapsed);
      sidebar.setAttribute("aria-hidden", String(collapsed));
      if ("inert" in sidebar) sidebar.inert = collapsed;

      collapseButton.setAttribute("aria-expanded", String(!collapsed));
      collapseButton.setAttribute("aria-hidden", String(collapsed));
      collapseButton.tabIndex = collapsed ? -1 : 0;
      collapseButton.title = collapsed ? "Mostrar sidebar" : "Ocultar sidebar";
      collapseButton.setAttribute("aria-label", collapsed ? "Mostrar sidebar" : "Ocultar sidebar");

      revealButton.setAttribute("aria-expanded", String(!collapsed));
      revealButton.setAttribute("aria-hidden", String(!collapsed));
      revealButton.tabIndex = collapsed ? 0 : -1;
      revealButton.title = collapsed ? "Mostrar sidebar" : "Ocultar sidebar";
      revealButton.setAttribute("aria-label", collapsed ? "Mostrar sidebar" : "Ocultar sidebar");
    };

    collapseButton.addEventListener("click", () => {
      writeStored(collapseKey, "true");
      render();
    });

    revealButton.addEventListener("click", () => {
      writeStored(collapseKey, "false");
      render();
    });

    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", render);
    else desktopQuery.addListener(render);

    render();
  }

  function navLinks(nav) {
    return Array.from(nav.querySelectorAll("a[data-nav-id]"));
  }

  function navLinkById(nav, navId) {
    return navLinks(nav).find(link => link.dataset.navId === navId) || null;
  }

  function navRoutePath(nav, originLink, activeLink) {
    const links = navLinks(nav);
    const originIndex = links.indexOf(originLink);
    const activeIndex = links.indexOf(activeLink);
    if (originIndex < 0 || activeIndex < 0 || originIndex === activeIndex) return [activeLink];

    const step = activeIndex > originIndex ? 1 : -1;
    const path = [];
    for (let index = originIndex; index !== activeIndex; index += step) {
      path.push(links[index]);
    }
    path.push(links[activeIndex]);
    return path;
  }

  function activeNavLink(nav) {
    return nav.querySelector('a[data-nav-id][aria-current="page"]') || navLinks(nav)[0] || null;
  }

  function ensureNavIndicator(nav) {
    let indicator = nav.querySelector(".nav-indicator");
    if (!indicator) {
      indicator = document.createElement("span");
      indicator.className = "nav-indicator";
      indicator.setAttribute("aria-hidden", "true");
      nav.prepend(indicator);
    }
    return indicator;
  }

  function setNavIndicatorMetrics(nav, metrics) {
    nav.style.setProperty("--nav-liquid-x", `${metrics.left}px`);
    nav.style.setProperty("--nav-liquid-y", `${metrics.top}px`);
    nav.style.setProperty("--nav-liquid-width", `${metrics.width}px`);
    nav.style.setProperty("--nav-liquid-height", `${metrics.height}px`);
  }

  function navLinkMetrics(link) {
    return {
      left: link.offsetLeft,
      top: link.offsetTop,
      width: link.offsetWidth,
      height: link.offsetHeight
    };
  }

  function setNavIndicatorPosition(nav, link) {
    setNavIndicatorMetrics(nav, navLinkMetrics(link));
  }

  function dropStartMetrics(link) {
    const metrics = navLinkMetrics(link);
    return {
      left: metrics.left + Math.round(metrics.width * 0.32),
      top: Math.max(0, metrics.top - metrics.height - 10),
      width: Math.round(metrics.width * 0.42),
      height: Math.round(metrics.height * 0.74)
    };
  }

  function clearNavLiquidTimers() {
    navLiquidTimers.forEach(timer => window.clearTimeout(timer));
    navLiquidTimers = [];
  }

  function stopNavLiquidMotion(nav) {
    clearNavLiquidTimers();
    delete nav.dataset.navLiquidMoving;
    delete nav.dataset.navLiquidDirection;
    delete nav.dataset.navLiquidStep;
    delete nav.dataset.navLiquidPhase;
    delete nav.dataset.navLiquidMode;
  }

  function remembersNavOrigin() {
    if (document.documentElement.dataset.navLiquidMemoryReady === "true") return;
    document.documentElement.dataset.navLiquidMemoryReady = "true";

    document.addEventListener("click", event => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = target?.closest("[data-nav-id]");
      if (!link) return;

      const nav = document.getElementById("siteNav");
      const active = nav ? activeNavLink(nav) : null;
      const activeId = active?.dataset.navId;
      const nextId = link.dataset.navId;
      if (activeId && nextId && activeId !== nextId) writeSession(navLiquidOriginKey, activeId);
    });
  }

  function updateNavIndicator(previousId = "") {
    const nav = document.getElementById("siteNav");
    if (!nav) return;

    const active = activeNavLink(nav);
    if (!active) return;

    const indicator = ensureNavIndicator(nav);
    const activeId = active.dataset.navId || "";
    const storedOriginId = takeSession(navLiquidOriginKey);
    const originId = previousId && previousId !== activeId ? previousId : storedOriginId;
    const originLink = originId && originId !== activeId ? navLinkById(nav, originId) : null;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const routePath = originLink && !reduceMotion ? navRoutePath(nav, originLink, active) : [active];

    nav.dataset.navLiquidReady = "false";
    stopNavLiquidMotion(nav);

    if (routePath.length > 1) {
      const orderedLinks = navLinks(nav);
      const targetIsBelow = orderedLinks.indexOf(active) > orderedLinks.indexOf(originLink);
      const path = targetIsBelow ? routePath : [active];

      if (targetIsBelow) {
        setNavIndicatorPosition(nav, path[0]);
      } else {
        setNavIndicatorMetrics(nav, dropStartMetrics(active));
      }

      indicator.getBoundingClientRect();
      nav.dataset.navLiquidReady = "true";
      nav.dataset.navLiquidMoving = "true";
      nav.dataset.navLiquidDirection = "down";
      nav.dataset.navLiquidMode = targetIsBelow ? "path" : "drop";
      nav.dataset.navLiquidPhase = "a";

      requestAnimationFrame(() => {
        path.slice(targetIsBelow ? 1 : 0).forEach((link, index) => {
          const delay = index * 135;
          const timer = window.setTimeout(() => {
            nav.dataset.navLiquidStep = String(index + 1);
            nav.dataset.navLiquidPhase = index % 2 === 0 ? "b" : "a";
            setNavIndicatorPosition(nav, link);
          }, delay);
          navLiquidTimers.push(timer);
        });

        const doneTimer = window.setTimeout(() => {
          stopNavLiquidMotion(nav);
        }, path.length * 135 + 260);
        navLiquidTimers.push(doneTimer);
      });
    } else {
      setNavIndicatorPosition(nav, active);
      indicator.getBoundingClientRect();
      nav.dataset.navLiquidReady = "true";
    }

    nav.dataset.activeNavId = activeId;
  }

  function scheduleNavIndicatorUpdate(previousId = "") {
    if (navIndicatorFrame) cancelAnimationFrame(navIndicatorFrame);
    navIndicatorFrame = requestAnimationFrame(() => {
      navIndicatorFrame = 0;
      updateNavIndicator(previousId);
    });
  }

  function initNavIndicator() {
    remembersNavOrigin();

    const nav = document.getElementById("siteNav");
    if (nav && nav.dataset.navLiquidReady !== "true") scheduleNavIndicatorUpdate();

    if (navResizeReady) return;
    navResizeReady = true;
    window.addEventListener("resize", () => scheduleNavIndicatorUpdate(), { passive: true });
  }

  function init() {
    initSidebarCollapse();
    initThemeSwitches();
    initNavIndicator();
  }

  window.BenchAIShell = {
    init,
    initSidebarCollapse,
    initThemeSwitches,
    initNavIndicator,
    scheduleNavIndicatorUpdate,
    updateNavIndicator,
    applyTheme
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
