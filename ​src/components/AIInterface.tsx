'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export default function AIInterface() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let handLandmarker: HandLandmarker;
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    if (!canvasRef.current || !videoRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const geometry = new THREE.RingGeometry(1.8, 2, 64);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xebd197, 
      side: THREE.DoubleSide, 
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const holographicCircle = new THREE.Mesh(geometry, material);
    scene.add(holographicCircle);
    camera.position.z = 5;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    async function initSystem() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Hardware initialization failed:", error);
      }
    }

    let lastVideoTime = -1;
    function renderLoop() {
      if (videoRef.current && videoRef.current.readyState >= 2 && handLandmarker) {
        const startTimeMs = performance.now();
        
        if (videoRef.current.currentTime !== lastVideoTime) {
          lastVideoTime = videoRef.current.currentTime;
          const results = handLandmarker.detectForVideo(videoRef.current, startTimeMs);
          
          if (results.landmarks && results.landmarks.length > 0) {
            const hand = results.landmarks[0];
            const dx = hand[8].x - hand[4].x; 
            const dy = hand[8].y - hand[4].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const targetScale = Math.max(0.5, distance * 8);
            holographicCircle.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
            material.opacity = Math.min(1, distance * 2 + 0.2); 
          }
        }
      }
      
      holographicCircle.rotation.z += 0.01;
      holographicCircle.rotation.x = Math.sin(performance.now() * 0.001) * 0.15;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    initSystem().then(() => renderLoop());

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (stream) stream.getTracks().forEach(track => track.stop());
      handLandmarker?.close();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" 
        playsInline 
        muted 
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
      />
    </>
  );
}
