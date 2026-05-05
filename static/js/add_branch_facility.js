const serviceData = {
            'branch': {
                title: 'Register a Branch',
                desc: '<p class="mb-4">Taxpayers may register a new branch through the Online Registration and Update System (ORUS). This applies to additional business locations that conduct sales transactions.</p><ul class="list-disc pl-5 space-y-1 mb-2"><li>Payment of Registration Fee (₱500.00) for the new branch</li><li>Submission of relevant local government permits (Mayor\'s Permit, etc.)</li></ul>',
                icon: '<svg class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
            },
            'facility': {
                title: 'Register a Facility',
                desc: '<p class="mb-4">Taxpayers must register facilities such as warehouses, storage places, or other facilities that do not conduct direct sales but are essential to business operations.</p><ul class="list-disc pl-5 space-y-1 mb-2"><li>Sketch of the facility location</li><li>Copy of Lease Contract (if applicable)</li><li>Description of the facility\'s primary use</li></ul>',
                icon: '<svg class="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>'
            }
        };

        function openModal(serviceId) {
            const data = serviceData[serviceId];
            if (!data) return;

            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerHTML = data.desc;
            document.getElementById('modal-icon-container').innerHTML = data.icon;

            const modal = document.getElementById('service-modal');
            modal.classList.remove('hidden-modal');
        }

        function closeModal() {
            document.getElementById('service-modal').classList.add('hidden-modal');
        }

        // Close modal on outside click
        document.getElementById('service-modal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
