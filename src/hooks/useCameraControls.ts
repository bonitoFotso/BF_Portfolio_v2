import { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring } from '@react-spring/web';

interface CameraPosition {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  zoom: number;
}

interface UseCameraControlsOptions {
  initialPosition?: Partial<CameraPosition>;
  sensitivity?: number;
  bounds?: {
    x: [number, number];
    y: [number, number];
    z: [number, number];
    rotationX: [number, number];
    rotationY: [number, number];
    zoom: [number, number];
  };
}

export const useCameraControls = (options: UseCameraControlsOptions = {}) => {
  const {
    initialPosition = { x: 0, y: 0, z: 10, rotationX: 0, rotationY: 0, zoom: 1 },
    sensitivity = 1,
    bounds = {
      x: [-100, 100],
      y: [-100, 100],
      z: [1, 50],
      rotationX: [-Math.PI / 4, Math.PI / 4],
      rotationY: [-Math.PI / 4, Math.PI / 4],
      zoom: [0.5, 2]
    }
  } = options;
  
  const defaultPosition: CameraPosition = {
    x: 0,
    y: 0,
    z: 10,
    rotationX: 0,
    rotationY: 0,
    zoom: 1,
    ...initialPosition
  };
  
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef(defaultPosition);
  
  // Utiliser react-spring pour des animations fluides
  const [{ x, y, z, rotationX, rotationY, zoom }, api] = useSpring(() => ({
    x: defaultPosition.x,
    y: defaultPosition.y,
    z: defaultPosition.z,
    rotationX: defaultPosition.rotationX,
    rotationY: defaultPosition.rotationY,
    zoom: defaultPosition.zoom,
    config: { mass: 1, tension: 280, friction: 60 }
  }));
  
  // Fonction pour contraindre les valeurs dans les limites
  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };
  
  // Gestionnaires d'événements
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = (e.clientX - startPosRef.current.x) * 0.01 * sensitivity;
    const deltaY = (e.clientY - startPosRef.current.y) * 0.01 * sensitivity;
    
    const newRotationY = clamp(
      lastPosRef.current.rotationY - deltaX,
      bounds.rotationY[0],
      bounds.rotationY[1]
    );
    
    const newRotationX = clamp(
      lastPosRef.current.rotationX - deltaY,
      bounds.rotationX[0],
      bounds.rotationX[1]
    );
    
    api.start({
      rotationX: newRotationX,
      rotationY: newRotationY
    });
  }, [isDragging, sensitivity, bounds, api]);
  
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      lastPosRef.current = {
        ...lastPosRef.current,
        rotationX: rotationX.get(),
        rotationY: rotationY.get()
      };
    }
  }, [isDragging, rotationX, rotationY]);
  
const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const deltaZ = e.deltaY * 0.01;
    const newZoom = clamp(
        lastPosRef.current.zoom - deltaZ,
        bounds.zoom[0],
        bounds.zoom[1]
    );
    
    api.start({ zoom: newZoom });
    lastPosRef.current = {
        ...lastPosRef.current,
        zoom: newZoom
    };
}, [bounds.zoom, api]);

const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const step = 5 * sensitivity;
    let deltaX = 0;
    let deltaY = 0;
    
    switch (e.key) {
        case 'ArrowUp':
            deltaY = -step;
            break;
        case 'ArrowDown':
            deltaY = step;
            break;
        case 'ArrowLeft':
            deltaX = -step;
            break;
        case 'ArrowRight':
            deltaX = step;
            break;
        default:
            return;
    }
    
    const newX = clamp(
        lastPosRef.current.x + deltaX,
        bounds.x[0],
        bounds.x[1]
    );
    
    const newY = clamp(
        lastPosRef.current.y + deltaY,
        bounds.y[0],
        bounds.y[1]
    );
    
    api.start({ x: newX, y: newY });
    lastPosRef.current = {
        ...lastPosRef.current,
        x: newX,
        y: newY
    };
}, [sensitivity, bounds.x, bounds.y, api]);
  // Ajouter et supprimer les écouteurs d'événements
  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleMouseMove, handleMouseUp, handleWheel, isDragging]);
  
  // Reset camera
  const resetCamera = () => {
    api.start({
      x: defaultPosition.x,
      y: defaultPosition.y,
      z: defaultPosition.z,
      rotationX: defaultPosition.rotationX,
      rotationY: defaultPosition.rotationY,
      zoom: defaultPosition.zoom
    });
    
    lastPosRef.current = defaultPosition;
  };
  
  // Focus on target
  const focusOn = (target: Partial<CameraPosition>) => {
    const newPosition = {
      ...lastPosRef.current,
      ...target
    };
    
    api.start({
      x: clamp(newPosition.x, bounds.x[0], bounds.x[1]),
      y: clamp(newPosition.y, bounds.y[0], bounds.y[1]),
      z: clamp(newPosition.z, bounds.z[0], bounds.z[1]),
      rotationX: clamp(newPosition.rotationX, bounds.rotationX[0], bounds.rotationX[1]),
      rotationY: clamp(newPosition.rotationY, bounds.rotationY[0], bounds.rotationY[1]),
      zoom: clamp(newPosition.zoom, bounds.zoom[0], bounds.zoom[1])
    });
    
    lastPosRef.current = newPosition;
  };
  
  return {
    cameraProps: { x, y, z, rotationX, rotationY, zoom },
    isDragging,
    resetCamera,
    focusOn
  };
};