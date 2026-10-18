"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { KERALA_DISTRICTS, DistrictData } from "./keralaData";

interface Kerala3DCanvasProps {
  selectedDistrictId: string | null;
  hoveredDistrictId: string | null;
  activeZoneFilter: string | null;
  onHoverDistrict: (id: string | null) => void;
  onSelectDistrict: (id: string) => void;
  zoomAction: number;
  zoomOutAction: number;
  resetAction: number;
}

interface TooltipState {
  x: number;
  y: number;
  name: string;
  zoneName: string;
}

export default function Kerala3DCanvas({
  selectedDistrictId,
  hoveredDistrictId,
  activeZoneFilter,
  onHoverDistrict,
  onSelectDistrict,
  zoomAction,
  zoomOutAction,
  resetAction,
}: Kerala3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mapGroupRef = useRef<THREE.Group | null>(null);

  // District mesh dictionary
  const districtMeshesRef = useRef<
    Map<
      string,
      {
        mesh: THREE.Mesh;
        defaultY: number;
        targetY: number;
        defaultColor: number;
      }
    >
  >(new Map());

  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const hoveredMeshIdRef = useRef<string | null>(null);

  // Camera & view targets
  const baseCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 22, 16));
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 22, 16));
  const cameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Drag-to-rotate state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef<boolean>(false);
  const rotationYTarget = useRef<number>(0);
  const rotationXTarget = useRef<number>(0);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const isDesktop = width >= 768;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Subtle dark atmospheric fog
    scene.fog = new THREE.FogExp2(0x050b08, 0.016);

    // 2. Camera positioning (adaptive for desktop with right dossier panel vs mobile)
    const fov = isDesktop ? 39 : 42;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

    if (isDesktop) {
      baseCameraPos.current.set(0, 21.0, 15.5);
      targetCameraPos.current.set(0, 21.0, 15.5);
      cameraLookAt.current.set(0, 0, 0);
    } else {
      baseCameraPos.current.set(0, 26, 18);
      targetCameraPos.current.set(0, 26, 18);
      cameraLookAt.current.set(0, 0, -0.8);
    }

    camera.position.copy(baseCameraPos.current);
    camera.lookAt(cameraLookAt.current);
    cameraRef.current = camera;

    // 3. Renderer with high performance & shadows
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting setup
    // Soft balanced ambient & hemisphere light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfffaea, 0x18241e, 0.5);
    scene.add(hemiLight);

    // Warm golden sun from top-left, casting soft realistic shadows
    const sunLight = new THREE.DirectionalLight(0xffe6a3, 2.1);
    sunLight.position.set(16, 28, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -16;
    sunLight.shadow.camera.right = 16;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Coastal Arabian Sea cool teal fill light from west
    const fillLight = new THREE.DirectionalLight(0x406d75, 1.0);
    fillLight.position.set(-18, 12, -8);
    scene.add(fillLight);

    // Subtle golden point accent near central Kerala backwaters
    const accentPoint = new THREE.PointLight(0xc59b27, 2.0, 35);
    accentPoint.position.set(-2, 7, 3);
    scene.add(accentPoint);

    // 5. Kerala Map Group
    const mapGroup = new THREE.Group();
    mapGroup.name = "keralaMapGroup";
    // On desktop, shift group to the left to center in the space left of the dossier card
    mapGroup.position.x = isDesktop ? -2.6 : 0;
    mapGroup.position.z = isDesktop ? 0 : -0.8;
    scene.add(mapGroup);
    mapGroupRef.current = mapGroup;

    // Soft ground shadow plane under Kerala
    const shadowGeo = new THREE.PlaneGeometry(45, 55);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.38 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.05;
    shadowPlane.receiveShadow = true;
    mapGroup.add(shadowPlane);

    // 6. Build Extruded 3D Geometries using Genuine GeoJSON Boundaries
    Object.values(KERALA_DISTRICTS).forEach((dist) => {
      const shapes: THREE.Shape[] = [];

      dist.polygons.forEach((poly) => {
        const outer = poly.outer;
        if (!outer || outer.length === 0) return;

        const shape = new THREE.Shape();
        shape.moveTo(outer[0][0], outer[0][1]);
        for (let i = 1; i < outer.length; i++) {
          shape.lineTo(outer[i][0], outer[i][1]);
        }
        shape.closePath();

        // Process holes if any (e.g. Mahe enclave in Kannur)
        if (poly.holes && poly.holes.length > 0) {
          poly.holes.forEach((holePts) => {
            if (!holePts || holePts.length === 0) return;
            const holePath = new THREE.Path();
            holePath.moveTo(holePts[0][0], holePts[0][1]);
            for (let j = 1; j < holePts.length; j++) {
              holePath.lineTo(holePts[j][0], holePts[j][1]);
            }
            holePath.closePath();
            shape.holes.push(holePath);
          });
        }

        shapes.push(shape);
      });

      // Extrude settings: restrained depth and subtle bevel
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        steps: 1,
        depth: dist.height,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 2,
      };

      // Create ExtrudeGeometry on shared coordinate origin (DO NOT CALL geometry.center())
      const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);

      // Materials: Top face receives regional color, side/bevels receive sleek dark edge
      const topMaterial = new THREE.MeshStandardMaterial({
        color: dist.color,
        roughness: 0.45,
        metalness: 0.18,
        emissive: 0x000000,
      });

      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0x141a1f,
        roughness: 0.65,
        metalness: 0.25,
      });

      const mesh = new THREE.Mesh(geometry, [topMaterial, sideMaterial]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Lay flat on ground plane: rotate XY to XZ plane
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, 0, 0);

      // Tag mesh with district id & metadata for raycasting
      mesh.userData = { districtId: dist.id, districtData: dist };

      mapGroup.add(mesh);

      districtMeshesRef.current.set(dist.id, {
        mesh,
        defaultY: 0,
        targetY: 0,
        defaultColor: dist.color,
      });
    });

    // 7. Floating Ambient Golden Dust Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = Math.random() * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      particleSpeeds[i] = 0.01 + Math.random() * 0.02;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Create soft radial bokeh texture
    const bokehCanvas = document.createElement("canvas");
    bokehCanvas.width = 32;
    bokehCanvas.height = 32;
    const bCtx = bokehCanvas.getContext("2d");
    if (bCtx) {
      const grad = bCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 235, 170, 1)");
      grad.addColorStop(0.3, "rgba(235, 195, 100, 0.6)");
      grad.addColorStop(1, "rgba(200, 160, 60, 0)");
      bCtx.fillStyle = grad;
      bCtx.fillRect(0, 0, 32, 32);
    }
    const bokehTex = new THREE.CanvasTexture(bokehCanvas);

    const particleMat = new THREE.PointsMaterial({
      color: 0xffe28a,
      size: 0.28,
      map: bokehTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Render Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Animate floating dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= particleSpeeds[i];
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 22;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth camera and lookAt interpolation for cinematic panning
      camera.position.lerp(targetCameraPos.current, 0.055);
      currentLookAt.current.lerp(cameraLookAt.current, 0.055);
      camera.lookAt(currentLookAt.current);

      // Smooth elevation lerp for all districts
      districtMeshesRef.current.forEach((item) => {
        item.mesh.position.y += (item.targetY - item.mesh.position.y) * 0.14;
      });

      // Smooth mapGroup rotation interpolation (user drag + subtle breathing sway)
      const breathingSway = Math.sin(elapsedTime * 0.35) * 0.012;
      mapGroup.rotation.y += (rotationYTarget.current + breathingSway - mapGroup.rotation.y) * 0.08;
      mapGroup.rotation.x += (rotationXTarget.current - mapGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const desktop = newWidth >= 768;

      camera.aspect = newWidth / newHeight;
      camera.fov = desktop ? 39 : 42;

      if (desktop) {
        baseCameraPos.current.set(0, 21.0, 15.5);
        cameraLookAt.current.set(0, 0, 0);
        if (mapGroupRef.current) {
          mapGroupRef.current.position.x = -2.6;
          mapGroupRef.current.position.z = 0;
        }
      } else {
        baseCameraPos.current.set(0, 26, 18);
        cameraLookAt.current.set(0, 0, -0.8);
        if (mapGroupRef.current) {
          mapGroupRef.current.position.x = 0;
          mapGroupRef.current.position.z = -0.8;
        }
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
      districtMeshesRef.current.clear();
    };
  }, []);

  // Update District Elevations & Colors when hovered / selected / zone filtered
  useEffect(() => {
    districtMeshesRef.current.forEach((item, id) => {
      const isSelected = id === selectedDistrictId;
      const isHovered = id === hoveredDistrictId;
      const distData = KERALA_DISTRICTS[id];
      const matchesZone = activeZoneFilter ? distData.zone === activeZoneFilter : false;

      // 3D Elevation targets
      if (isSelected) {
        item.targetY = 1.1;
      } else if (isHovered) {
        item.targetY = 0.65;
      } else if (matchesZone) {
        item.targetY = 0.35;
      } else {
        item.targetY = 0;
      }

      // Material color & emissive glow
      const materials = item.mesh.material as THREE.MeshStandardMaterial[];
      const topMat = materials[0];

      if (isSelected) {
        topMat.color.setHex(0xf5c759); // Bright gold
        topMat.emissive.setHex(0x42320b);
      } else if (isHovered) {
        topMat.color.setHex(0xe5b94c); // Radiant gold hover
        topMat.emissive.setHex(0x2d2208);
      } else if (matchesZone) {
        topMat.color.setHex(distData.color);
        topMat.emissive.setHex(0x181404);
      } else if (activeZoneFilter) {
        // Dim non-matching zones slightly
        topMat.color.setHex(distData.color);
        topMat.emissive.setHex(0x000000);
      } else {
        topMat.color.setHex(distData.color);
        topMat.emissive.setHex(0x000000);
      }
    });
  }, [selectedDistrictId, hoveredDistrictId, activeZoneFilter]);

  // Smooth camera zoom towards selected district centroid (or zoom out when deselected)
  useEffect(() => {
    if (!containerRef.current) return;
    const isDesktop = containerRef.current.clientWidth >= 768;

    if (selectedDistrictId && KERALA_DISTRICTS[selectedDistrictId]) {
      const dist = KERALA_DISTRICTS[selectedDistrictId];
      const [cx, cy] = dist.centroid;

      const groupX = mapGroupRef.current ? mapGroupRef.current.position.x : (isDesktop ? -2.6 : 0);
      const groupZ = mapGroupRef.current ? mapGroupRef.current.position.z : (isDesktop ? 0 : -0.8);

      const worldX = groupX + cx;
      const worldZ = groupZ - cy;

      // Softly zero out user drag angles so the district is viewed directly
      rotationXTarget.current = 0;
      rotationYTarget.current = 0;

      // Set target camera position and target lookAt centered on this district
      cameraLookAt.current.set(worldX, 0.5, worldZ);
      targetCameraPos.current.set(worldX, 10.2, worldZ + 7.8);
    } else {
      // Zoom back out to full Kerala overview
      if (isDesktop) {
        cameraLookAt.current.set(0, 0, 0);
        targetCameraPos.current.copy(baseCameraPos.current);
      } else {
        cameraLookAt.current.set(0, 0, -0.8);
        targetCameraPos.current.copy(baseCameraPos.current);
      }
    }
  }, [selectedDistrictId]);

  // Raycasting helper to detect district mesh under pointer
  const getIntersectedDistrict = useCallback(
    (clientX: number, clientY: number): string | null => {
      if (!canvasRef.current || !cameraRef.current) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const meshes = Array.from(districtMeshesRef.current.values()).map((v) => v.mesh);
      const intersects = raycasterRef.current.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        return hitMesh.userData.districtId || null;
      }
      return null;
    },
    []
  );

  // Pointer Down (for drag or click)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
  };

  // Pointer Move (handles raycasting & smooth drag rotation)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.hypot(dx, dy) > 4) {
        hasDraggedRef.current = true;
      }
      rotationYTarget.current += dx * 0.005;
      rotationXTarget.current = Math.max(-0.35, Math.min(0.35, rotationXTarget.current + dy * 0.005));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Raycast on hover
    const distId = getIntersectedDistrict(e.clientX, e.clientY);

    if (distId) {
      if (distId !== hoveredMeshIdRef.current) {
        hoveredMeshIdRef.current = distId;
        onHoverDistrict(distId);
        if (canvasRef.current) canvasRef.current.style.cursor = "pointer";
      }
      const data = KERALA_DISTRICTS[distId];
      if (data) {
        setTooltip({
          x: localX,
          y: localY,
          name: data.name,
          zoneName: data.zoneName,
        });
      }
    } else {
      if (hoveredMeshIdRef.current !== null) {
        hoveredMeshIdRef.current = null;
        onHoverDistrict(null);
        if (canvasRef.current) canvasRef.current.style.cursor = "default";
      }
      setTooltip(null);
    }
  };

  // Pointer Up / Click
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;

    // Only treat as click if user didn't drag
    if (!hasDraggedRef.current) {
      const distId = getIntersectedDistrict(e.clientX, e.clientY);
      if (distId) {
        onSelectDistrict(distId);
      }
    }
    hasDraggedRef.current = false;
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    if (hoveredMeshIdRef.current !== null) {
      hoveredMeshIdRef.current = null;
      onHoverDistrict(null);
    }
    setTooltip(null);
    if (canvasRef.current) canvasRef.current.style.cursor = "default";
  };

  // Zoom In
  useEffect(() => {
    if (zoomAction > 0 && cameraRef.current) {
      targetCameraPos.current.multiplyScalar(0.86);
    }
  }, [zoomAction]);

  // Zoom Out
  useEffect(() => {
    if (zoomOutAction > 0 && cameraRef.current) {
      targetCameraPos.current.multiplyScalar(1.14);
    }
  }, [zoomOutAction]);

  // Reset Camera & Rotation
  useEffect(() => {
    if (resetAction > 0) {
      rotationYTarget.current = 0;
      rotationXTarget.current = 0;
      targetCameraPos.current.copy(baseCameraPos.current);
    }
  }, [resetAction]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[580px] sm:h-[650px] lg:h-[720px] select-none touch-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Sleek Floating Cursor Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-full pb-3"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <div className="bg-[#0b1013]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#c59b27]/40 shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#c59b27] shadow-[0_0_8px_#c59b27]" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white tracking-wide font-sans">
                {tooltip.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#c59b27]/90 font-medium">
                {tooltip.zoneName}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
