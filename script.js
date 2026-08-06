(() => {
  const bubbleLayer = document.querySelector(".bubbleBackground");
  const popup = document.getElementById("line-popup");
  const panel = popup?.querySelector(".linePopup");
  const closeButton = popup?.querySelector(".linePopupClose");
  let dismissed = false;
  let lastBubbleScrollY = window.scrollY;
  let bubbleScrollShift = 0;
  let bubbleAnimationFrame = 0;

  const animateBubbleScroll = () => {
    bubbleScrollShift *= 0.82;
    bubbleLayer?.style.setProperty("--bubble-scroll-shift", bubbleScrollShift.toFixed(2) + "px");
    if (Math.abs(bubbleScrollShift) > 0.2) {
      bubbleAnimationFrame = window.requestAnimationFrame(animateBubbleScroll);
    } else {
      bubbleScrollShift = 0;
      bubbleLayer?.style.setProperty("--bubble-scroll-shift", "0px");
      bubbleAnimationFrame = 0;
    }
  };

  const syncBubbleScroll = () => {
    const nextScrollY = window.scrollY;
    const scrollDelta = nextScrollY - lastBubbleScrollY;
    lastBubbleScrollY = nextScrollY;
    bubbleScrollShift = Math.max(-80, Math.min(80, bubbleScrollShift - scrollDelta * 0.24));
    if (!bubbleAnimationFrame) bubbleAnimationFrame = window.requestAnimationFrame(animateBubbleScroll);
  };

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
  window.addEventListener("scroll", syncBubbleScroll, { passive: true });
  closeButton?.addEventListener("click", closePopup);
  popup?.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
  panel?.addEventListener("click", (event) => event.stopPropagation());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup && !popup.classList.contains("is-hidden")) closePopup();
  });
})();
