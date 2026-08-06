import * as THREE from "./three.module.min.js";

const host = document.querySelector(".bubbleBackground");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (host && !reducedMotion) {
  const probe = document.createElement("canvas");
  const hasWebGL = Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));

  if (!hasWebGL) {
    host.classList.add("isFallback");
  } else {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      host.classList.add("isFallback");
    }

    if (!renderer) {
      host.classList.add("isFallback");
    } else {
    host.classList.remove("isFallback");
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 12;
    const sphereGeometry = new THREE.SphereGeometry(1, 22, 16);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(5, 5);
    const bubbles = [];
    const bursts = [];
    const compact = window.matchMedia("(max-width: 700px)").matches;
    const bubbleCount = compact ? 8 : 15;
    const particleCount = compact ? 24 : 42;
    const fps = compact ? 30 : 45;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let lastPointerCheck = 0;
    let lastScrollY = window.scrollY;
    let scrollImpulse = 0;

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uHue;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      vec3 rainbow(float t) { return 0.55 + 0.45 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t)); }
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - abs(dot(normal, viewDirection)), 2.15);
        vec3 spectrum = rainbow(uHue + vWorldPosition.y * 0.055 + uTime * 0.028 + fresnel * 0.52);
        float highlight = pow(max(dot(normal, normalize(vec3(-0.35, 0.7, 1.0))), 0.0), 24.0);
        vec3 color = mix(vec3(0.78, 0.93, 1.0), spectrum, 0.74) + highlight * vec3(1.0);
        gl_FragColor = vec4(color, (0.025 + fresnel * 0.42 + highlight * 0.34) * uOpacity);
      }
    `;

    const getBounds = () => {
      const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      return { height, width: height * camera.aspect };
    };

    const resetBubble = (bubble, initial = false) => {
      const area = getBounds();
      const scale = THREE.MathUtils.randFloat(compact ? 0.32 : 0.4, compact ? 0.78 : 1.08);
      const centerHalfWidth = Math.min((260 / window.innerWidth) * area.width, area.width * 0.38);
      const side = Math.random() < 0.5 ? -1 : 1;
      const sidePosition = THREE.MathUtils.randFloat(
        centerHalfWidth + scale * 0.75,
        Math.max(centerHalfWidth + scale, area.width * 0.54),
      );
      bubble.scale.setScalar(scale);
      bubble.position.set(
        side * sidePosition,
        initial ? THREE.MathUtils.randFloat(-area.height * 0.56, area.height * 0.56) : -area.height * 0.6 - scale,
        THREE.MathUtils.randFloat(-1.7, 1.1),
      );
      bubble.userData.velocity.set(THREE.MathUtils.randFloat(-0.002, 0.002), THREE.MathUtils.randFloat(0.006, 0.014), 0);
      bubble.userData.phase = Math.random() * Math.PI * 2;
      bubble.userData.wobble = THREE.MathUtils.randFloat(0.001, 0.004);
      bubble.visible = true;
    };

    for (let index = 0; index < bubbleCount; index += 1) {
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 }, uHue: { value: index / bubbleCount + Math.random() * 0.2 }, uOpacity: { value: compact ? 0.66 : 0.76 } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const bubble = new THREE.Mesh(sphereGeometry, material);
      bubble.userData = { velocity: new THREE.Vector3(), phase: 0, wobble: 0.002 };
      resetBubble(bubble, true);
      bubbles.push(bubble);
      scene.add(bubble);
    }

    const resize = () => {
      camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    const burstBubble = (bubble) => {
      if (!bubble.visible) return;
      bubble.visible = false;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const color = new THREE.Color();
      for (let index = 0; index < particleCount; index += 1) {
        const direction = new THREE.Vector3().randomDirection();
        const offset = direction.clone().multiplyScalar(bubble.scale.x * THREE.MathUtils.randFloat(0.5, 1));
        positions.set([offset.x, offset.y, offset.z], index * 3);
        const speed = THREE.MathUtils.randFloat(0.018, 0.055);
        velocities.set([direction.x * speed, direction.y * speed + 0.006, direction.z * speed], index * 3);
        color.setHSL((index / particleCount + time * 0.04) % 1, 0.82, 0.65);
        colors.set([color.r, color.g, color.b], index * 3);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({ size: compact ? 0.075 : 0.09, transparent: true, opacity: 0.92, depthWrite: false, vertexColors: true, blending: THREE.AdditiveBlending });
      const particles = new THREE.Points(geometry, material);
      particles.position.copy(bubble.position);
      particles.userData = { velocities, life: 1, decay: THREE.MathUtils.randFloat(0.018, 0.026) };
      bursts.push(particles);
      scene.add(particles);
      window.setTimeout(() => resetBubble(bubble), THREE.MathUtils.randInt(900, 1900));
    };

    const checkPointer = (event) => {
      pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
      if (performance.now() - lastPointerCheck < 45) return;
      lastPointerCheck = performance.now();
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(bubbles.filter((bubble) => bubble.visible), false)[0];
      if (hit) burstBubble(hit.object);
    };

    const updateScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      scrollImpulse = THREE.MathUtils.clamp(scrollImpulse + scrollDelta * 0.0045, -0.82, 0.82);
    };

    const animate = (now) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden || now - previous < 1000 / fps) return;
      const delta = Math.min((now - previous) / 16.667, 2.2);
      previous = now;
      time += 0.016667 * delta;
      const area = getBounds();
      const scrollShift = scrollImpulse * delta;
      scrollImpulse *= Math.pow(0.8, delta);
      bubbles.forEach((bubble) => {
        if (!bubble.visible) return;
        bubble.position.addScaledVector(bubble.userData.velocity, delta);
        bubble.position.y += scrollShift;
        bubble.position.x += Math.sin(time * 0.65 + bubble.userData.phase) * bubble.userData.wobble * delta;
        bubble.rotation.y += 0.0018 * delta;
        bubble.material.uniforms.uTime.value = time;
        if (bubble.position.y > area.height * 0.62 + bubble.scale.y) resetBubble(bubble);
        if (bubble.position.y < -area.height * 0.68 - bubble.scale.y) {
          bubble.position.y = area.height * 0.62 + bubble.scale.y;
        }
        if (bubble.position.x > area.width * 0.62) bubble.position.x = -area.width * 0.62;
        if (bubble.position.x < -area.width * 0.62) bubble.position.x = area.width * 0.62;
      });
      for (let burstIndex = bursts.length - 1; burstIndex >= 0; burstIndex -= 1) {
        const burst = bursts[burstIndex];
        burst.position.y += scrollShift;
        const attribute = burst.geometry.getAttribute("position");
        const values = attribute.array;
        for (let index = 0; index < particleCount; index += 1) {
          values[index * 3] += burst.userData.velocities[index * 3] * delta;
          values[index * 3 + 1] += burst.userData.velocities[index * 3 + 1] * delta;
          values[index * 3 + 2] += burst.userData.velocities[index * 3 + 2] * delta;
          burst.userData.velocities[index * 3 + 1] -= 0.00045 * delta;
        }
        attribute.needsUpdate = true;
        burst.userData.life -= burst.userData.decay * delta;
        burst.material.opacity = Math.max(burst.userData.life, 0);
        if (burst.userData.life <= 0) {
          scene.remove(burst);
          burst.geometry.dispose();
          burst.material.dispose();
          bursts.splice(burstIndex, 1);
        }
      }
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", checkPointer, { passive: true });
    window.addEventListener("pointerdown", checkPointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    frame = requestAnimationFrame(animate);
    window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
    }
  }
}
