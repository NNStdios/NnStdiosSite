<script lang="ts">
  import { siteConfig, type TeamMember } from '../../config/site';
  import TeamModal from './TeamModal.svelte';
  import { onMount } from 'svelte';

  let selectedMember: TeamMember | null = null;
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

    const section = document.getElementById('team');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });

  const openMember = (member: TeamMember) => {
    selectedMember = member;
  };

  const closeMember = () => {
    selectedMember = null;
  };
</script>

<section id="team" class="team">
  <div class="container" class:visible={isVisible}>
    <div class="section-header">
      <h2 class="section-title">Meet Our Team</h2>
      <p class="section-subtitle">The creative minds behind the magic</p>
    </div>

    <div class="team-grid">
      {#each siteConfig.team as member, i}
        <div
          class="team-card"
          on:click={() => openMember(member)}
          on:keydown={(e) => e.key === 'Enter' && openMember(member)}
          role="button"
          tabindex="0"
          style="animation-delay: {i * 0.1}s"
        >
          <div class="card-background"></div>

          <div class="member-avatar">
            <img src={member.avatar} alt={member.name} />
            <div class="avatar-ring"></div>
          </div>

          <div class="member-info">
            <h3 class="member-name">{member.name}</h3>
            <p class="member-role">{member.role}</p>
            <p class="member-bio">{member.bio}</p>

            <div class="member-skills">
              {#each member.skills.slice(0, 3) as skill}
                <span class="skill-tag">{skill}</span>
              {/each}
              {#if member.skills.length > 3}
                <span class="skill-more">+{member.skills.length - 3}</span>
              {/if}
            </div>

            <div class="social-links">
              {#each member.social as social}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-icon"
                  on:click={(e) => e.stopPropagation()}
                  aria-label={social.name}
                >
                  <i class={`fab fa-${social.icon}`}></i>
                </a>
              {/each}
            </div>
          </div>

          <div class="card-footer">
            <span class="view-profile-text">View Full Profile</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

{#if selectedMember}
  <TeamModal member={selectedMember} onClose={closeMember} />
{/if}

<style>
  .team {
    padding: 5rem 2rem;
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
    font-size: 1.2rem;
    color: #64748B;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .team-card {
    position: relative;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 1.5rem;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out both;
    display: flex;
    flex-direction: column;
  }

  .team-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3B82F6, #60A5FA);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  .team-card:hover::before {
    transform: scaleX(1);
  }

  .card-background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .team-card:hover .card-background {
    opacity: 1;
  }

  .team-card:hover {
    transform: translateY(-8px);
    border-color: rgba(96, 165, 250, 0.4);
    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.25);
  }

  .member-avatar {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
  }

  .member-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
    transition: transform 0.4s ease;
  }

  .team-card:hover .member-avatar img {
    transform: scale(1.05);
  }

  .avatar-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .team-card:hover .avatar-ring {
    opacity: 1;
    animation: pulse-ring 2s infinite;
  }

  @keyframes pulse-ring {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.3;
    }
  }

  .member-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .member-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #F8FAFC;
    margin: 0 0 0.5rem 0;
  }

  .member-role {
    font-size: 0.95rem;
    color: #60A5FA;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .member-bio {
    font-size: 0.9rem;
    color: #94A3B8;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    flex: 1;
    min-height: 3em;
  }

  .member-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .skill-tag {
    padding: 0.4rem 0.8rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #60A5FA;
  }

  .skill-more {
    padding: 0.4rem 0.8rem;
    background: rgba(96, 165, 250, 0.15);
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
  }

  .social-links {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 50%;
    color: #60A5FA;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .social-icon:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: #60A5FA;
    transform: translateY(-3px);
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(59, 130, 246, 0.1);
    color: #94A3B8;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .team-card:hover .card-footer {
    color: #60A5FA;
  }

  .card-footer i {
    transition: transform 0.3s ease;
  }

  .team-card:hover .card-footer i {
    transform: translateX(5px);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .team {
      padding: 6rem 1.5rem;
    }

    .team-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
