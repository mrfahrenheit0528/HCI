function openModal(service) {
  const modal = document.getElementById("service-modal");
  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-desc");
  const iconContainer = document.getElementById("modal-icon-container");

  // Reset content
  iconContainer.innerHTML = "";
  iconContainer.className = "tin-modal-icon-container";

  if (service === "tin") {
    title.innerText = "TIN Verification";
    desc.innerText =
      "Verify the validity of a Taxpayer Identification Number (TIN) to ensure it is active and officially registered with the BIR.";
    iconContainer.classList.add("blue");
    iconContainer.innerHTML = `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`;
  } else if (service === "business") {
    title.innerText = "Business Search";
    desc.innerText =
      "Search for officially registered businesses or trade names and check their taxpayer classification for transparency and security.";
    iconContainer.classList.add("amber");
    iconContainer.innerHTML = `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`;
  }

  modal.classList.remove("hidden-modal");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("service-modal");
  modal.classList.add("hidden-modal");
  document.body.style.overflow = "auto";
}

// Close on backdrop click
document
  .getElementById("service-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
