(function () {
  const collapseKey = "benchai-sidebar-v1-collapsed";
  const themeKey = "benchai-theme";

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
    const desktopQuery = window.matchMedia("(min-width: 721px)");

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

  function init() {
    initSidebarCollapse();
    initThemeSwitches();
  }

  window.BenchAIShell = {
    init,
    initSidebarCollapse,
    initThemeSwitches,
    applyTheme
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
