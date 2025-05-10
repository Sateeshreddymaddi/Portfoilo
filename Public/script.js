document.onkeydown = function(e) {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && e.key === 'I') || 
    (e.ctrlKey && e.shiftKey && e.key === 'J') || 
    (e.ctrlKey && e.key === 'U')
  ) {
    return false;
  }
};
// document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('DOMContentLoaded', function() {
  // Initialize progress bars to 0% width
  const progressBars = document.querySelectorAll('.skill-progress');
  progressBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0';
    
    // Simple timeout to animate them after page load
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 500);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Initialize particles.js
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#00d9ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00d9ff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a.nav-link, a.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        
        const hash = this.hash;
        
        window.scrollTo({
          top: document.querySelector(hash).offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navbar');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Handle form submissions
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validation logic
      let valid = true;
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');
      
      if (!name.value.trim()) {
        valid = false;
        displayError(name, 'Please enter your name');
      } else {
        removeError(name);
      }
      
      if (!email.value.trim()) {
        valid = false;
        displayError(email, 'Please enter your email');
      } else if (!isValidEmail(email.value)) {
        valid = false;
        displayError(email, 'Please enter a valid email');
      } else {
        removeError(email);
      }
      
      if (!message.value.trim()) {
        valid = false;
        displayError(message, 'Please enter your message');
      } else {
        removeError(message);
      }
      
      if (valid) {
        // Here you would typically handle the form submission via AJAX
        // For now, just display a success message
        const formStatus = document.querySelector('#form-status');
        formStatus.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent.</div>';
        
        // Reset form
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      }
    });
  }

  // Helper functions
  function displayError(input, message) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
      errorDiv.textContent = message;
    } else {
      const div = document.createElement('div');
      div.className = 'error-message';
      div.textContent = message;
      input.parentNode.insertBefore(div, input.nextSibling);
    }
    input.classList.add('error');
  }

  function removeError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
      errorDiv.textContent = '';
    }
    input.classList.remove('error');
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Portfolio filters
  const portfolioFilters = document.querySelectorAll('#portfolio-filters li');
  if (portfolioFilters.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        portfolioFilters.forEach(item => {
          item.classList.remove('filter-active');
        });
        
        this.classList.add('filter-active');
        
        const filterValue = this.getAttribute('data-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  // Show/hide the button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  // Smooth scroll to top when clicked
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

window.addEventListener("scroll", () => {
  const toggle = document.getElementById("toggle-menu");
  if (toggle.checked) {
    toggle.checked = false;
  }
});