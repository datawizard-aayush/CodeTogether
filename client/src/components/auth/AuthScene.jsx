import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuthScene({ mode = 'login', isInputFocused = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(-1.5, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8b7cff, 2.5, 35);
    purpleLight.position.set(-2, 2, 6);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1.8, 35);
    cyanLight.position.set(4, -2, 5);
    scene.add(cyanLight);

    // 3. Central Workspace Node
    const workspaceGroup = new THREE.Group();
    workspaceGroup.position.set(-2, 0, 0);

    const coreGeo = new THREE.OctahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x8b7cff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x4a34c9,
      emissiveIntensity: mode === 'signup' ? 0.8 : 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    workspaceGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x5ea1ff,
      wireframe: true,
      transparent: true,
      opacity: isInputFocused ? 0.45 : 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    workspaceGroup.add(wireMesh);

    scene.add(workspaceGroup);

    // 4. Orbiting Workspace Sub-Nodes
    const nodesConfig = [
      { name: 'PT (Lead)', color: 0x8b7cff, radius: 4.8, angle: 0, speed: mode === 'signup' ? 0.012 : 0.008, size: 0.38 },
      { name: 'RH (Dev)', color: 0x3ddb82, radius: 5.4, angle: (Math.PI * 2) / 5, speed: mode === 'signup' ? 0.011 : 0.007, size: 0.38 },
      { name: 'AM (Dev)', color: 0x5ea1ff, radius: 4.4, angle: (Math.PI * 4) / 5, speed: mode === 'signup' ? 0.013 : 0.009, size: 0.38 },
      { name: 'REPO', color: 0x06b6d4, radius: 5.8, angle: (Math.PI * 6) / 5, speed: mode === 'signup' ? 0.01 : 0.006, size: 0.44 },
      { name: 'TASKS', color: 0xffb800, radius: 4.9, angle: (Math.PI * 8) / 5, speed: mode === 'signup' ? 0.011 : 0.0075, size: 0.42 },
    ];

    const nodeObjects = [];

    nodesConfig.forEach((cfg) => {
      const geo = new THREE.SphereGeometry(cfg.size, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.3,
        metalness: 0.7,
        emissive: cfg.color,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      workspaceGroup.add(mesh);

      // Connection Line to Workspace Core
      const lineMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: isInputFocused ? 0.6 : 0.3,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      workspaceGroup.add(lineMesh);

      nodeObjects.push({ mesh, cfg, lineMesh, lineGeo });
    });

    // 5. Star Particle Constellation
    const particleCount = mode === 'signup' ? 220 : 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 35;
      particlePos[i + 1] = (Math.random() - 0.5) * 35;
      particlePos[i + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8b7cff,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = -1.5;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    mount.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Core rotation
      coreMesh.rotation.y += mode === 'signup' ? 0.009 : 0.005;
      coreMesh.rotation.x += 0.003;
      wireMesh.rotation.y -= 0.004;

      // Pulse effect on input focus
      if (isInputFocused) {
        const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.05;
        coreMesh.scale.set(pulse, pulse, pulse);
      } else {
        coreMesh.scale.set(1, 1, 1);
      }

      // Nodes Orbiting Workspace
      nodeObjects.forEach((item) => {
        item.cfg.angle += item.cfg.speed;
        const x = Math.cos(item.cfg.angle) * item.cfg.radius;
        const y = Math.sin(item.cfg.angle * 1.3) * 1.2;
        const z = Math.sin(item.cfg.angle) * item.cfg.radius;

        item.mesh.position.set(x, y, z);

        const positions = new Float32Array([0, 0, 0, x, y, z]);
        item.lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        item.lineGeo.attributes.position.needsUpdate = true;
      });

      particles.rotation.y += 0.0005;

      // Camera Parallax
      targetX += (mouseX * 1.2 - targetX - 1.5) * 0.04;
      targetY += (-mouseY * 1.2 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(-1.5, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mount) {
        mount.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement) mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode, isInputFocused]);

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />

      {/* Subtle System Status Tag */}
      <div
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          background: 'rgba(11, 13, 16, 0.75)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 10
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: mode === 'signup' ? 'var(--accent-cyan)' : 'var(--success)' }} />
        <span>COLABZ AUTH // {mode === 'signup' ? 'CREATING WORKSPACE' : 'SECURE SESSION READY'}</span>
      </div>
    </div>
  );
}
