// Disable developer tools
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

// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Progress bar animation
document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.skill-progress');
  progressBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = finalWidth;
    }, 500);
  });
});

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
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
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a.nav-link, a.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        
        const hash = this.hash;
        const target = document.querySelector(hash);
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
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

  // Contact form handling - IMPROVED VERSION
  const contactForm = document.querySelector('#contact-form');
  
  // Utility functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function displayError(field, message) {
    removeError(field); // Remove any existing error first
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
      color: #e74c3c;
      font-size: 14px;
      margin-top: 5px;
      font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
  }

  function removeError(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
    field.style.borderColor = '';
  }

  function showFormStatus(message, isSuccess = true) {
    let formStatus = document.querySelector('#form-status');
    if (!formStatus) {
      formStatus = document.createElement('div');
      formStatus.id = 'form-status';
      contactForm.parentNode.insertBefore(formStatus, contactForm.nextSibling);
    }
    
    const className = isSuccess ? 'alert-success' : 'alert-error';
    const bgColor = isSuccess ? '#d4edda' : '#f8d7da';
    const textColor = isSuccess ? '#155724' : '#721c24';
    
    formStatus.innerHTML = `
      <div class="alert ${className}" style="
        background: ${bgColor}; 
        color: ${textColor}; 
        padding: 15px; 
        border-radius: 5px; 
        margin-top: 15px;
        border: 1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'};
      ">
        ${message}
      </div>
    `;
    
    // Clear message after 6 seconds
    setTimeout(() => {
      if (formStatus) {
        formStatus.innerHTML = '';
      }
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form elements
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Validation
      let valid = true;
      
      // Clear previous errors
      removeError(name);
      removeError(email);
      removeError(message);
      
      // Validate name
      if (!name.value.trim()) {
        valid = false;
        displayError(name, 'Please enter your name');
      }
      
      // Validate email
      if (!email.value.trim()) {
        valid = false;
        displayError(email, 'Please enter your email');
      } else if (!isValidEmail(email.value.trim())) {
        valid = false;
        displayError(email, 'Please enter a valid email address');
      }
      
      // Validate message
      if (!message.value.trim()) {
        valid = false;
        displayError(message, 'Please enter your message');
      } else if (message.value.trim().length < 10) {
        valid = false;
        displayError(message, 'Message must be at least 10 characters long');
      }
      
      if (!valid) {
        return;
      }
      
      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;
      
      try {
        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Log for debugging
        console.log('Submitting form to:', contactForm.action);
        console.log('Form data:', {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        });
        
        // Submit to Formspree
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          // Success
          showFormStatus('✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!', true);
          contactForm.reset();
        } else {
          // Handle different error types
          let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
          
          try {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            
            if (errorData.errors && errorData.errors.length > 0) {
              errorMessage = `Error: ${errorData.errors[0].message}`;
            }
          } catch (parseError) {
            console.log('Could not parse error response');
          }
          
          if (response.status === 422) {
            errorMessage = 'Please check your form data and try again.';
          } else if (response.status === 429) {
            errorMessage = 'Too many requests. Please wait a moment and try again.';
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again in a few minutes.';
          }
          
          showFormStatus(`❌ ${errorMessage}`, false);
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('❌ Network error. Please check your connection and try again.', false);
      } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
    
    // Real-time validation
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const messageField = document.querySelector('#message');
    
    if (nameField) {
      nameField.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 2) {
          displayError(this, 'Name must be at least 2 characters');
        } else if (this.value.trim()) {
          removeError(this);
        }
      });
    }
    
    if (emailField) {
      emailField.addEventListener('blur', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
          displayError(this, 'Please enter a valid email address');
        } else if (this.value.trim()) {
          removeError(this);
        }
      });
    }
    
    if (messageField) {
      messageField.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 10) {
          displayError(this, 'Message must be at least 10 characters');
        } else if (this.value.trim()) {
          removeError(this);
        }
      });
    }
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

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
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
  }
});

// Close mobile menu on scroll
window.addEventListener("scroll", () => {
  const toggle = document.getElementById("toggle-menu");
  if (toggle && toggle.checked) {
    toggle.checked = false;
  }
});

// Add form validation styles
const formStyles = `
  .error-message {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .form-group input.error,
  .form-group textarea.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 5px rgba(231, 76, 60, 0.3);
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = formStyles;
document.head.appendChild(styleSheet);