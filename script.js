(() => {
  const popup = document.getElementById("line-popup");
  const panel = popup?.querySelector(".linePopup");
  const closeButton = popup?.querySelector(".linePopupClose");
  let dismissed = false;

  const closePopup = () => {
    if (!popup) return;
    popup.classList.add("is-hidden");
    popup.setAttribute("aria-hidden", "true");
    popup.hidden = true;
    dismissed = true;
  };

  const openPopup = () => {
    if (!popup || dismissed) return;
    popup.hidden = false;
    popup.classList.remove("is-hidden");
    popup.setAttribute("aria-hidden", "false");
  };

  const checkScroll = () => {
    if (!popup || dismissed || !popup.classList.contains("is-hidden")) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable > 0 && window.scrollY / scrollable >= 0.6) openPopup();
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  closeButton?.addEventListener("click", closePopup);
  popup?.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
  panel?.addEventListener("click", (event) => event.stopPropagation());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup && !popup.classList.contains("is-hidden")) closePopup();
  });
})();
