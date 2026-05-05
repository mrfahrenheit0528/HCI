const serviceData = {
            'atp': {
                title: 'Authority to Print',
                desc: 'Secure permission from the BIR before contracting printers to manufacture your official receipts, sales invoices, and other commercial documents.',
                icon: '<svg class="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>'
            },
            'books': {
                title: 'Books of Accounts',
                desc: 'Register and stamp your formal accounting records. This includes manual books (ledgers, journals), loose-leaf books, or computerized books.',
                icon: '<svg class="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>'
            },
            'system': {
                title: 'Registration of System',
                desc: 'Acquire official acknowledgment for the use of Point-of-Sale (POS) machines, Cash Register Machines (CRM), or fully Computerized Accounting Systems (CAS).',
                icon: '<svg class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
            },
            'looseleaf': {
                title: 'Permit to Use Loose Leaf',
                desc: 'Apply for a permit to maintain un-bound loose-leaf sheets for your official receipts and accounting books in lieu of pre-bound books.',
                icon: '<svg class="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
            },
            'cancel': {
                title: 'Cancellation of Permits',
                desc: 'File for the formal cancellation and revocation of your existing ATP, PTU, or System registrations due to closure or system upgrades.',
                icon: '<svg class="w-10 h-10 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
            }
        };

        function openModal(serviceId) {
            const data = serviceData[serviceId];
            if (!data) return;

            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerText = data.desc;
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
