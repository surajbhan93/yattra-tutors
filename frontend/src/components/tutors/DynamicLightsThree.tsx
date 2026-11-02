'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DynamicLightsThreeProps {
  className?: string;
}

export const DynamicLightsThree: React.FC<DynamicLightsThreeProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Dimensions
    const getWidth = () => container.clientWidth || window.innerWidth;
    const getHeight = () => container.clientHeight || 750;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x021711, 0.016);

    // 2. Camera: Positioned higher up to capture floating meshes right up to the navbar
    const camera = new THREE.PerspectiveCamera(52, getWidth() / getHeight(), 0.1, 160);
    camera.position.set(0, 19.5, 27);
    camera.lookAt(0, 14, 0);

    // 3. WebGL Renderer with High Precision & PBR support
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(getWidth(), getHeight());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = false; // Keep high FPS on all devices

    container.appendChild(renderer.domElement);

    // Baseline height offset to bring 3D animation right up to navbar level
    // (raised further so the scene sits just below the navbar, not mid-page)
    const ELEVATION_Y = 13;

    // 4. Floor Plane (Mirror-like reflective dark emerald floor)
    const floorGeometry = new THREE.PlaneGeometry(160, 160);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x031811,
      roughness: 0.35,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = ELEVATION_Y - 2.5;
    scene.add(floor);

    // 5. Geometries & Shapes
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const boxGeometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const torusGeometry = new THREE.TorusGeometry(0.55, 0.22, 24, 32);
    const cylinderGeometry = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 24);
    const coneGeometry = new THREE.ConeGeometry(0.55, 1.2, 24);
    const octaGeometry = new THREE.OctahedronGeometry(0.7, 0);
    const icosaGeometry = new THREE.IcosahedronGeometry(0.75, 0);

    const geometries = [
      sphereGeometry,
      boxGeometry,
      torusGeometry,
      cylinderGeometry,
      coneGeometry,
      octaGeometry,
      icosaGeometry,
    ];

    // 6. 50 Unique PBR Materials (Emerald, Mint, Jade, Teal, Seafoam, Lime, Chrome White)
    const uniqueMaterials: THREE.MeshStandardMaterial[] = [];
    const hues = [0.38, 0.42, 0.46, 0.49, 0.52, 0.35, 0.44];

    for (let i = 0; i < 24; i++) {
      const baseHue = hues[i % hues.length] ?? 0.44;
      const hue = baseHue + (Math.random() - 0.5) * 0.05;
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, 0.8, 0.45 + Math.random() * 0.2),
        roughness: 0.2 + Math.random() * 0.45,
        metalness: 0.5 + Math.random() * 0.4,
        transparent: true,
        opacity: 0.8,
      });
      uniqueMaterials.push(mat);
    }

    // 7. Concentric Orbiting Meshes — kept sparse so the scene reads as an accent, not noise
    const meshes: THREE.Mesh[] = [];
    const meshesPerRing = 6;
    const totalMeshes = 24;
    const meshScale = 0.72;

    for (let i = 0; i < totalMeshes; i++) {
      const material = uniqueMaterials[i % uniqueMaterials.length];
      const geometry = geometries[i % geometries.length];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(meshScale);

      const ring = Math.floor(i / meshesPerRing);
      const indexInRing = i % meshesPerRing;
      const baseAngle = (indexInRing / meshesPerRing) * Math.PI * 2 + ring * 0.5;
      // Wider gaps between rings so shapes don't bunch into a dense cluster
      const radius = 7 + ring * 5.2;

      // Gentler vertical spread, kept closer to the centerpiece instead of sprawling
      // across the whole hero (which was overlapping the text column)
      const verticalOffset = -1.5 + (i % 4) * 2.0 + Math.random() * 1.0;

      mesh.position.set(
        Math.cos(baseAngle) * radius,
        ELEVATION_Y + verticalOffset,
        Math.sin(baseAngle) * radius
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      // Store initial motion data
      mesh.userData = {
        baseAngle,
        radius,
        ring,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.025,
        orbitSpeed: (0.05 + (5 - ring) * 0.02) * (ring % 2 === 0 ? 1 : -1),
        bobSpeed: 0.8 + Math.random() * 1.5,
        baseY: mesh.position.y,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // 8. Center Centerpiece Sphere (Mirror Chrome Finish lifted to eye level)
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.96,
    });
    const centerSphere = new THREE.Mesh(new THREE.SphereGeometry(1.8, 48, 48), centerMaterial);
    centerSphere.position.set(0, ELEVATION_Y + 1.8, 0);
    scene.add(centerSphere);

    // Subtle Outer Rings around Center
    const ringGeo = new THREE.TorusGeometry(3.2, 0.05, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald green
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x054d36,
    });
    const gyroRing1 = new THREE.Mesh(ringGeo, ringMat);
    gyroRing1.position.set(0, ELEVATION_Y + 1.8, 0);
    scene.add(gyroRing1);

    const gyroRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.04, 16, 64), ringMat);
    gyroRing2.position.set(0, ELEVATION_Y + 1.8, 0);
    gyroRing2.rotation.x = Math.PI / 3;
    scene.add(gyroRing2);

    // 9. Ambient Light
    const ambientLight = new THREE.AmbientLight(0x082b20, 1.4);
    scene.add(ambientLight);

    // 10. Dynamic Orbiting Point Lights with Glowing Cores
    interface DynamicLightInfo {
      light: THREE.PointLight;
      glow: THREE.Mesh;
      angle: number;
      radius: number;
      speed: number;
      baseY: number;
      orbitTilt: number;
    }

    const lightConfigs = [
      { color: 0x10b981, radius: 8, speed: 0.7, baseY: ELEVATION_Y + 3.5, tilt: 0.3 },   // Emerald
      { color: 0x34d399, radius: 12, speed: -0.55, baseY: ELEVATION_Y + 4.2, tilt: -0.4 }, // Mint
      { color: 0x14b8a6, radius: 15, speed: 0.65, baseY: ELEVATION_Y + 3.0, tilt: 0.5 },  // Teal
      { color: 0xf0fdf4, radius: 18, speed: -0.4, baseY: ELEVATION_Y + 4.8, tilt: -0.2 },  // Pure White / Mint Glow
      { color: 0x059669, radius: 10, speed: 0.85, baseY: ELEVATION_Y + 2.8, tilt: 0.6 },  // Jade Green
    ];

    const dynamicLights: DynamicLightInfo[] = [];

    lightConfigs.forEach((cfg) => {
      const pLight = new THREE.PointLight(cfg.color, 450, 45, 1.5);
      pLight.position.set(cfg.radius, cfg.baseY, 0);

      // Glowing core sphere for the light
      const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshBasicMaterial({ color: cfg.color })
      );
      pLight.add(glowSphere);

      scene.add(pLight);

      dynamicLights.push({
        light: pLight,
        glow: glowSphere,
        angle: Math.random() * Math.PI * 2,
        radius: cfg.radius,
        speed: cfg.speed,
        baseY: cfg.baseY,
        orbitTilt: cfg.tilt,
      });
    });

    // 11. Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 10;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 12. Resize handler
    const onResize = () => {
      if (!container || isDisposed) return;
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 13. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Parallax around elevated focal point
      targetCameraX = mouseX * 4.5;
      targetCameraY = ELEVATION_Y + 6.5 + mouseY * 2.5;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, ELEVATION_Y + 3.5, 0);

      // Animate Center Chrome Sphere & Gyro Rings
      centerSphere.rotation.y = elapsedTime * 0.15;
      gyroRing1.rotation.x = elapsedTime * 0.4;
      gyroRing1.rotation.y = elapsedTime * 0.25;
      gyroRing2.rotation.y = -elapsedTime * 0.35;
      gyroRing2.rotation.z = elapsedTime * 0.2;

      // Animate Dynamic Orbiting Point Lights
      dynamicLights.forEach((item) => {
        const t = elapsedTime * item.speed + item.angle;
        item.light.position.x = Math.cos(t) * item.radius;
        item.light.position.z = Math.sin(t) * item.radius;
        item.light.position.y =
          item.baseY + Math.sin(t * 2) * 1.5 + Math.cos(t * item.orbitTilt) * 0.8;
      });

      // Animate Concentric Meshes (Self-rotation & Gentle Orbit)
      meshes.forEach((m, idx) => {
        const d = m.userData;
        if (!d) return;

        // Rotation
        m.rotation.x += d.rotSpeedX;
        m.rotation.y += d.rotSpeedY;

        // Subtle Orbit
        const currentAngle = d.baseAngle + elapsedTime * d.orbitSpeed * 0.4;
        m.position.x = Math.cos(currentAngle) * d.radius;
        m.position.z = Math.sin(currentAngle) * d.radius;
        m.position.y = d.baseY + Math.sin(elapsedTime * d.bobSpeed + idx) * 0.25;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries & Materials
      floorGeometry.dispose();
      floorMaterial.dispose();
      sphereGeometry.dispose();
      boxGeometry.dispose();
      torusGeometry.dispose();
      cylinderGeometry.dispose();
      coneGeometry.dispose();
      octaGeometry.dispose();
      icosaGeometry.dispose();
      centerMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      uniqueMaterials.forEach((m) => m.dispose());
      dynamicLights.forEach((l) => {
        l.light.dispose();
        (l.glow.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // Anchored to the top fold only (not the full, much taller hero section),
      // so the 3D scene frames the heading/CTA area instead of drifting down
      // past the content below.
      className={`absolute inset-x-0 top-0 h-[820px] max-h-full pointer-events-none overflow-hidden ${className || ''}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default DynamicLightsThree;
