"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as THREE from "three";
import { MapPin, ArrowRight } from "lucide-react";
import { KERALA_DISTRICTS, DISTRICT_DOSSIERS, DistrictData } from "./keralaData";

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
  const pinContainerRef = useRef<HTMLDivElement>(null);

  // Showcase selected district if active, otherwise hovered district, or default to "ernakulam"
  const activeShowcaseId = selectedDistrictId || hoveredDistrictId || "ernakulam";
  const activeShowcaseDistrict: DistrictData | null = KERALA_DISTRICTS[activeShowcaseId] || null;
  const activeShowcaseIdRef = useRef<string>(activeShowcaseId);
  const selectedDistrictIdRef = useRef<string | null>(selectedDistrictId);

  useEffect(() => {
    activeShowcaseIdRef.current = activeShowcaseId;
  }, [activeShowcaseId]);

  useEffect(() => {
    selectedDistrictIdRef.current = selectedDistrictId;
  }, [selectedDistrictId]);

  // Track if mouse is currently hovering directly over the 3D Kerala map
  const isHoveringKeralaMeshRef = useRef<boolean>(false);

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
        borderLines: THREE.LineLoop[];
        defaultY: number;
        targetY: number;
        defaultColor: number;
      }
    >
  >(new Map());

  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const hoveredMeshIdRef = useRef<string | null>("ernakulam");

  // Camera & view targets: Purely controlled by mouse
  const baseCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 22.0, 16.0));
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 22.0, 16.0));
  const cameraLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Mouse Drag navigation state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef<boolean>(false);
  const rotationYTarget = useRef<number>(0);
  const rotationXTarget = useRef<number>(0);

  // Natural satellite terrain relief greens for base state (Matches Reference Satellite Palette)
  const getZoneTerrainColor = (zone: string): number => {
    switch (zone) {
      case "highlands":
        return 0x2b5e2f; // Dense Western Ghats rainforest canopy
      case "backwaters":
        return 0x23543d; // Lush wetlands emerald green
      case "coastal":
        return 0x306536; // Palm groves coastal relief
      case "sacred":
        return 0x34602f; // Verdant southern hills
      default:
        return 0x2d5d32;
    }
  };

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

    // 2. Camera positioning
    const fov = isDesktop ? 36 : 42;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

    if (isDesktop) {
      baseCameraPos.current.set(0, 22.0, 16.0);
      targetCameraPos.current.set(0, 22.0, 16.0);
      cameraLookAt.current.set(0, 0, 0);
    } else {
      baseCameraPos.current.set(0, 26, 18);
      targetCameraPos.current.set(0, 26, 18);
      cameraLookAt.current.set(0, 0, -0.6);
    }

    camera.position.copy(baseCameraPos.current);
    camera.lookAt(cameraLookAt.current);
    cameraRef.current = camera;

    // 3. Renderer with transparent background (revealing the realistic surrounding landscape image behind)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting setup (Matches Reference Mockup's warm sunlit relief)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfffae8, 0x0a1410, 0.75);
    scene.add(hemiLight);

    // Warm golden sunlight from top-right, casting realistic relief shadows across ridges
    const sunLight = new THREE.DirectionalLight(0xffe6a8, 2.7);
    sunLight.position.set(18, 30, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 75;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 22;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Coastal Arabian Sea cool fill light from west
    const fillLight = new THREE.DirectionalLight(0x356872, 1.25);
    fillLight.position.set(-20, 14, -8);
    scene.add(fillLight);

    // Subtle golden point light
    const accentPoint = new THREE.PointLight(0xdcb037, 2.2, 40);
    accentPoint.position.set(-1, 8, 2);
    scene.add(accentPoint);

    // 5. Kerala Map Group (ONLY 3D Kerala districts and subtle shadow plane)
    const mapGroup = new THREE.Group();
    mapGroup.name = "keralaMapGroup";
    mapGroup.position.x = isDesktop ? -0.6 : 0;
    mapGroup.position.z = isDesktop ? 0 : -0.6;
    scene.add(mapGroup);
    mapGroupRef.current = mapGroup;

    // Soft ground shadow plane under Kerala
    const shadowGeo = new THREE.PlaneGeometry(60, 70);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.42 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.05;
    shadowPlane.receiveShadow = true;
    mapGroup.add(shadowPlane);

    // Procedural Satellite Terrain & Mountain Ridge Bump Map
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext("2d");
    if (bCtx) {
      const imgData = bCtx.createImageData(512, 512);
      const data = imgData.data;
      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const idx = (y * 512 + x) * 4;
          // Multi-frequency Western Ghats mountain ridges along northwest-southeast diagonal
          const ridgeVal = Math.floor(
            (Math.sin(x * 0.07 + y * 0.04) * 0.5 + 0.5) * 160 +
            (Math.cos(x * 0.035 - y * 0.08) * 0.5 + 0.5) * 80 +
            Math.random() * 25
          );
          data[idx] = ridgeVal;
          data[idx + 1] = ridgeVal;
          data[idx + 2] = ridgeVal;
          data[idx + 3] = 255;
        }
      }
      bCtx.putImageData(imgData, 0, 0);
    }
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.wrapS = THREE.RepeatWrapping;
    bumpTex.wrapT = THREE.RepeatWrapping;
    bumpTex.repeat.set(5, 5);

    // 6. Build Extruded 3D Geometries with Golden Edge Boundaries (ONLY Kerala Districts)
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

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        steps: 1,
        depth: dist.height,
        bevelEnabled: true,
        bevelThickness: 0.045,
        bevelSize: 0.035,
        bevelOffset: 0,
        bevelSegments: 2,
      };

      const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
      const terrainColor = getZoneTerrainColor(dist.zone);

      // Top face: Satellite terrain with mountain bump mapping and DoubleSide for guaranteed raycasting
      const topMaterial = new THREE.MeshStandardMaterial({
        color: terrainColor,
        bumpMap: bumpTex,
        bumpScale: 0.075,
        roughness: 0.52,
        metalness: 0.12,
        emissive: 0x000000,
        side: THREE.DoubleSide,
      });

      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0x11161a,
        roughness: 0.72,
        metalness: 0.22,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, [topMaterial, sideMaterial]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, 0, 0);

      mesh.userData = { districtId: dist.id, districtData: dist };

      // Add crisp golden boundary line loops on top face
      const borderLines: THREE.LineLoop[] = [];
      shapes.forEach((shape) => {
        const points = shape.getPoints();
        const borderPoints: THREE.Vector3[] = [];
        points.forEach((pt) => {
          borderPoints.push(new THREE.Vector3(pt.x, pt.y, dist.height + 0.015));
        });
        const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPoints);
        const borderMat = new THREE.LineBasicMaterial({
          color: 0xdcb037,
          transparent: true,
          opacity: 0.75,
        });
        const borderLine = new THREE.LineLoop(borderGeo, borderMat);
        borderLine.userData = { districtId: dist.id };
        mesh.add(borderLine);
        borderLines.push(borderLine);
      });

      mapGroup.add(mesh);

      districtMeshesRef.current.set(dist.id, {
        mesh,
        borderLines,
        defaultY: 0,
        targetY: 0,
        defaultColor: terrainColor,
      });
    });

    // 7. Ambient Dust Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 1] = Math.random() * 24;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45;
      particleSpeeds[i] = 0.01 + Math.random() * 0.02;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const bokehCanvas = document.createElement("canvas");
    bokehCanvas.width = 32;
    bokehCanvas.height = 32;
    const bCtx2 = bokehCanvas.getContext("2d");
    if (bCtx2) {
      const grad = bCtx2.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 235, 170, 1)");
      grad.addColorStop(0.3, "rgba(235, 195, 100, 0.6)");
      grad.addColorStop(1, "rgba(200, 160, 60, 0)");
      bCtx2.fillStyle = grad;
      bCtx2.fillRect(0, 0, 32, 32);
    }
    const bokehTex = new THREE.CanvasTexture(bokehCanvas);

    const particleMat = new THREE.PointsMaterial({
      color: 0xffe28a,
      size: 0.28,
      map: bokehTex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Native Mouse Wheel Zoom: ONLY zooms when hovering over 3D Kerala Map!
    const handleNativeWheel = (e: WheelEvent) => {
      // If the user's cursor is NOT directly over the 3D Kerala map, allow natural webpage scrolling!
      if (!isHoveringKeralaMeshRef.current) {
        return; // Do NOT preventDefault! Allow normal page scroll!
      }

      // Cursor IS over the 3D Kerala map: Zoom map smoothly with distance clamping
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.07 : 0.93;
      const currentDist = targetCameraPos.current.length();
      const newDist = currentDist * zoomFactor;
      if (newDist >= 11 && newDist <= 48) {
        targetCameraPos.current.multiplyScalar(zoomFactor);
      }
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    // 9. Render Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Animate dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= particleSpeeds[i];
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 24;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos.current, 0.08);
      currentLookAt.current.lerp(cameraLookAt.current, 0.08);
      camera.lookAt(currentLookAt.current);

      // Smooth elevation lerp for all districts
      districtMeshesRef.current.forEach((item) => {
        item.mesh.position.y += (item.targetY - item.mesh.position.y) * 0.16;
      });

      // Smooth orbit rotation strictly from mouse drag
      mapGroup.rotation.y += (rotationYTarget.current - mapGroup.rotation.y) * 0.1;
      mapGroup.rotation.x += (rotationXTarget.current - mapGroup.rotation.x) * 0.1;

      // Update 3D projected screen position for the showcased district via GPU-accelerated CSS transform (0 React re-renders)
      if (pinContainerRef.current && mapGroupRef.current && cameraRef.current && containerRef.current) {
        const curDistId = activeShowcaseIdRef.current;
        const curDistData = KERALA_DISTRICTS[curDistId];
        if (curDistData) {
          const [cx, cy] = curDistData.centroid;
          const v = new THREE.Vector3(cx, curDistData.height + 0.45, -cy);
          v.applyMatrix4(mapGroupRef.current.matrixWorld);
          v.project(cameraRef.current);

          const curWidth = containerRef.current.clientWidth;
          const curHeight = containerRef.current.clientHeight;
          const sx = (v.x * 0.5 + 0.5) * curWidth;
          const sy = (-(v.y * 0.5) + 0.5) * curHeight;
          const isVisible = v.z < 1.0 && sx > 15 && sx < curWidth - 15 && sy > 15 && sy < curHeight - 15;

          pinContainerRef.current.style.transform = `translate3d(${sx}px, ${sy}px, 0) translateY(-50%)`;
          const shouldShow = isVisible && !selectedDistrictIdRef.current;
          pinContainerRef.current.style.opacity = shouldShow ? "1" : "0";
          pinContainerRef.current.style.pointerEvents = shouldShow ? "auto" : "none";
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const desktop = newWidth >= 768;

      camera.aspect = newWidth / newHeight;
      camera.fov = desktop ? 36 : 42;

      if (desktop) {
        baseCameraPos.current.set(0, 22.0, 16.0);
        cameraLookAt.current.set(0, 0, 0);
        if (mapGroupRef.current) {
          mapGroupRef.current.position.x = -0.6;
          mapGroupRef.current.position.z = 0;
        }
      } else {
        baseCameraPos.current.set(0, 26, 18);
        cameraLookAt.current.set(0, 0, -0.6);
        if (mapGroupRef.current) {
          mapGroupRef.current.position.x = 0;
          mapGroupRef.current.position.z = -0.6;
        }
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("wheel", handleNativeWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
      districtMeshesRef.current.clear();
    };
  }, []);

  // Update District Colors and Elevations: SHOWCASE ONLY THE ACTIVE DISTRICT (Warm Gold Wash + Elevation)
  useEffect(() => {
    districtMeshesRef.current.forEach((item, id) => {
      const isShowcased = id === activeShowcaseId;
      const matchesZone = activeZoneFilter ? KERALA_DISTRICTS[id].zone === activeZoneFilter : false;

      // Elevation: Only showcased district elevates prominently (like Ernakulam in the reference mockup)
      if (isShowcased) {
        item.targetY = 0.65;
      } else if (matchesZone) {
        item.targetY = 0.25;
      } else {
        item.targetY = 0;
      }

      const materials = item.mesh.material as THREE.MeshStandardMaterial[];
      const topMat = materials[0];

      // Material color: Showcased district gets warm golden/tan highlighted overlay (like Ernakulam in reference image)
      if (isShowcased) {
        topMat.color.setHex(0xcda250); // Warm golden highlight overlay
        topMat.emissive.setHex(0x281e05);
        item.borderLines.forEach((line) => {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.color.setHex(0xffffff);
          mat.opacity = 1.0;
        });
      } else if (matchesZone) {
        topMat.color.setHex(item.defaultColor);
        topMat.emissive.setHex(0x181404);
        item.borderLines.forEach((line) => {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.color.setHex(0xdcb037);
          mat.opacity = 0.9;
        });
      } else if (activeZoneFilter) {
        topMat.color.setHex(item.defaultColor);
        topMat.emissive.setHex(0x000000);
        item.borderLines.forEach((line) => {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.color.setHex(0xdcb037);
          mat.opacity = 0.35;
        });
      } else {
        // Natural lush satellite green relief
        topMat.color.setHex(item.defaultColor);
        topMat.emissive.setHex(0x000000);
        item.borderLines.forEach((line) => {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.color.setHex(0xdcb037);
          mat.opacity = 0.75;
        });
      }
    });
  }, [activeShowcaseId, activeZoneFilter]);

  // Camera smooth zoom flight towards selected district, or back to original overview zoom when closed
  useEffect(() => {
    const isDesktop = containerRef.current ? containerRef.current.clientWidth >= 768 : true;

    if (selectedDistrictId && KERALA_DISTRICTS[selectedDistrictId]) {
      const dist = KERALA_DISTRICTS[selectedDistrictId];
      const [cx, cy] = dist.centroid;
      const distWorldPos = new THREE.Vector3(cx, dist.height + 0.45, -cy);

      if (mapGroupRef.current) {
        mapGroupRef.current.updateMatrixWorld(true);
        distWorldPos.applyMatrix4(mapGroupRef.current.matrixWorld);
      }

      // Smoothly target the selected district centroid
      cameraLookAt.current.set(distWorldPos.x, distWorldPos.y, distWorldPos.z);

      // Preserve natural 3D viewing perspective angle while zooming close into the district
      const zoomOffset = isDesktop
        ? new THREE.Vector3(0, 9.2, 6.8)
        : new THREE.Vector3(0, 11.5, 8.5);

      targetCameraPos.current.copy(distWorldPos).add(zoomOffset);
      rotationYTarget.current = 0;
      rotationXTarget.current = 0;
    } else {
      // Zoom back out to original base overview position
      if (isDesktop) {
        cameraLookAt.current.set(0, 0, 0);
        targetCameraPos.current.copy(baseCameraPos.current);
      } else {
        cameraLookAt.current.set(0, 0, -0.6);
        targetCameraPos.current.copy(baseCameraPos.current);
      }
      rotationYTarget.current = 0;
      rotationXTarget.current = 0;
    }
  }, [selectedDistrictId]);

  // Reset Camera View action
  useEffect(() => {
    if (resetAction > 0) {
      rotationYTarget.current = 0;
      rotationXTarget.current = 0;
      if (containerRef.current && containerRef.current.clientWidth >= 768) {
        cameraLookAt.current.set(0, 0, 0);
        targetCameraPos.current.copy(baseCameraPos.current);
      } else {
        cameraLookAt.current.set(0, 0, -0.6);
        targetCameraPos.current.copy(baseCameraPos.current);
      }
    }
  }, [resetAction]);

  // Raycasting helper: intersects direct district extrusion meshes
  const getIntersectedDistrict = useCallback(
    (clientX: number, clientY: number): string | null => {
      if (!canvasRef.current || !cameraRef.current) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const meshes = Array.from(districtMeshesRef.current.values()).map((v) => v.mesh);
      const intersects = raycasterRef.current.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData && obj.userData.districtId) {
          return obj.userData.districtId;
        }
      }
      return null;
    },
    []
  );

  // Mouse Down: Start drag rotation
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
  };

  // Mouse Move: Orbit rotation & cursor hover tracking across Kerala districts
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.hypot(dx, dy) > 3) {
        hasDraggedRef.current = true;
      }
      rotationYTarget.current += dx * 0.006;
      rotationXTarget.current = Math.max(-0.4, Math.min(0.4, rotationXTarget.current + dy * 0.006));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Raycast on hover: Updates showcased district immediately when cursor moves over it
    const distId = getIntersectedDistrict(e.clientX, e.clientY);

    if (distId) {
      isHoveringKeralaMeshRef.current = true;
      if (!selectedDistrictIdRef.current && distId !== hoveredMeshIdRef.current) {
        hoveredMeshIdRef.current = distId;
        onHoverDistrict(distId);
        if (canvasRef.current) canvasRef.current.style.cursor = "pointer";
      }
    } else {
      isHoveringKeralaMeshRef.current = false;
      if (canvasRef.current) canvasRef.current.style.cursor = "default";
    }
  };

  // Mouse Up: Select district if user clicked without dragging
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;

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
    isHoveringKeralaMeshRef.current = false;
    if (canvasRef.current) canvasRef.current.style.cursor = "default";
  };

  // Zoom In button action
  useEffect(() => {
    if (zoomAction > 0 && cameraRef.current) {
      targetCameraPos.current.multiplyScalar(0.86);
    }
  }, [zoomAction]);

  // Zoom Out button action
  useEffect(() => {
    if (zoomOutAction > 0 && cameraRef.current) {
      targetCameraPos.current.multiplyScalar(1.14);
    }
  }, [zoomOutAction]);

  const activeDistrictImage =
    (activeShowcaseDistrict && DISTRICT_DOSSIERS[activeShowcaseDistrict.id]?.image) ||
    "/images/alleppey-hero.jpg";

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full select-none touch-none overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top-Right Minimalist North Compass (Matches Reference Mockup) */}
      <div className="absolute top-6 sm:top-8 left-[58%] sm:left-[60%] -translate-x-1/2 pointer-events-none select-none flex flex-col items-center gap-1 z-10 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-white/70">
          N
        </span>
        <div className="w-7 h-7 rounded-full border border-white/25 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[9px] border-b-white shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
        </div>
      </div>

      {/* Dynamic Pinned Popover Card: Showcases ONLY the active/hovered district */}
      {activeShowcaseDistrict && (
        <div
          ref={pinContainerRef}
          className="absolute z-20 pointer-events-none flex items-center gap-2.5 transition-opacity duration-200"
          style={{
            top: 0,
            left: 0,
            opacity: 0,
            willChange: "transform",
          }}
        >
          {/* Golden Location Pin Marker */}
          <div
            className="relative flex items-center justify-center -translate-x-1/2"
            title={activeShowcaseDistrict.name}
          >
            <div className="w-7 h-7 rounded-full bg-[#dcb037] flex items-center justify-center text-black shadow-[0_0_16px_rgba(220,176,55,0.85)]">
              <MapPin className="w-4 h-4 fill-black stroke-black" />
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-gold-base animate-ping opacity-40 pointer-events-none" />
          </div>

          {/* Attached Dark Glass Popover Card (Matches Reference UI Exactly) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectDistrict(activeShowcaseDistrict.id);
            }}
            className="bg-[#0b1016]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col gap-1.5 min-w-[130px] pointer-events-auto cursor-pointer group/card hover:border-gold-base/50 transition-colors"
          >
            <span className="text-[11px] font-semibold text-white tracking-wide truncate max-w-[110px]">
              {activeShowcaseDistrict.name.split(" ")[0]}
            </span>
            <div className="flex items-center gap-2">
              <div className="relative w-14 h-9 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                <Image
                  src={activeDistrictImage}
                  alt={activeShowcaseDistrict.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div
                className="w-7 h-7 rounded-full border border-gold-base/70 flex items-center justify-center text-gold-base flex-shrink-0 group-hover/card:bg-gold-base group-hover/card:text-black transition-all"
                aria-label={`View ${activeShowcaseDistrict.name} Details`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
