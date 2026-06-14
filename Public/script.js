document.addEventListener('contextmenu', event => event.preventDefault());

const formStyles = `
  .error-message {
    animation: fadeIn 0.3s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .form-group input.error,
  .form-group textarea.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 5px rgba(231, 76, 60, 0.3);
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = formStyles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00d9ff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00d9ff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }

  // ── Skill Progress Bars ───────────────────
  const progressBars = document.querySelectorAll('.skill-progress');
  progressBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = finalWidth; }, 500);
  });

  // ── Smooth Scroll ─────────────────────────
  document.querySelectorAll('a.nav-link, a.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // ── Mobile Nav Toggle ─────────────────────
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navbar');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // ── Close mobile menu on scroll ───────────
  window.addEventListener("scroll", () => {
    const toggle = document.getElementById("toggle-menu");
    if (toggle && toggle.checked) toggle.checked = false;
  });

  // ── Back to Top Button ────────────────────
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      backToTopButton.classList.toggle('active', window.scrollY > 300);
    });
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Navbar scroll effect ──────────────────
  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Contact Form ──────────────────────────
  const contactForm = document.querySelector('#contact-form');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function displayError(field, message) {
    removeError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color:#e74c3c;font-size:14px;margin-top:5px;font-weight:500;';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
  }

  function removeError(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
    field.style.borderColor = '';
  }

  function showFormStatus(message, isSuccess = true) {
    let formStatus = document.querySelector('#form-status');
    if (!formStatus) {
      formStatus = document.createElement('div');
      formStatus.id = 'form-status';
      contactForm.parentNode.insertBefore(formStatus, contactForm.nextSibling);
    }
    const bgColor   = isSuccess ? '#d4edda' : '#f8d7da';
    const textColor = isSuccess ? '#155724' : '#721c24';
    const border    = isSuccess ? '#c3e6cb' : '#f5c6cb';
    formStatus.innerHTML = `
      <div style="background:${bgColor};color:${textColor};padding:15px;
        border-radius:5px;margin-top:15px;border:1px solid ${border};">
        ${message}
      </div>`;
    setTimeout(() => { if (formStatus) formStatus.innerHTML = ''; }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name      = document.querySelector('#name');
      const email     = document.querySelector('#email');
      const message   = document.querySelector('#message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      removeError(name);
      removeError(email);
      removeError(message);

      let valid = true;
      if (!name.value.trim()) {
        displayError(name, 'Please enter your name'); valid = false;
      }
      if (!email.value.trim()) {
        displayError(email, 'Please enter your email'); valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        displayError(email, 'Please enter a valid email address'); valid = false;
      }
      if (!message.value.trim()) {
        displayError(message, 'Please enter your message'); valid = false;
      } else if (message.value.trim().length < 10) {
        displayError(message, 'Message must be at least 10 characters long'); valid = false;
      }
      if (!valid) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showFormStatus("✅ Thank you! Your message has been sent successfully. I'll get back to you soon!", true);
          contactForm.reset();
        } else {
          let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
          try {
            const errorData = await response.json();
            if (errorData.errors?.length > 0) errorMessage = `Error: ${errorData.errors[0].message}`;
          } catch (_) {}
          if (response.status === 422) errorMessage = 'Please check your form data and try again.';
          else if (response.status === 429) errorMessage = 'Too many requests. Please wait a moment and try again.';
          else if (response.status >= 500) errorMessage = 'Server error. Please try again in a few minutes.';
          showFormStatus(`❌ ${errorMessage}`, false);
        }
      } catch (error) {
        showFormStatus('🥲 Network error. Please check your connection and try again.', false);
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
    
    const nameField    = document.querySelector('#name');
    const emailField   = document.querySelector('#email');
    const messageField = document.querySelector('#message');

    nameField?.addEventListener('blur', function() {
      if (this.value.trim() && this.value.trim().length < 2) displayError(this, 'Name must be at least 2 characters');
      else if (this.value.trim()) removeError(this);
    });

    emailField?.addEventListener('blur', function() {
      if (this.value.trim() && !isValidEmail(this.value.trim())) displayError(this, 'Please enter a valid email address');
      else if (this.value.trim()) removeError(this);
    });

    messageField?.addEventListener('blur', function() {
      if (this.value.trim() && this.value.trim().length < 10) displayError(this, 'Message must be at least 10 characters');
      else if (this.value.trim()) removeError(this);
    });
  }

});