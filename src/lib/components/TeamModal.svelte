<script lang="ts">
  import { type TeamMember } from '../../config/site';
  import { siteConfig } from '../../config/site';
  import { onMount, onDestroy } from 'svelte';

  export let member: TeamMember;
  export let onClose: () => void;

  onMount(() => {
    document.body.style.overflow = 'hidden';
  });

  onDestroy(() => {
    document.body.style.overflow = '';
  });

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return 'fab fa-github';
      case 'linkedin': return 'fab fa-linkedin';
      case 'twitter': return 'fab fa-twitter';
      case 'artstation': return 'fab fa-artstation';
      case 'instagram': return 'fab fa-instagram';
      case 'soundcloud': return 'fab fa-soundcloud';
      case 'music': return 'fas fa-music';
      case 'palette': return 'fas fa-palette';
      default: return 'fas fa-link';
    }
  };

  const getProjectName = (projectId: string) => {
    const project = siteConfig.projects.find(p => p.id === projectId);
    return project ? project.title : projectId;
  };
</script>

<div class="modal-backdrop" on:click={handleBackdropClick} role="presentation">
  <div class="modal">
    <button class="close-button" on:click={onClose}>×</button>
    
    <div class="modal-header">
      <div class="member-avatar">
        <img src={member.avatar} alt={member.name} />
      </div>
      <div class="member-basic">
        <h2 class="member-name">{member.name}</h2>
        <p class="member-role">{member.role}</p>
        <div class="social-links">
          {#each member.social as social}
            <a href={social.url} target="_blank" rel="noopener noreferrer" class="social-link">
              <i class="{getIcon(social.icon)} social-icon"></i>
              <span class="social-name">{social.name}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div class="modal-content">
      <div class="modal-section">
        <h3>About</h3>
        <p>{member.bio}</p>
      </div>

      <div class="modal-section">
        <h3>Skills & Expertise</h3>
        <div class="skills-grid">
          {#each member.skills as skill}
            <span class="skill">{skill}</span>
          {/each}
        </div>
      </div>

      {#if member.projects && member.projects.length > 0}
        <div class="modal-section">
          <h3>Projects</h3>
          <div class="project-list">
            {#each member.projects as projectId}
              <span class="project-item">{getProjectName(projectId)}</span>
            {/each}
          </div>
        </div>
      {/if}

      {#if member.experience && member.experience.length > 0}
        <div class="modal-section">
          <h3>Experience</h3>
          <div class="experience-list">
            {#each member.experience as exp}
              <div class="experience-item">
                <div class="experience-header">
                  <h4 class="experience-title">{exp.title}</h4>
                  <span class="experience-period">{exp.period}</span>
                </div>
                {#if exp.company}
                  <p class="experience-company">{exp.company}</p>
                {/if}
                <p class="experience-description">{exp.description}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 2rem;
  }

  .modal {
    background: rgba(15, 23, 42, 0.95);
    border-radius: 1rem;
    max-width: 700px;
    max-height: 90vh;
    width: 100%;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(59, 130, 246, 0.3);
    backdrop-filter: blur(10px);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #E2E8F0;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .close-button:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #EF4444;
  }

  .modal-header {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    align-items: center;
  }

  .member-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(59, 130, 246, 0.3);
    flex-shrink: 0;
  }

  .member-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .member-basic {
    flex: 1;
  }

  .member-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #E2E8F0;
    margin: 0 0 0.5rem 0;
  }

  .member-role {
    color: #60A5FA;
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(59, 130, 246, 0.1);
    color: #60A5FA;
    text-decoration: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .social-link:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
  }

  .modal-content {
    padding: 2rem;
  }

  .modal-section {
    margin-bottom: 2rem;
  }

  .modal-section h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  .modal-section p {
    color: #CBD5E1;
    line-height: 1.6;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill {
    background: rgba(59, 130, 246, 0.2);
    color: #60A5FA;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .project-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-item {
    background: rgba(16, 185, 129, 0.2);
    color: #10B981;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .experience-list {
    space-y: 1.5rem;
  }

  .experience-item {
    background: rgba(59, 130, 246, 0.05);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(59, 130, 246, 0.1);
    margin-bottom: 1.5rem;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .experience-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #E2E8F0;
    margin: 0;
  }

  .experience-period {
    color: #9CA3AF;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .experience-company {
    color: #60A5FA;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
  }

  .experience-description {
    color: #CBD5E1;
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 768px) {
    .modal-backdrop {
      padding: 1rem;
    }

    .modal-header {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
    }

    .member-avatar {
      width: 80px;
      height: 80px;
    }

    .modal-content {
      padding: 1.5rem;
    }

    .experience-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>