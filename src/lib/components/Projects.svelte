<script lang="ts">
  import { siteConfig } from '../../config/site';
  import { link } from 'svelte-spa-router';
  import { onMount } from 'svelte';

  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });

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
</script>

<section id="projects" class="projects">
  <div class="container" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">All Projects</h2>
      <p class="section-subtitle">Explore our complete portfolio</p>
    </div>

    <div class="projects-grid">
      {#each siteConfig.projects as project, i}
        <a
          href={`/project/${project.id}`}
          use:link
          class="project-card"
          style="animation-delay: {i * 0.1}s"
        >
          <div class="card-badge" style="background: {getStatusColor(project.status)}20; color: {getStatusColor(project.status)}">
            {getStatusText(project.status)}
          </div>

          <div class="project-image">
            <img src={project.image} alt={project.title} />
            <div class="image-overlay">
              <div class="overlay-content">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div class="project-content">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>

            <div class="project-tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects {
    padding: 5rem 2rem;
    background: #0F172A;
    position: relative;
    overflow: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: #64748B;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    position: relative;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 1.5rem;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out both;
  }

  .project-card:hover {
    transform: translateY(-12px);
    border-color: rgba(96, 165, 250, 0.4);
    box-shadow: 0 25px 50px rgba(59, 130, 246, 0.25);
  }

  .card-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
  }

  .project-image {
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .project-card:hover .project-image img {
    transform: scale(1.08);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(96, 165, 250, 0.95));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .project-card:hover .image-overlay {
    opacity: 1;
  }

  .overlay-content i {
    font-size: 2.5rem;
    color: white;
    transform: translateX(-20px);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .project-card:hover .overlay-content i {
    transform: translateX(0);
  }

  .project-content {
    padding: 2rem;
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #F8FAFC;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
  }

  .project-description {
    color: #94A3B8;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.4rem 0.9rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #60A5FA;
    transition: all 0.3s ease;
  }

  .project-card:hover .tag {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(96, 165, 250, 0.4);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .projects {
      padding: 6rem 1.5rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
