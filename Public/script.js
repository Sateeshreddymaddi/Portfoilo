document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Form Validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill out all fields.";
      status.style.color = "red";
      return;
    }

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = "Invalid email address.";
      status.style.color = "red";
      return;
    }

    // Secure Form Submission via Fetch API
    const formData = new FormData(form);
    try {
      let response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset(); // Clear form fields
      } else {
        throw new Error("Server error. Try again later.");
      }
    } catch (error) {
      status.textContent = error.message;
      status.style.color = "red";
    }
  });

  // Smooth Scroll Animation for Sections
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        } else {
          entry.target.style.opacity = 0;
          entry.target.style.transform = "translateY(50px)";
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });
});
