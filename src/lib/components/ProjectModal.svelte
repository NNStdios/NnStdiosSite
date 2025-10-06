<script lang="ts">
  import { type Project } from '../../config/site';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let project: Project;
  export let onClose: () => void;

  const dispatch = createEventDispatcher();

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

  const getIcon = (type: string) => {
    switch (type) {
      case 'github': return 'fab fa-github';
      case 'steam': return 'fab fa-steam';
      case 'download': return 'fas fa-download';
      case 'website': return 'fas fa-globe';
      case 'video': return 'fas fa-video';
      default: return 'fas fa-link';
    }
  };

  const getLinkLabel = (link: any) => {
    return link.label || link.type.charAt(0).toUpperCase() + link.type.slice(1);
  };
</script>

<div class="modal-backdrop" on:click={handleBackdropClick} role="presentation">
  <div class="modal">
    <button class="close-button" on:click={onClose}>×</button>
    
    <div class="modal-header">
      <h2 class="modal-title">{project.title}</h2>
      <div class="modal-tags">
        {#each project.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>

    <div class="modal-content">
      <div class="modal-section">
        <h3>Description</h3>
        <p>{project.description}</p>
      </div>

      {#if project.images && project.images.length > 0}
        <div class="modal-section">
          <h3>Gallery</h3>
          <div class="image-gallery">
            {#each project.images as image}
              <img src={image} alt={project.title} />
            {/each}
          </div>
        </div>
      {/if}

      {#if project.videos && project.videos.length > 0}
        <div class="modal-section">
          <h3>Videos</h3>
          <div class="video-links">
            {#each project.videos as video}
              <a href={video} target="_blank" rel="noopener noreferrer" class="video-link">
                <i class="fas fa-video"></i>
                Watch Trailer
              </a>
            {/each}
          </div>
        </div>
      {/if}

      {#if project.links && project.links.length > 0}
        <div class="modal-section">
          <h3>Links</h3>
          <div class="project-links">
            {#each project.links as link}
              <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link {link.type}">
                <i class="{getIcon(link.type)} link-icon"></i>
                <span class="link-label">{getLinkLabel(link)}</span>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 2rem;
  }

  .modal {
    background: rgba(15, 23, 42, 0.95);
    border-radius: 1rem;
    max-width: 800px;
    max-height: 90vh;
    width: 100%;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(59, 130, 246, 0.3);
    backdrop-filter: blur(10px);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #E2E8F0;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .close-button:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #EF4444;
  }

  .modal-header {
    padding: 2rem;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  }

  .modal-title {
    font-size: 2rem;
    font-weight: 700;
    color: #E2E8F0;
    margin: 0 0 1rem 0;
  }

  .modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: rgba(59, 130, 246, 0.2);
    color: #60A5FA;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .modal-content {
    padding: 2rem;
  }

  .modal-section {
    margin-bottom: 2rem;
  }

  .modal-section h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  .modal-section p {
    color: #CBD5E1;
    line-height: 1.6;
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .image-gallery img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 0.5rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .video-links, .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .video-link, .project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(59, 130, 246, 0.1);
    color: #60A5FA;
    text-decoration: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .video-link:hover, .project-link:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .project-link.github {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .project-link.steam {
    background: rgba(23, 26, 35, 0.8);
    border-color: rgba(102, 192, 244, 0.3);
  }

  .link-icon {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .modal-backdrop {
      padding: 1rem;
    }

    .modal-header {
      padding: 1.5rem;
    }

    .modal-content {
      padding: 1.5rem;
    }

    .video-links, .project-links {
      flex-direction: column;
    }

    .image-gallery {
      grid-template-columns: 1fr;
    }
  }
</style>