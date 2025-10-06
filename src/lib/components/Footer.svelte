<script lang="ts">
  import { siteConfig } from '../../config/site';

  const currentYear = new Date().getFullYear();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'twitter': return 'fab fa-twitter';
      case 'discord': return 'fab fa-discord';
      case 'youtube': return 'fab fa-youtube';
      default: return 'fas fa-link';
    }
  };
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <h3 class="brand-name">{siteConfig.name}</h3>
        <p class="brand-description">{siteConfig.description}</p>
      </div>
      
    <div class="footer-links">
      <div class="social-links">
        <h4>Contact Us</h4>
        <div class="social-grid">
          <a href="mailto:example@email.com" class="social-link">
            <i class="fas fa-envelope social-icon"></i>
            <span class="social-name">example@email.com</span>
          </a>
        </div>
      </div>
    </div>

    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© {currentYear} {siteConfig.name}. All rights reserved.</p>
      <div class="footer-accent"></div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(180deg, #0F172A 0%, #020617 100%);
    padding: 4rem 2rem 2rem;
    border-top: 1px solid rgba(59, 130, 246, 0.2);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;
  }

  .footer-brand {
    text-align: left;
  }

  .brand-name {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .brand-description {
    color: #94A3B8;
    line-height: 1.6;
    font-size: 1.1rem;
  }

  .footer-links h4 {
    color: #E2E8F0;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .social-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #94A3B8;
    text-decoration: none;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .social-link:hover {
    color: #60A5FA;
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateX(5px);
  }

  .social-icon {
    font-size: 1.2rem;
  }

  .footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid rgba(59, 130, 246, 0.1);
    text-align: center;
    position: relative;
  }

  .copyright {
    color: #64748B;
    margin-bottom: 1rem;
  }

  .footer-accent {
    width: 100px;
    height: 2px;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    margin: 0 auto;
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .footer-brand {
      text-align: center;
    }

    .social-grid {
      align-items: center;
    }
  }
</style>