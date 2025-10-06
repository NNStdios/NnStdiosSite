<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let src: string;
  export let alt: string = '';
  export let onClose: () => void;

  let scale = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let currentTranslateX = 0;
  let currentTranslateY = 0;

  onMount(() => {
    document.body.style.overflow = 'hidden';
  });

  onDestroy(() => {
    document.body.style.overflow = '';
  });

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(0.5, scale + delta), 5);
    if (scale === 1) {
      translateX = 0;
      translateY = 0;
      currentTranslateX = 0;
      currentTranslateY = 0;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - currentTranslateX;
      startY = e.clientY - currentTranslateY;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && scale > 1) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      currentTranslateX = translateX;
      currentTranslateY = translateY;
    }
  };

  const zoomIn = () => {
    scale = Math.min(scale + 0.5, 5);
  };

  const zoomOut = () => {
    scale = Math.max(scale - 0.5, 0.5);
    if (scale === 1) {
      translateX = 0;
      translateY = 0;
      currentTranslateX = 0;
      currentTranslateY = 0;
    }
  };

  const resetZoom = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
  };
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="zoom-backdrop" on:click={handleBackdropClick} role="presentation">
  <button class="close-button" on:click={onClose}>×</button>

  <div class="zoom-controls">
    <button class="zoom-btn" on:click={zoomOut} title="Zoom Out">
      <i class="fas fa-minus"></i>
    </button>
    <button class="zoom-btn" on:click={resetZoom} title="Reset">
      <i class="fas fa-compress"></i>
    </button>
    <button class="zoom-btn" on:click={zoomIn} title="Zoom In">
      <i class="fas fa-plus"></i>
    </button>
    <span class="zoom-level">{Math.round(scale * 100)}%</span>
  </div>

  <div
    class="image-container"
    class:dragging={isDragging}
    on:wheel={handleWheel}
    on:mousedown={handleMouseDown}
    role="presentation"
  >
    <img
      {src}
      {alt}
      style="transform: scale({scale}) translate({translateX / scale}px, {translateY / scale}px);"
      draggable="false"
    />
  </div>
</div>

<style>
  .zoom-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    cursor: zoom-out;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: #EF4444;
    font-size: 2rem;
    cursor: pointer;
    z-index: 3001;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .close-button:hover {
    background: rgba(239, 68, 68, 0.4);
    border-color: #EF4444;
  }

  .zoom-controls {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    background: rgba(15, 23, 42, 0.9);
    padding: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(59, 130, 246, 0.3);
    z-index: 3001;
    align-items: center;
  }

  .zoom-btn {
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #60A5FA;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zoom-btn:hover {
    background: rgba(59, 130, 246, 0.4);
    border-color: #60A5FA;
  }

  .zoom-level {
    color: #60A5FA;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0 0.5rem;
    min-width: 4rem;
    text-align: center;
  }

  .image-container {
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: grab;
  }

  .image-container.dragging {
    cursor: grabbing;
  }

  .image-container img {
    max-width: 100%;
    max-height: 95vh;
    object-fit: contain;
    transition: transform 0.1s ease-out;
    user-select: none;
  }

  @media (max-width: 768px) {
    .zoom-controls {
      bottom: 1rem;
      padding: 0.5rem;
    }

    .zoom-btn {
      width: 2rem;
      height: 2rem;
    }

    .zoom-level {
      font-size: 0.8rem;
      min-width: 3rem;
    }
  }
</style>
