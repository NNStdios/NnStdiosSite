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
    background: var(--gradient-secondary);
    padding: 4rem var(--spacing-card) var(--spacing-card);
    border-top: 1px solid var(--border-color);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-large);
    margin-bottom: var(--spacing-large);
    align-items: start;
  }

  .footer-brand {
    text-align: left;
  }

  .brand-name {
    font-size: var(--font-size-xxlarge);
    font-weight: var(--font-weight-bold);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--spacing-element);
  }

  .brand-description {
    color: var(--text-muted);
    line-height: var(--line-height-normal);
    font-size: var(--font-size-large);
  }

  .footer-links h4 {
    color: var(--text-secondary);
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-element);
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
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.75rem;
    border-radius: var(--border-radius-small);
    transition: all var(--transition-normal);
    border: 1px solid transparent;
  }

  .social-link:hover {
    color: var(--accent-color);
    background: rgba(59, 130, 246, 0.1);
    border-color: var(--border-color);
    transform: translateX(5px);
  }

  .social-icon {
    font-size: var(--font-size-large);
  }

  .footer-bottom {
    padding-top: var(--spacing-card);
    border-top: 1px solid var(--border-light);
    text-align: center;
    position: relative;
  }

  .copyright {
    color: var(--text-muted);
    margin-bottom: var(--spacing-element);
  }

  .footer-accent {
    width: 100px;
    height: 2px;
    background: var(--gradient-primary);
    margin: 0 auto;
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--spacing-card);
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