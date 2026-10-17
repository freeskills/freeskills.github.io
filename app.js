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

  function t(key) {
    return window.FreeSkillsI18n ? window.FreeSkillsI18n.t(key) : key;
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        button.textContent = t("copied");
        button.classList.add("is-copied");
        setTimeout(() => {
          button.textContent = t("copy");
          button.classList.remove("is-copied");
        }, 1200);
      }
      showToast(t("copiedToast"));
    } catch {
      showToast(t("copyFail"));
    }
  }

  document.querySelectorAll(".copy-block").forEach((block) => {
    const button = block.querySelector(".copy-btn");
    const text = block.getAttribute("data-copy") || block.querySelector("code")?.textContent || "";
    button?.addEventListener("click", () => copyText(text.trim(), button));
  });

  const donateButton = document.createElement("button");
  donateButton.className = "donate-float";
  donateButton.type = "button";
  donateButton.disabled = true;
  donateButton.setAttribute("aria-busy", "true");
  donateButton.innerHTML =
    '<span data-lang="en-US">Donate</span><span data-lang="pt-BR">Apoiar</span><span class="donate-sdk-target" id="donate-sdk-target" aria-hidden="true"></span>';

  document.body.append(donateButton);

  let donateSdkPromise;
  let donateRenderPromise;
  let donateRendered = false;

  function loadDonateSdk() {
    if (window.PayPal?.Donation?.Button) return Promise.resolve();
    if (donateSdkPromise) return donateSdkPromise;

    donateSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
      script.charset = "UTF-8";
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        donateSdkPromise = null;
        reject(new Error("PayPal SDK failed to load"));
      };
      document.head.appendChild(script);
    });

    return donateSdkPromise;
  }

  const donateOptions = {
    env: "production",
    hosted_button_id: "XTCCX24GB2ULJ",
    image: {
      src: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif",
      alt: "Donate with PayPal button",
      title: "PayPal - The safer, easier way to pay online!",
    },
  };

  function renderDonation() {
    if (donateRendered) return Promise.resolve();
    if (donateRenderPromise) return donateRenderPromise;

    donateRenderPromise = loadDonateSdk()
      .then(() => {
        window.PayPal.Donation.Button(donateOptions).render("#donate-sdk-target");
        donateRendered = true;
        donateButton.disabled = false;
        donateButton.setAttribute("aria-busy", "false");
      })
      .catch(() => {
        donateSdkPromise = null;
        donateRenderPromise = null;
        donateButton.disabled = false;
        donateButton.setAttribute("aria-busy", "false");
      });

    return donateRenderPromise;
  }

  function openPayPalDonation() {
    window.open(
      "https://www.paypal.com/donate/?hosted_button_id=XTCCX24GB2ULJ",
      "_blank",
      "noopener",
    );
  }

  donateButton.addEventListener("click", (event) => {
    if (!event.target.closest("#donate-button")) openPayPalDonation();
  });
  donateButton.addEventListener("pointerenter", renderDonation, { once: true });
  donateButton.addEventListener("focus", renderDonation, { once: true });
  renderDonation();

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

  const osOptions = Array.from(document.querySelectorAll(".os-switch__option"));
  const osPanels = Array.from(document.querySelectorAll(".os-panel"));

  function activateOs(os) {
    osOptions.forEach((option) => {
      const active = option.dataset.os === os;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-pressed", active ? "true" : "false");
    });
    osPanels.forEach((panel) => {
      panel.hidden = panel.dataset.osPanel !== os;
    });
  }

  function detectOs() {
    const platform = [
      navigator.userAgentData?.platform,
      navigator.platform,
      navigator.userAgent,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (/windows|win32|win64/.test(platform)) return "windows";
    if (/macintosh|macintel|macos|darwin/.test(platform)) return "macos";
    return "linux";
  }

  osOptions.forEach((option) => {
    option.addEventListener("click", () => activateOs(option.dataset.os));
  });
  if (osOptions.length) activateOs(detectOs());

  const menuToggle = document.querySelector(".menu-toggle");
  const topnav = document.querySelector(".topnav");
  const navGroups = Array.from(document.querySelectorAll(".navgroup"));

  function closeNavGroups(except) {
    navGroups.forEach((group) => {
      if (group === except) return;
      group.classList.remove("is-open");
      group.querySelector(".navgroup__caret")?.setAttribute("aria-expanded", "false");
    });
  }

  function closeMenu() {
    if (!menuToggle || !topnav) return;
    topnav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    closeNavGroups(null);
  }

  menuToggle?.addEventListener("click", () => {
    const open = topnav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) closeNavGroups(null);
  });

  navGroups.forEach((group) => {
    const caret = group.querySelector(".navgroup__caret");
    caret?.addEventListener("click", (event) => {
      event.preventDefault();
      const open = !group.classList.contains("is-open");
      closeNavGroups(group);
      group.classList.toggle("is-open", open);
      caret.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (topnav && !topnav.contains(event.target) && event.target !== menuToggle && !menuToggle?.contains(event.target)) {
      closeMenu();
    } else if (!event.target.closest(".navgroup")) {
      closeNavGroups(null);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
})();
