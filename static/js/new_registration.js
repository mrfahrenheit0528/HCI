// Global State
let currentCategory = null; // 'individual' or 'non-individual'

// Data Configuration
const userTypes = {
  individual: [
    { value: "prof", label: "Register a Business as Professional" },
    { value: "single", label: "Register a Business as Single Proprietorship" },
    { value: "foreign", label: "Get TIN for Foreign National" },
    { value: "eo98", label: "Get TIN for Filipino Citizen - E.O. 98" },
    { value: "ofw", label: "Get TIN for Overseas Filipino Worker (OFW)" },
  ],
  "non-individual": [
    { value: "corp", label: "Corporation" },
    { value: "partner", label: "Partnership" },
    { value: "lgu", label: "Local Government Unit (LGU)" },
    { value: "coop", label: "Cooperative" },
  ],
};

const formTemplates = {
  individual: `
                <h3 class="font-bold text-slate-800 mb-4 border-l-4 border-[#03297b] pl-3 text-lg">Personal Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">First Name *</label>
                        <input type="text" required class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm">
                    </div>
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Middle Name</label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" class="custom-checkbox w-3 h-3 border border-slate-300" onchange="toggleMiddleName(this)">
                                <span class="text-[9px] uppercase font-bold text-slate-400">None</span>
                            </label>
                        </div>
                        <input type="text" id="middleNameInput" class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm disabled:bg-slate-100 disabled:opacity-50">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Last Name *</label>
                        <input type="text" required class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Suffix</label>
                        <select class="w-full appearance-none border-2 border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-4 py-3 pr-10 focus:border-blue-700 outline-none bg-white">
                            <option value="">None</option><option>Jr.</option><option>Sr.</option><option>II</option><option>III</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Date of Birth *</label>
                        <input type="date" required class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none text-slate-700">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Sex *</label>
                        <div class="flex gap-4 pt-2">
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="sex" required class="custom-radio">
                                <span class="text-sm font-bold text-slate-700 group-hover:text-blue-700">Male</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="sex" required class="custom-radio">
                                <span class="text-sm font-bold text-slate-700 group-hover:text-blue-700">Female</span>
                            </label>
                        </div>
                    </div>
                </div>
            `,
  "non-individual": `
                <h3 class="font-bold text-slate-800 mb-4 border-l-4 border-[#03297b] pl-3 text-lg">Organization Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Registered Name *</label>
                        <input type="text" placeholder="As it appears on official SEC/DTI documents" required class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Date of Incorporation/Creation *</label>
                        <input type="date" required class="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm font-medium focus:border-blue-700 focus:ring-4 focus:ring-blue-100 outline-none text-slate-700">
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Country of Residence/Operations *</label>
                        <select required class="w-full appearance-none border-2 border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-4 py-3 pr-10 focus:border-blue-700 outline-none bg-white">
                            <option value="PH" selected>Philippines</option>
                            <option value="US">United States</option>
                            <option value="JP">Japan</option>
                            <!-- other countries -->
                        </select>
                    </div>
                </div>
            `,
};

// --- STEP 1: CATEGORY SELECTION ---
function selectCategory(category) {
  currentCategory = category;

  // Visual Update for selection
  document
    .getElementById("card-individual")
    .classList.remove("border-blue-700", "shadow-lg");
  document
    .getElementById("card-non-individual")
    .classList.remove("border-blue-700", "shadow-lg");

  const activeCard = document.getElementById(`card-${category}`);
  activeCard.classList.add("border-blue-700", "shadow-lg");

  // Show Requirements smoothly
  document.getElementById("reqs-individual").classList.add("hidden");
  document.getElementById("reqs-non-individual").classList.add("hidden");
  document.getElementById(`reqs-${category}`).classList.remove("hidden");

  // Trigger Modal after a tiny delay so user sees selection
  setTimeout(() => {
    openModal();
  }, 600);
}

// --- MODAL LOGIC (TOS) ---
function openModal() {
  const modal = document.getElementById("tos-modal");
  modal.classList.remove("hidden-modal");

  // Auto check if scrolled to bottom
  const content = document.getElementById("tos-content");
  content.addEventListener("scroll", function () {
    if (content.scrollTop + content.clientHeight >= content.scrollHeight - 10) {
      // user scrolled to bottom
    }
  });

  // Reset state
  const cb = document.getElementById("tos-checkbox");
  cb.checked = false;
  toggleAgreeBtn();
}

function closeModal() {
  document.getElementById("tos-modal").classList.add("hidden-modal");
}

function toggleAgreeBtn() {
  const cb = document.getElementById("tos-checkbox");
  const btn = document.getElementById("btn-agree");
  btn.disabled = !cb.checked;
}

function acceptTOS() {
  closeModal();
  prepareStep2();
  goToStep(2);
}

// --- STEP 2 LOGIC ---
function prepareStep2() {
  // Populate Dropdown
  const select = document.getElementById("user-type-select");
  select.innerHTML =
    '<option value="" disabled selected>-- Select Transaction Type --</option>';

  userTypes[currentCategory].forEach((opt) => {
    const el = document.createElement("option");
    el.value = opt.value;
    el.innerText = opt.label;
    select.appendChild(el);
  });

  // Add listener to enable Step 2 Next button
  select.addEventListener("change", checkStep2Validity);
  const radios = document.querySelectorAll(
    'input[name="register_as"], input[name="tin_status"]',
  );
  radios.forEach((r) => r.addEventListener("change", checkStep2Validity));

  // Reset Dropdown logic
  toggleUserTypeDropdown();
}

function toggleUserTypeDropdown() {
  const noTinRadio = document.querySelector(
    'input[name="tin_status"][value="without_tin"]',
  );
  const dropdownContainer = document.getElementById("user-type-container");
  const select = document.getElementById("user-type-select");

  if (noTinRadio.checked) {
    dropdownContainer.classList.remove("is-disabled");
  } else {
    dropdownContainer.classList.add("is-disabled");
    select.value = ""; // clear
  }
  checkStep2Validity();
}

function checkStep2Validity() {
  const noTinRadio = document.querySelector(
    'input[name="tin_status"][value="without_tin"]',
  );
  const select = document.getElementById("user-type-select");
  const btn = document.getElementById("btn-step-2");

  if (noTinRadio.checked) {
    btn.disabled = select.value === "";
  } else {
    btn.disabled = false; // With TIN doesn't need dropdown
  }
}

// --- NAVIGATION ---
function goToStep(stepNum) {
  // Hide all steps
  document
    .getElementById("step-1")
    .classList.replace("active-step", "hidden-step");
  document
    .getElementById("step-2")
    .classList.replace("active-step", "hidden-step");
  document
    .getElementById("step-3")
    .classList.replace("active-step", "hidden-step");
  document
    .getElementById("step-success")
    .classList.replace("active-step", "hidden-step");

  // Show target
  if (stepNum === 3) prepareStep3(); // inject form html first

  setTimeout(() => {
    const target = stepNum === "success" ? "step-success" : `step-${stepNum}`;
    document
      .getElementById(target)
      .classList.replace("hidden-step", "active-step");

    // Update Progress Indicator
    if (stepNum !== "success") {
      document.getElementById("progress-indicator").innerText = stepNum;
      const labels = { 1: "Category", 2: "Config", 3: "Details" };
      document.getElementById("progress-label").innerText = labels[stepNum];
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}

// --- STEP 3 LOGIC ---
function prepareStep3() {
  // Inject correct form template
  document.getElementById("dynamic-form-fields").innerHTML =
    formTemplates[currentCategory];
}

function toggleMiddleName(checkbox) {
  const input = document.getElementById("middleNameInput");
  if (input) {
    input.disabled = checkbox.checked;
    if (checkbox.checked) input.value = "";
    input.required = !checkbox.checked;
  }
}

function showSuccess() {
  // normally would do API call here
  goToStep("success");
  // update header to indicate complete
  document.getElementById("progress-indicator").innerHTML =
    `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>`;
  document
    .getElementById("progress-indicator")
    .classList.add("bg-green-500", "text-white");
  document
    .getElementById("progress-indicator")
    .classList.remove("text-blue-900", "bg-white");
  document.getElementById("progress-label").innerText = "Complete";
}
