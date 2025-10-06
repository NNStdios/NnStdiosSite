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
    background: #0F172A;
    overflow: hidden;
    padding: 3rem 0;
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
    background: #60A5FA;
    border-radius: 50%;
    box-shadow: 0 0 6px #60A5FA;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 1200px;
    padding: 2rem;
    width: 100%;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #1E40AF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
    animation: glow 3s ease-in-out infinite alternate;
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: #CBD5E1;
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .about-section {
    margin: 2rem auto;
    max-width: 900px;
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .about-text {
    font-size: 1.1rem;
    color: #CBD5E1;
    line-height: 1.8;
  }

  .highlight-projects {
    margin: 2.5rem 0;
  }

  .highlight-title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 600;
    color: #E2E8F0;
    margin-bottom: 2rem;
  }

  .highlight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .highlight-card {
    background: rgba(15, 23, 42, 0.8);
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(59, 130, 246, 0.2);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
  }

  .highlight-card:hover {
    transform: translateY(-10px);
    border-color: #60A5FA;
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
  }

  .highlight-image {
    height: 200px;
    overflow: hidden;
  }

  .highlight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .highlight-card:hover .highlight-image img {
    transform: scale(1.1);
  }

  .highlight-info {
    padding: 1.5rem;
  }

  .highlight-info h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #E2E8F0;
    margin: 0 0 0.5rem 0;
  }

  .highlight-info p {
    color: #CBD5E1;
    line-height: 1.6;
    margin: 0;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.5rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cta-button.primary {
    background: linear-gradient(135deg, #3B82F6, #1E40AF);
    color: white;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  }

  .cta-button.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
  }

  .cta-button.secondary {
    background: transparent;
    color: #60A5FA;
    border: 2px solid #60A5FA;
    box-shadow: 0 4px 20px rgba(96, 165, 250, 0.2);
  }

  .cta-button.secondary:hover {
    background: rgba(96, 165, 250, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.4);
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