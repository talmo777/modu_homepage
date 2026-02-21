import { projects } from './projects.js';
import { members } from './members.js';
import { departmentInfo } from './department.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    renderProjects('all');
    renderMembers();
    renderDepartment();
    initProjectFilters();
    initForms();
});

// Navigation & Mobile Menu
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "우리는 데이터로 더 나은 세상을 만듭니다.",
        "직관을 넘어선 수학적 분석과 추론.",
        "주변의 작은 문제에서 시작되는 거대한 혁신.",
        "모두를 위한 데이터 사이언스 연구소."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingDelay = 500; // Pause before next phrase
        }

        setTimeout(type, typingDelay);
    }

    setTimeout(type, 1000);
}

// Canvas Particles (Data Viz style)
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.connections = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(79, 110, 247, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79, 110, 247, ${0.15 - distance / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Scroll Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
        observer.observe(el);
    });
}

// Render Projects
function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = ''; // Clear current

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.status === filter);

    filtered.forEach((project, index) => {
        const delayClass = `stagger-${(index % 4) + 1}`;

        // Status Badge Color
        let statusColor, statusText;
        if (project.status === 'ongoing') { statusColor = '#3b82f6'; statusText = '진행중'; }
        else if (project.status === 'completed') { statusColor = '#10b981'; statusText = '완료'; }
        else { statusColor = '#8b5cf6'; statusText = '예정'; }

        const card = document.createElement('div');
        card.className = `glass-card reveal-up ${delayClass}`;
        card.style.padding = '0';
        card.style.overflow = 'hidden';
        card.style.cursor = 'pointer';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';

        card.innerHTML = `
      <div style="height: 200px; overflow: hidden; position: relative;">
        <img src="${project.thumbnail}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" class="card-img">
        <div style="position: absolute; top: 1rem; right: 1rem; background: ${statusColor}; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
          ${statusText}
        </div>
      </div>
      <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
        <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${project.category}</div>
        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; line-height: 1.4;">${project.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1;">${project.summary}</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${project.tags.map(tag => `<span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; color: #cbd5e1;">#${tag}</span>`).join('')}
        </div>
      </div>
    `;

        // Hover effect for image
        card.addEventListener('mouseenter', () => {
            card.querySelector('.card-img').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-img').style.transform = 'scale(1)';
        });

        // Click to open modal
        card.addEventListener('click', () => openProjectModal(project, statusColor, statusText));

        grid.appendChild(card);
    });

    // Re-trigger observer for new elements
    setTimeout(() => initScrollAnimations(), 50);
}

// Project Modal Logic
function openProjectModal(project, statusColor, statusText) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalContentArea = document.getElementById('modal-content-area');

    modalBody.innerHTML = `
    <div style="width: 100%; height: 300px; border-radius: 12px; overflow: hidden; margin-bottom: 2rem;">
      <img src="${project.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <span style="background: ${statusColor}; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${statusText}</span>
      <span style="color: var(--text-secondary);">${project.date}</span>
    </div>
    <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">${project.title}</h2>
    <div style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 1.1rem; margin-bottom: 2rem;">
      ${project.description.replace(/\n/g, '<br>')}
    </div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      ${project.tags.map(tag => `<span style="background: rgba(79, 110, 247, 0.1); border: 1px solid var(--accent-blue); color: #a5b4fc; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem;">#${tag}</span>`).join('')}
    </div>
  `;

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modalContentArea.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden'; // Prevent bg scrolling
}

// Close modal handlers
document.getElementById('close-modal').addEventListener('click', closeProjectModal);
document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeProjectModal();
});

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContentArea = document.getElementById('modal-content-area');

    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modalContentArea.style.transform = 'translateY(20px)';
    document.body.style.overflow = 'auto';
}

// Filter Logic
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('#project-filters button');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('active-filter');
                b.style.borderColor = 'var(--border-light)';
                b.style.background = 'transparent';
            });
            // Add to clicked
            const target = e.target;
            target.classList.add('active-filter');
            target.style.borderColor = 'var(--accent-blue)';
            target.style.background = 'rgba(79, 110, 247, 0.1)';

            const filter = target.getAttribute('data-filter');

            // Animate out
            const grid = document.getElementById('projects-grid');
            grid.style.opacity = '0';
            grid.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                renderProjects(filter);
                grid.style.opacity = '1';
            }, 300);
        });
    });
}

// Render Members
function renderMembers() {
    const grid = document.getElementById('members-grid');
    grid.innerHTML = '';

    members.forEach((member, index) => {
        const delayClass = `stagger-${(index % 4) + 1}`;

        const card = document.createElement('div');
        card.className = `flip-card reveal-up ${delayClass}`;
        card.style.height = '350px';

        card.innerHTML = `
      <div class="flip-card-inner">
        <!-- Front -->
        <div class="flip-card-front glass-card" style="padding: 0; display: flex; flex-direction: column;">
          <div style="height: 60%; overflow: hidden;">
            <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%);">
          </div>
          <div style="padding: 1.5rem; text-align: left;">
            <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">${member.role}</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.2rem;">${member.name}</h3>
            <div style="color: var(--text-secondary); font-size: 0.9rem;">${member.major}</div>
          </div>
        </div>
        
        <!-- Back -->
        <div class="flip-card-back">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">${member.name}</h3>
          <div style="width: 40px; height: 2px; background: var(--accent-purple); margin-bottom: 1.5rem;"></div>
          <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.7; text-align: center;">
            "${member.description}"
          </p>
        </div>
      </div>
    `;

        grid.appendChild(card);
    });
}

// Render Department Info
function renderDepartment() {
    const container = document.getElementById('department-container');

    let professorsHtml = departmentInfo.professors.map((prof, index) => `
    <div class="glass-card reveal-up stagger-${index + 1}" style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem;">
      <img src="${prof.image}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-light);">
      <div>
        <h4 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${prof.name}</h4>
        <div style="color: var(--accent-purple); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${prof.title}</div>
        <div style="font-size: 0.8rem; color: #a5b4fc; margin-bottom: 0.5rem; background: rgba(79, 110, 247, 0.1); display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px;">연구분야: ${prof.research}</div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${prof.description}</p>
      </div>
    </div>
  `).join('');

    container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
      <div class="reveal-fade">
        <h2 class="section-title" style="font-size: 2rem;">${departmentInfo.title}</h2>
        <div style="width: 60px; height: 3px; background: linear-gradient(90deg, var(--accent-blue), transparent); margin-bottom: 2rem;"></div>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">
          ${departmentInfo.description}
        </p>
        <a href="${departmentInfo.url}" target="_blank" class="btn btn-outline" style="border-color: var(--accent-purple);">
          <i class="ri-external-link-line" style="margin-right: 0.5rem;"></i> 학과 홈페이지 방문
        </a>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${professorsHtml}
      </div>
    </div>
  `;

    // Mobile responsive layout adjustment
    if (window.innerWidth <= 992) {
        container.querySelector('div').style.gridTemplateColumns = '1fr';
    }
}

// Form Handlers
function initForms() {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('제안이 성공적으로 전송되었습니다. 검토 후 연락드리겠습니다.');
        e.target.reset();
    });

    document.getElementById('apply-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('지원이 완료되었습니다! 연구소의 문은 언제나 열려있습니다. 조만간 연락드리겠습니다.');
        e.target.reset();
    });
}
