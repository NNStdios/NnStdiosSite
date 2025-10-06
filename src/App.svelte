<script lang="ts">
  import { onMount } from 'svelte';
  import { siteConfig } from './config/site';
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

    document.documentElement.style.setProperty('--primary-color', siteConfig.theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', siteConfig.theme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', siteConfig.theme.accentColor);
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
    background: #0F172A;
    color: #E2E8F0;
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
    background: #1E293B;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: #60A5FA;
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: #3B82F6;
  }

  main {
    padding-top: 80px;
  }
</style>