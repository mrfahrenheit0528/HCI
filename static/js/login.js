(() => {
  const initAuth = () => {
    const toggleBtns = document.querySelectorAll("[data-auth-toggle]");
    const loginContent = document.getElementById("login-content");
    const signupContent = document.getElementById("signup-content");

    if (!toggleBtns || !loginContent || !signupContent) return;

    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-auth-toggle");

        // Update buttons
        toggleBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        // Update content
        if (mode === "login") {
          loginContent.classList.add("is-active");
          signupContent.classList.remove("is-active");
        } else {
          loginContent.classList.remove("is-active");
          signupContent.classList.add("is-active");
        }
      });
    });

    // Handle form submissions (mock)
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerHTML = `<span class="inline-block animate-spin mr-2">◌</span> Processing...`;

        setTimeout(() => {
          btn.disabled = false;
          btn.innerText = originalText;
          alert("This is a demo. Authentication is not implemented yet.");
        }, 1500);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }
})();
