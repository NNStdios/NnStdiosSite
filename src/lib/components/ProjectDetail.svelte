<script lang="ts">
  import { siteConfig, type Project } from '../../config/site';
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import ImageZoom from './ImageZoom.svelte';

  export let params: { id: string };

  let zoomedImage: { src: string; alt: string } | null = null;

  onMount(() => {
    window.scrollTo(0, 0);
  });

  $: project = siteConfig.projects.find(p => p.id === params.id) as Project | undefined;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released': return '#10B981';
      case 'in-development': return '#F59E0B';
      case 'concept': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'released': return 'Released';
      case 'in-development': return 'In Development';
      case 'concept': return 'Concept';
      default: return status;
    }
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github': return 'fab fa-github';
      case 'steam': return 'fab fa-steam';
      case 'website': return 'fas fa-globe';
      case 'download': return 'fas fa-download';
      case 'video': return 'fas fa-play';
      default: return 'fas fa-link';
    }
  };

  const openImageZoom = (src: string, alt: string = '') => {
    zoomedImage = { src, alt };
  };

  const closeImageZoom = () => {
    zoomedImage = null;
  };
</script>

{#if project}
  <div class="project-detail">
    <div class="back-button-wrapper">
      <a href="/" use:link class="back-button">
        <i class="fas fa-arrow-left"></i>
        Back to Home
      </a>
    </div>

    <div class="project-header">
      <div class="header-content">
        <div class="title-row">
          <h1 class="project-title">{project.title}</h1>
          <span class="project-status" style="color: {getStatusColor(project.status)}">
            {getStatusText(project.status)}
          </span>
        </div>
        <p class="project-description">{project.description}</p>
        <div class="project-tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    </div>

    <div class="project-content">
      {#if project.content && project.content.length > 0}
        <div class="flexible-content">
          {#each project.content as component}
            {#if component.type === 'text'}
              <p class="content-text">{component.content}</p>
            {:else if component.type === 'heading'}
              {#if component.level === 1}
                <h1 class="content-heading">{component.content}</h1>
              {:else if component.level === 3}
                <h3 class="content-heading">{component.content}</h3>
              {:else}
                <h2 class="content-heading">{component.content}</h2>
              {/if}
            {:else if component.type === 'image'}
              <div class="content-image" style={component.width ? `width: ${component.width}` : ''}>
                <img
                  src={component.src}
                  alt={component.alt || project.title}
                  on:click={() => openImageZoom(component.src, component.alt || project.title)}
                  class="clickable-image"
                  role="button"
                  tabindex="0"
                  on:keydown={(e) => e.key === 'Enter' && openImageZoom(component.src, component.alt || project.title)}
                />
                {#if component.caption}
                  <p class="image-caption">{component.caption}</p>
                {/if}
              </div>
            {:else if component.type === 'video'}
              <div class="content-video" style={component.width ? `width: ${component.width}` : ''}>
                <div class="video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${component.youtubeId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                {#if component.caption}
                  <p class="video-caption">{component.caption}</p>
                {/if}
              </div>
            {:else if component.type === 'gallery'}
              <div class="content-gallery" style={component.columns ? `grid-template-columns: repeat(${component.columns}, 1fr)` : ''}>
                {#each component.images as image}
                  <div class="gallery-item">
                    <img
                      src={image.src}
                      alt={image.alt || project.title}
                      on:click={() => openImageZoom(image.src, image.alt || project.title)}
                      class="clickable-image"
                      role="button"
                      tabindex="0"
                      on:keydown={(e) => e.key === 'Enter' && openImageZoom(image.src, image.alt || project.title)}
                    />
                  </div>
                {/each}
              </div>
            {:else if component.type === 'link'}
              <a href={component.url} target="_blank" rel="noopener noreferrer" class="content-link">
                {#if component.icon}
                  <i class={component.icon}></i>
                {/if}
                <span>{component.label}</span>
              </a>
            {:else if component.type === 'spacer'}
              <div class="content-spacer" style={component.height ? `height: ${component.height}` : ''}></div>
            {/if}
          {/each}
        </div>

        <div class="links-section">
          <h3>Links</h3>
          <div class="links-grid">
            {#each project.links as link}
              <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
                <i class={getLinkIcon(link.type)}></i>
                <span>{link.label || link.type}</span>
              </a>
            {/each}
          </div>
        </div>
      {:else}
        <div class="media-section">
          <div class="main-image">
            <img
              src={project.image}
              alt={project.title}
              on:click={() => openImageZoom(project.image, project.title)}
              class="clickable-image"
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && openImageZoom(project.image, project.title)}
            />
          </div>

          {#if project.images && project.images.length > 1}
            <div class="image-gallery">
              {#each project.images.slice(1) as image}
                <div class="gallery-item">
                  <img
                    src={image}
                    alt={project.title}
                    on:click={() => openImageZoom(image, project.title)}
                    class="clickable-image"
                    role="button"
                    tabindex="0"
                    on:keydown={(e) => e.key === 'Enter' && openImageZoom(image, project.title)}
                  />
                </div>
              {/each}
            </div>
          {/if}

          {#if project.videos && project.videos.length > 0}
            <div class="videos-section">
              <h3>Videos & Trailers</h3>
              <div class="videos-list">
                {#each project.videos as video}
                  <a href={video} target="_blank" rel="noopener noreferrer" class="video-link">
                    <i class="fas fa-play-circle"></i>
                    Watch Video
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <div class="info-section">
          {#if project.fullDescription}
            <div class="full-description">
              <h2>About This Project</h2>
              <p>{project.fullDescription}</p>
            </div>
          {/if}

          <div class="links-section">
            <h3>Links</h3>
            <div class="links-grid">
              {#each project.links as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
                  <i class={getLinkIcon(link.type)}></i>
                  <span>{link.label || link.type}</span>
                </a>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="not-found">
    <h1>Project Not Found</h1>
    <p>The project you're looking for doesn't exist.</p>
    <a href="/" use:link class="back-button">
      <i class="fas fa-arrow-left"></i>
      Back to Home
    </a>
  </div>
{/if}

{#if zoomedImage}
  <ImageZoom src={zoomedImage.src} alt={zoomedImage.alt} onClose={closeImageZoom} />
{/if}

<style>
  .project-detail {
    min-height: 100vh;
    background: #0F172A;
    padding: 1.5rem 2rem 3rem;
  }

  .back-button-wrapper {
    max-width: 1400px;
    margin: 0 auto 2rem;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 0.5rem;
    color: #60A5FA;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .back-button:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: #60A5FA;
    transform: translateX(-5px);
  }

  .project-header {
    max-width: 1400px;
    margin: 0 auto 3rem;
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .project-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .project-status {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .project-description {
    font-size: 1.3rem;
    color: #CBD5E1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tag {
    background: rgba(59, 130, 246, 0.2);
    color: #60A5FA;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .project-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
  }

  .flexible-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .content-text {
    color: #CBD5E1;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .content-heading {
    color: #E2E8F0;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
  }

  .content-image {
    max-width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .content-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .clickable-image {
    cursor: zoom-in;
    transition: all 0.3s ease;
  }

  .clickable-image:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
  }

  .image-caption, .video-caption {
    color: #94A3B8;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 0.5rem;
    font-style: italic;
  }

  .content-video {
    max-width: 100%;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .content-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 0.5rem;
    color: #60A5FA;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .content-link:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: #60A5FA;
    transform: translateX(5px);
  }

  .content-spacer {
    height: 1rem;
  }

  .media-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .main-image {
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .main-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .gallery-item {
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid rgba(59, 130, 246, 0.2);
    transition: all 0.3s ease;
  }

  .gallery-item:hover {
    transform: scale(1.05);
    border-color: #60A5FA;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }

  .gallery-item img {
    width: 100%;
    height: auto;
    display: block;
  }

  .videos-section h3,
  .info-section h2,
  .info-section h3 {
    color: #E2E8F0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .videos-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .video-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.5rem;
    color: #EF4444;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .video-link:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: #EF4444;
    transform: translateX(5px);
  }

  .video-link i {
    font-size: 1.5rem;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .full-description {
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .full-description p {
    color: #CBD5E1;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .links-section {
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .links-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 0.5rem;
    color: #60A5FA;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: capitalize;
    word-break: break-word;
  }

  .project-link:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: #60A5FA;
    transform: translateX(5px);
  }

  .project-link i {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #0F172A;
    padding: 2rem;
  }

  .not-found h1 {
    font-size: 3rem;
    color: #E2E8F0;
    margin-bottom: 1rem;
  }

  .not-found p {
    font-size: 1.2rem;
    color: #CBD5E1;
    margin-bottom: 2rem;
  }

  @media (max-width: 1024px) {
    .project-content {
      grid-template-columns: 1fr;
    }

    .title-row {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .project-detail {
      padding: 1rem;
    }

    .project-header {
      padding: 1.5rem;
    }

    .image-gallery {
      grid-template-columns: 1fr;
    }
  }
</style>
