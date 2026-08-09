(() => {
  const toast = document.getElementById("toast");
  const topbar = document.querySelector(".topbar");
  let toastTimer;

  function syncTopbar() {
    if (!topbar) return;
    const solid = window.scrollY > 12 || !document.body.classList.contains("page-home");
    topbar.classList.toggle("is-solid", solid);
  }

  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-on");
    }, 1400);
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const prev = button.textContent;
        button.textContent = "Copied";
        button.classList.add("is-copied");
        setTimeout(() => {
          button.textContent = prev;
          button.classList.remove("is-copied");
        }, 1200);
      }
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed — select the command manually");
    }
  }

  document.querySelectorAll(".copy-block").forEach((block) => {
    const button = block.querySelector(".copy-btn");
    const text = block.getAttribute("data-copy") || block.querySelector("code")?.textContent || "";
    button?.addEventListener("click", () => copyText(text.trim(), button));
  });

  const tabs = Array.from(document.querySelectorAll(".tool-switch__btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  function activateTool(tool) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tool === tool;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      const active = panel.dataset.panel === tool;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTool(tab.dataset.tool));
  });
})();
