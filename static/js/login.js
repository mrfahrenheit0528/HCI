(() => {
  const initAuth = () => {
    // Toggle logic removed as mode toggle is gone

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
          // Redirect to home page
          window.location.href = "orus_home.html";
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
