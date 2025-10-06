<script lang="ts">
  import { siteConfig } from '../../config/site';
</script>

<section id="about" class="about">
  <div class="container">
    <h2 class="section-title">{siteConfig.about.title}</h2>
    <div class="about-content">
      <div class="about-text">
        <p class="about-description">{siteConfig.about.content}</p>
        <div class="mission">
          <h3 class="mission-title">Our Mission</h3>
          <p class="mission-text">{siteConfig.about.mission}</p>
        </div>
      </div>
      <div class="about-visual">
        <div class="glow-orb"></div>
        <div class="tech-grid">
          <div class="tech-item">Game Development</div>
          <div class="tech-item">3D Graphics</div>
          <div class="tech-item">Audio Design</div>
          <div class="tech-item">UI/UX</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
    position: relative;
    overflow: hidden;
  }

  .about::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #60A5FA, transparent);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .about-text {
    space-y: 2rem;
  }

  .about-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #CBD5E1;
    margin-bottom: 2rem;
  }

  .mission {
    background: rgba(59, 130, 246, 0.1);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
    backdrop-filter: blur(10px);
  }

  .mission-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  .mission-text {
    color: #E2E8F0;
    line-height: 1.6;
  }

  .about-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .glow-orb {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    z-index: 1;
  }

  .tech-item {
    background: rgba(15, 23, 42, 0.8);
    padding: 1.5rem;
    border-radius: 0.75rem;
    text-align: center;
    font-weight: 600;
    color: #E2E8F0;
    border: 1px solid rgba(60, 130, 246, 0.3);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .tech-item:hover {
    transform: translateY(-5px);
    border-color: #60A5FA;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .glow-orb {
      width: 200px;
      height: 200px;
    }

    .tech-grid {
      grid-template-columns: 1fr;
    }
  }
</style>