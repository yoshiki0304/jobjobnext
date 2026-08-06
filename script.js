(() => {
  const popup = document.getElementById("line-popup");
  const panel = popup?.querySelector(".linePopup");
  const closeButton = popup?.querySelector(".linePopupClose");
  let dismissed = false;

  const closePopup = () => {
    if (!popup) return;
    popup.hidden = true;
    dismissed = true;
  };

  const checkScroll = () => {
    if (!popup || dismissed || !popup.hidden) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable > 0 && window.scrollY / scrollable >= 0.7) popup.hidden = false;
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  closeButton?.addEventListener("click", closePopup);
  popup?.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
  panel?.addEventListener("click", (event) => event.stopPropagation());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup && !popup.hidden) closePopup();
  });
  checkScroll();
})();
