<script lang="ts">
  import { siteConfig } from '../../config/site';
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';

  let heroElement: HTMLElement;
  let particles: Array<{ x: number; y: number; vx: number; vy: number; opacity: number }> = [];

  const highlightProjects = siteConfig.projects.filter(p => p.highlight);

  onMount(() => {
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  });
</script>

<section class="hero" bind:this={heroElement}>
  <div class="particles">
    {#each particles as particle}
      <div
        class="particle"
        style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity}"
      ></div>
    {/each}
  </div>

  <div class="hero-content">
    <div class="hero-text">
      <h1 class="hero-title">{siteConfig.name}</h1>
      <p class="hero-subtitle">{siteConfig.description}</p>

      <div class="about-section">
        <p class="about-text">{siteConfig.about.content}</p>
      </div>

      {#if highlightProjects.length > 0}
        <div class="highlight-projects">
          <h2 class="highlight-title">Featured Projects</h2>
          <div class="highlight-grid">
            {#each highlightProjects as project}
              <a href={`/project/${project.id}`} use:link class="highlight-card">
                <div class="highlight-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div class="highlight-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}

      <div class="hero-buttons">
        <button class="cta-button primary" on:click={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View All Projects
        </button>
        <button class="cta-button secondary" on:click={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}>
          Meet the Team
        </button>
      </div>
    </div>
  </div>

  <div class="hero-glow"></div>
</section>

<style>
  .hero {
    position: relative;
    min-height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    overflow: hidden;
    padding: var(--spacing-large) 0;
  }

  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--accent-color);
    border-radius: 50%;
    box-shadow: 0 0 6px var(--accent-color);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 1200px;
    padding: var(--spacing-card);
    width: 100%;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, var(--font-size-hero));
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-element);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
    animation: glow 3s ease-in-out infinite alternate;
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, var(--font-size-xlarge));
    color: var(--text-secondary);
    margin-bottom: var(--spacing-card);
    font-weight: var(--font-weight-normal);
    letter-spacing: 0.5px;
  }

  .about-section {
    margin: var(--spacing-card) auto;
    max-width: 900px;
    padding: var(--spacing-card);
    background: rgba(30, 41, 59, 0.5);
    border-radius: var(--border-radius-medium);
    border: 1px solid var(--border-color);
  }

  .about-text {
    font-size: var(--font-size-large);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
  }

  .highlight-projects {
    margin: 2.5rem 0;
  }

  .highlight-title {
    font-size: clamp(1.5rem, 4vw, var(--font-size-xxlarge));
    font-weight: var(--font-weight-semibold);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-card);
  }

  .highlight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-card);
  }

  .highlight-card {
    background: rgba(15, 23, 42, 0.8);
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all var(--transition-normal);
    text-decoration: none;
    color: inherit;
  }

  .highlight-card:hover {
    transform: translateY(-10px);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-large);
  }

  .highlight-image {
    height: 200px;
    overflow: hidden;
  }

  .highlight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }

  .highlight-card:hover .highlight-image img {
    transform: scale(var(--hover-scale));
  }

  .highlight-info {
    padding: 1.5rem;
  }

  .highlight-info h3 {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-semibold);
    color: var(--text-secondary);
    margin: 0 0 var(--spacing-small) 0;
  }

  .highlight-info p {
    color: var(--text-secondary);
    line-height: var(--line-height-normal);
    margin: 0;
  }

  .hero-buttons {
    display: flex;
    gap: var(--spacing-element);
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.5rem;
  }

  .cta-button {
    padding: var(--spacing-element) var(--spacing-card);
    border: none;
    border-radius: var(--border-radius-medium);
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cta-button.primary {
    background: var(--gradient-primary);
    color: var(--text-on-primary);
    box-shadow: var(--shadow-medium);
  }

  .cta-button.primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-large);
  }

  .cta-button.secondary {
    background: transparent;
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
    box-shadow: var(--shadow-small);
  }

  .cta-button.secondary:hover {
    background: rgba(96, 165, 250, 0.1);
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes glow {
    0% { text-shadow: 0 0 40px rgba(96, 165, 250, 0.3); }
    100% { text-shadow: 0 0 60px rgba(96, 165, 250, 0.5), 0 0 80px rgba(96, 165, 250, 0.3); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
  }

  @media (max-width: 768px) {
    .highlight-grid {
      grid-template-columns: 1fr;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .cta-button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>