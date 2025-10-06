<script lang="ts">
  import { siteConfig } from '../../config/site';
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

    const section = document.querySelector('.supporters');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section class="supporters">
  <div class="container" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">Our Supporters</h2>
      <p class="section-subtitle">We can continue working thanks to supporters!</p>
    </div>

    <div class="supporters-grid">
      {#each siteConfig.supporters as supporter, i}
        <div class="supporter-card" style="animation-delay: {i * 0.05}s">
          <div class="supporter-avatar">
            <span class="avatar-text">{supporter.charAt(0)}</span>
            <div class="avatar-glow"></div>
          </div>
          <div class="supporter-info">
            <div class="supporter-name">{supporter}</div>
            <div class="supporter-badge">
              <i class="fas fa-star"></i>
              <span>Certified</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="thank-you-section">
      <p class="thank-you-text">Big thanks to all contributors</p>
    </div>
  </div>
</section>

<style>
  .supporters {
    padding: 5rem 2rem 4rem;
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
    font-size: 1rem;
    color: #64748B;
    font-style: italic;
  }

  .supporters-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .supporter-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out both;
    width: 200px;
  }

  .supporter-card:hover {
    transform: translateY(-5px);
    border-color: rgba(96, 165, 250, 0.3);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  }

  .supporter-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.2));
    border-radius: 50%;
    border: 2px solid rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
  }

  .supporter-card:hover .supporter-avatar {
    transform: scale(1.1);
    border-color: #60A5FA;
  }

  .avatar-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #60A5FA;
    z-index: 2;
  }

  .avatar-glow {
    position: absolute;
    inset: -5px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .supporter-card:hover .avatar-glow {
    opacity: 1;
  }

  .supporter-info {
    text-align: center;
    width: 100%;
  }

  .supporter-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #E2E8F0;
    margin-bottom: 0.5rem;
    word-break: break-word;
  }

  .supporter-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.75rem;
    background: rgba(251, 191, 36, 0.1);
    border: 1px solid rgba(251, 191, 36, 0.3);
    border-radius: 2rem;
    font-size: 0.75rem;
    color: #FBBF24;
    font-weight: 600;
  }

  .supporter-badge i {
    font-size: 0.7rem;
  }

  .thank-you-section {
    text-align: center;
    padding: 3rem 2rem;
    background: rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(59, 130, 246, 0.1);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
  }

  .thank-you-text {
    font-size: 1.2rem;
    color: #94A3B8;
    margin: 0;
    font-weight: 500;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .supporters {
      padding: 6rem 1.5rem;
    }

    .supporters-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .supporter-card {
      padding: 1rem;
    }

    .supporter-avatar {
      width: 50px;
      height: 50px;
    }

    .avatar-text {
      font-size: 1.2rem;
    }
  }
</style>
