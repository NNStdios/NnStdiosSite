<script lang="ts">
  import { onMount } from 'svelte';
  import { siteConfig } from './config/site';
  import { themeConfig } from './config/theme';
  import Router, { location } from 'svelte-spa-router';

  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Home from './lib/components/Home.svelte';
  import ProjectDetail from './lib/components/ProjectDetail.svelte';

  const routes = {
    '/': Home,
    '/project/:id': ProjectDetail
  };

  location.subscribe(() => {
    window.scrollTo(0, 0);
  });

  onMount(() => {
    const fontAwesome = document.createElement('link');
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    fontAwesome.rel = 'stylesheet';
    document.head.appendChild(fontAwesome);

    if (siteConfig.font.url) {
      const link = document.createElement('link');
      link.href = siteConfig.font.url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (siteConfig.font.file) {
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Maple Mono';
          src: url('${siteConfig.font.file}') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    }

    document.documentElement.style.setProperty('--primary-color', themeConfig.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', themeConfig.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', themeConfig.colors.accent);
    document.documentElement.style.setProperty('--accent-light', themeConfig.colors.accentLight);
    document.documentElement.style.setProperty('--background-color', themeConfig.colors.background);
    document.documentElement.style.setProperty('--surface-color', themeConfig.colors.surface);
    document.documentElement.style.setProperty('--surface-hover', themeConfig.colors.surfaceHover);
    document.documentElement.style.setProperty('--border-color', themeConfig.colors.border);
    document.documentElement.style.setProperty('--border-light', themeConfig.colors.borderLight);
    document.documentElement.style.setProperty('--text-primary', themeConfig.colors.text.primary);
    document.documentElement.style.setProperty('--text-secondary', themeConfig.colors.text.secondary);
    document.documentElement.style.setProperty('--text-muted', themeConfig.colors.text.muted);
    document.documentElement.style.setProperty('--text-on-primary', themeConfig.colors.text.onPrimary);
    document.documentElement.style.setProperty('--scrollbar-track', themeConfig.colors.scrollbar.track);
    document.documentElement.style.setProperty('--scrollbar-thumb', themeConfig.colors.scrollbar.thumb);
    document.documentElement.style.setProperty('--scrollbar-thumb-hover', themeConfig.colors.scrollbar.thumbHover);
    document.documentElement.style.setProperty('--header-background', themeConfig.colors.header.background);
    document.documentElement.style.setProperty('--header-border', themeConfig.colors.header.border);
    document.documentElement.style.setProperty('--button-primary', themeConfig.colors.button.primary);
    document.documentElement.style.setProperty('--button-primary-hover', themeConfig.colors.button.primaryHover);
    document.documentElement.style.setProperty('--button-secondary', themeConfig.colors.button.secondary);
    document.documentElement.style.setProperty('--button-secondary-hover', themeConfig.colors.button.secondaryHover);
    document.documentElement.style.setProperty('--gradient-primary', themeConfig.colors.gradient.primary);
    document.documentElement.style.setProperty('--gradient-secondary', themeConfig.colors.gradient.secondary);
    document.documentElement.style.setProperty('--border-radius-small', themeConfig.borderRadius.small);
    document.documentElement.style.setProperty('--border-radius-medium', themeConfig.borderRadius.medium);
    document.documentElement.style.setProperty('--border-radius-large', themeConfig.borderRadius.large);
    document.documentElement.style.setProperty('--border-radius-xlarge', themeConfig.borderRadius.xlarge);
    document.documentElement.style.setProperty('--border-radius-full', themeConfig.borderRadius.full);
    document.documentElement.style.setProperty('--spacing-section', themeConfig.spacing.section);
    document.documentElement.style.setProperty('--spacing-card', themeConfig.spacing.card);
    document.documentElement.style.setProperty('--spacing-element', themeConfig.spacing.element);
    document.documentElement.style.setProperty('--spacing-small', themeConfig.spacing.small);
    document.documentElement.style.setProperty('--spacing-large', themeConfig.spacing.large);
    document.documentElement.style.setProperty('--transition-fast', themeConfig.transitions.fast);
    document.documentElement.style.setProperty('--transition-normal', themeConfig.transitions.normal);
    document.documentElement.style.setProperty('--transition-slow', themeConfig.transitions.slow);
    document.documentElement.style.setProperty('--profile-pulse-intensity', themeConfig.effects.profilePulseIntensity.toString());
    document.documentElement.style.setProperty('--hover-scale', themeConfig.effects.hoverScale.toString());
    document.documentElement.style.setProperty('--shadow-small', themeConfig.effects.shadowSmall);
    document.documentElement.style.setProperty('--shadow-medium', themeConfig.effects.shadowMedium);
    document.documentElement.style.setProperty('--shadow-large', themeConfig.effects.shadowLarge);
    document.documentElement.style.setProperty('--blur-amount', themeConfig.effects.blurAmount);
    document.documentElement.style.setProperty('--header-height', themeConfig.header.height);
    document.documentElement.style.setProperty('--header-padding', themeConfig.header.padding);
    document.documentElement.style.setProperty('--header-logo-size', themeConfig.header.logoSize);
    document.documentElement.style.setProperty('--font-size-small', themeConfig.typography.fontSize.small);
    document.documentElement.style.setProperty('--font-size-base', themeConfig.typography.fontSize.base);
    document.documentElement.style.setProperty('--font-size-large', themeConfig.typography.fontSize.large);
    document.documentElement.style.setProperty('--font-size-xlarge', themeConfig.typography.fontSize.xlarge);
    document.documentElement.style.setProperty('--font-size-xxlarge', themeConfig.typography.fontSize.xxlarge);
    document.documentElement.style.setProperty('--font-size-hero', themeConfig.typography.fontSize.hero);
    document.documentElement.style.setProperty('--font-weight-normal', themeConfig.typography.fontWeight.normal);
    document.documentElement.style.setProperty('--font-weight-medium', themeConfig.typography.fontWeight.medium);
    document.documentElement.style.setProperty('--font-weight-semibold', themeConfig.typography.fontWeight.semibold);
    document.documentElement.style.setProperty('--font-weight-bold', themeConfig.typography.fontWeight.bold);
    document.documentElement.style.setProperty('--line-height-tight', themeConfig.typography.lineHeight.tight);
    document.documentElement.style.setProperty('--line-height-normal', themeConfig.typography.lineHeight.normal);
    document.documentElement.style.setProperty('--line-height-relaxed', themeConfig.typography.lineHeight.relaxed);
    document.documentElement.style.setProperty('--font-family', siteConfig.font.family);

    document.title = `${siteConfig.name} - ${siteConfig.description}`;
  });
</script>

<Header />
<main>
  <Router {routes} />
</main>
<Footer />

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    font-family: var(--font-family, 'Inter', system-ui, sans-serif);
    background: var(--background-color);
    color: var(--text-secondary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(::-webkit-scrollbar) {
    width: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: var(--scrollbar-track);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: var(--scrollbar-thumb);
    border-radius: var(--border-radius-small);
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: var(--scrollbar-thumb-hover);
  }

  main {
    padding-top: var(--header-height);
  }
</style>