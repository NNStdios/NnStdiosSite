<script lang="ts">
  import { siteConfig } from '../../config/site';

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    isMenuOpen = false;
  };
</script>

<header class="header">
  <nav class="nav">
    <div class="nav-content">
      <div class="logo">
        <h1 class="logo-text">{siteConfig.name}</h1>
      </div>

      <div class="nav-links" class:open={isMenuOpen}>
        <button class="nav-link" on:click={() => scrollToSection('about')}>About</button>
        <button class="nav-link" on:click={() => scrollToSection('projects')}>Projects</button>
        <button class="nav-link" on:click={() => scrollToSection('team')}>Team</button>
      </div>

      <button class="menu-toggle" on:click={toggleMenu}>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
      </button>
    </div>
  </nav>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--header-background);
    backdrop-filter: blur(var(--blur-amount));
    border-bottom: 1px solid var(--header-border);
  }

  .nav {
    padding: var(--header-padding);
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-text {
    font-size: var(--header-logo-size);
    font-weight: var(--font-weight-bold);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .nav-links {
    display: flex;
    gap: calc(var(--spacing-element) * 2);
    align-items: center;
  }

  .nav-link {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    padding: var(--spacing-small) var(--spacing-element);
    border-radius: var(--border-radius-small);
    transition: all var(--transition-normal);
    position: relative;
  }

  .nav-link:hover {
    color: var(--accent-color);
    transform: translateY(-2px);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: all var(--transition-normal);
    transform: translateX(-50%);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-small);
  }

  .hamburger {
    width: 1.5rem;
    height: 0.125rem;
    background: var(--text-secondary);
    transition: all var(--transition-normal);
  }

  @media (max-width: 768px) {
    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background: var(--header-background);
      backdrop-filter: blur(var(--blur-amount));
      padding: var(--spacing-card);
      border-bottom: 1px solid var(--header-border);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all var(--transition-normal);
    }

    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .menu-toggle {
      display: flex;
    }

    .menu-toggle.open .hamburger:nth-child(1) {
      transform: rotate(45deg) translate(0.375rem, 0.375rem);
    }

    .menu-toggle.open .hamburger:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle.open .hamburger:nth-child(3) {
      transform: rotate(-45deg) translate(0.375rem, -0.375rem);
    }
  }
</style>