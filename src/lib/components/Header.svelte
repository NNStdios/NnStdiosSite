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
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  }

  .nav {
    padding: 1rem 2rem;
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-link {
    background: none;
    border: none;
    color: #E2E8F0;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-link:hover {
    color: #60A5FA;
    transform: translateY(-2px);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    transition: all 0.3s ease;
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
    padding: 0.5rem;
  }

  .hamburger {
    width: 1.5rem;
    height: 0.125rem;
    background: #E2E8F0;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background: rgba(15, 23, 42, 0.98);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-bottom: 1px solid rgba(59, 130, 246, 0.2);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
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