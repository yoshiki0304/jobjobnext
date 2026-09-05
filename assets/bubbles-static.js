(() => {
  if (window.matchMedia("(max-width: 980px)").matches) return;
  const host = document.querySelector(".bubbleBackground");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!host || reducedMotion) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });

  if (!context) return;

  host.classList.remove("isFallback");
  host.appendChild(canvas);

  const bubbles = [];
  const particles = [];
  const respawnTimers = new Set();
  const pointer = { x: -1000, y: -1000, active: false };
  const bubbleCount = 18;
  const centerWidth = 520;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let previousFrame = performance.now();
  let animationTime = 0;
  let animationFrame = 0;
  let lastScrollY = window.scrollY;
  let scrollImpulse = 0;
  let paused = document.hidden;

  const random = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);

  const gutterWidth = () => Math.max((width - centerWidth) / 2, 0);

  const randomSideX = (radius) => {
    const gutter = gutterWidth();
    const safeMinimum = Math.min(Math.max(radius + 8, 18), Math.max(gutter - 8, 18));
    const safeMaximum = Math.max(safeMinimum, gutter - radius - 8);
    const position = random(safeMinimum, safeMaximum);
    return Math.random() < 0.5 ? position : width - position;
  };

  const resetBubble = (bubble, initial = false) => {
    bubble.radius = random(34, 92);
    bubble.x = randomSideX(bubble.radius);
    bubble.y = initial ? random(-bubble.radius, height + bubble.radius) : height + bubble.radius + random(10, height * 0.2);
    bubble.speed = random(0.22, 0.54);
    bubble.drift = random(0.14, 0.42);
    bubble.phase = random(0, Math.PI * 2);
    bubble.hue = random(178, 330);
    bubble.opacity = random(0.62, 0.86);
    bubble.active = true;
  };

  const buildBubbles = () => {
    bubbles.length = 0;
    for (let index = 0; index < bubbleCount; index += 1) {
      const bubble = {};
      resetBubble(bubble, true);
      bubbles.push(bubble);
    }
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    if (!bubbles.length) {
      buildBubbles();
      return;
    }

    bubbles.forEach((bubble) => {
      bubble.x = randomSideX(bubble.radius);
      bubble.y = Math.min(Math.max(bubble.y, -bubble.radius), height + bubble.radius);
    });
  };

  const drawBubble = (bubble) => {
    const { x, y, radius, opacity, hue } = bubble;
    context.save();
    context.globalCompositeOperation = "screen";

    const innerGlow = context.createRadialGradient(
      x - radius * 0.34,
      y - radius * 0.38,
      radius * 0.03,
      x,
      y,
      radius,
    );
    innerGlow.addColorStop(0, `rgba(255,255,255,${0.68 * opacity})`);
    innerGlow.addColorStop(0.08, `rgba(255,255,255,${0.13 * opacity})`);
    innerGlow.addColorStop(0.64, "rgba(255,255,255,0)");
    innerGlow.addColorStop(0.82, `hsla(${hue},92%,78%,${0.1 * opacity})`);
    innerGlow.addColorStop(0.96, `hsla(${(hue + 70) % 360},95%,76%,${0.25 * opacity})`);
    innerGlow.addColorStop(1, `rgba(120,220,255,${0.4 * opacity})`);

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = innerGlow;
    context.fill();

    const rim = context.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    rim.addColorStop(0, `rgba(255,255,255,${0.76 * opacity})`);
    rim.addColorStop(0.24, `hsla(${hue},96%,82%,${0.7 * opacity})`);
    rim.addColorStop(0.5, `rgba(112,226,255,${0.42 * opacity})`);
    rim.addColorStop(0.74, `hsla(${(hue + 115) % 360},98%,80%,${0.68 * opacity})`);
    rim.addColorStop(1, `rgba(255,255,255,${0.8 * opacity})`);

    context.beginPath();
    context.arc(x, y, radius - 1, 0, Math.PI * 2);
    context.lineWidth = Math.max(1.4, radius * 0.026);
    context.strokeStyle = rim;
    context.stroke();

    context.beginPath();
    context.arc(x - radius * 0.24, y - radius * 0.26, radius * 0.18, Math.PI * 1.02, Math.PI * 1.62);
    context.lineWidth = Math.max(2.2, radius * 0.052);
    context.lineCap = "round";
    context.strokeStyle = `rgba(255,255,255,${0.72 * opacity})`;
    context.stroke();

    context.beginPath();
    context.arc(x - radius * 0.34, y - radius * 0.37, Math.max(2.4, radius * 0.065), 0, Math.PI * 2);
    context.fillStyle = `rgba(255,255,255,${0.86 * opacity})`;
    context.fill();
    context.restore();
  };

  const burstBubble = (bubble) => {
    if (!bubble.active) return;
    bubble.active = false;

    const fragmentCount = 30;
    for (let index = 0; index < fragmentCount; index += 1) {
      const angle = random(0, Math.PI * 2);
      const speed = random(1.1, 3.8);
      particles.push({
        x: bubble.x + Math.cos(angle) * bubble.radius * random(0.56, 0.96),
        y: bubble.y + Math.sin(angle) * bubble.radius * random(0.56, 0.96),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.35,
        size: random(1.8, 4.8),
        life: 1,
        hue: (bubble.hue + index * 9) % 360,
      });
    }

    const timer = window.setTimeout(() => {
      respawnTimers.delete(timer);
      resetBubble(bubble, false);
    }, random(650, 1250));
    respawnTimers.add(timer);
  };

  const reactToPointer = (bubble, forceBurst = false) => {
    if (!bubble.active || !pointer.active) return;
    const dx = bubble.x - pointer.x;
    const dy = bubble.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    const reactionRadius = bubble.radius * 1.55;

    if (distance < reactionRadius && distance > 0.1) {
      const strength = (reactionRadius - distance) / reactionRadius;
      bubble.x += (dx / distance) * strength * 6.5;
      bubble.y += (dy / distance) * strength * 4.5;
    }

    if (distance < bubble.radius * (forceBurst ? 1.25 : 0.9)) burstBubble(bubble);
  };

  const drawParticles = (delta) => {
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.vy += 0.045 * delta;
      particle.vx *= Math.pow(0.985, delta);
      particle.life -= 0.025 * delta;

      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }

      context.save();
      context.globalCompositeOperation = "screen";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = `hsla(${particle.hue},95%,72%,${particle.life * 0.88})`;
      context.fill();
      context.restore();
    }
  };

  const animate = (now) => {
    animationFrame = window.requestAnimationFrame(animate);
    if (paused) return;

    const delta = Math.min((now - previousFrame) / 16.667, 2.4);
    previousFrame = now;
    animationTime += 0.016667 * delta;
    context.clearRect(0, 0, width, height);

    const scrollShift = scrollImpulse * delta;
    scrollImpulse *= Math.pow(0.78, delta);

    bubbles.forEach((bubble) => {
      if (!bubble.active) return;
      bubble.y -= bubble.speed * delta + scrollShift;
      bubble.x += Math.sin(animationTime * 1.1 + bubble.phase) * bubble.drift * delta;
      reactToPointer(bubble);

      if (bubble.y + bubble.radius < -8) resetBubble(bubble, false);
      if (bubble.y - bubble.radius > height + 28) {
        bubble.y = -bubble.radius - random(8, 80);
        bubble.x = randomSideX(bubble.radius);
      }

      drawBubble(bubble);
    });

    drawParticles(delta);
  };

  const updatePointer = (event, forceBurst = false) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    bubbles.forEach((bubble) => reactToPointer(bubble, forceBurst));
  };

  const updateScroll = () => {
    const nextScrollY = window.scrollY;
    const scrollDelta = nextScrollY - lastScrollY;
    lastScrollY = nextScrollY;
    scrollImpulse = Math.max(-7.5, Math.min(7.5, scrollImpulse + scrollDelta * 0.08));
  };

  const updateVisibility = () => {
    paused = document.hidden;
    if (!paused) previousFrame = performance.now();
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", (event) => updatePointer(event), { passive: true });
  window.addEventListener("pointerdown", (event) => updatePointer(event, true), { passive: true });
  window.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) pointer.active = false;
  });
  window.addEventListener("scroll", updateScroll, { passive: true });
  document.addEventListener("visibilitychange", updateVisibility);
  animationFrame = window.requestAnimationFrame(animate);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(animationFrame);
      respawnTimers.forEach((timer) => window.clearTimeout(timer));
      respawnTimers.clear();
    },
    { once: true },
  );
})();
