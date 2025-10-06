<script lang="ts">
  import { siteConfig } from '../../config/site';
</script>

<section id="contact" class="contact">
  <div class="container">
    <h2 class="section-title">Get In Touch</h2>
    <p class="contact-description">Connect with us on social media</p>

    <div class="social-links">
      {#each siteConfig.social as social}
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          aria-label={social.name}
        >
          <i class={social.icon}></i>
          <span>{social.name}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .contact {
    padding: 4rem 2rem;
    background: #0F172A;
    position: relative;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .contact-description {
    font-size: 1.2rem;
    color: #CBD5E1;
    margin-bottom: 2rem;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 1rem;
    transition: all 0.3s ease;
    text-decoration: none;
    color: #E2E8F0;
    min-width: 120px;
  }

  .social-link:hover {
    transform: translateY(-5px);
    border-color: #60A5FA;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.1);
  }

  .social-link i {
    font-size: 2.5rem;
    color: #60A5FA;
    transition: all 0.3s ease;
  }

  .social-link:hover i {
    color: #3B82F6;
    transform: scale(1.1);
  }

  .social-link span {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    .social-links {
      gap: 1rem;
    }

    .social-link {
      min-width: 100px;
      padding: 1rem;
    }

    .social-link i {
      font-size: 2rem;
    }
  }
</style>
