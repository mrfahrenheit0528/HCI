const serviceData = {
            'update': {
                title: 'Correction / Change / Update of Registration',
                desc: '<p class="mb-4">Under the Administrative Provisions of the Tax Code, as amended, any registered taxpayer who wish to update their registration information shall accomplish Form No. 1905 and submit with the Revenue District Office (RDO) having jurisdiction over the taxpayer\'s residence/business address, specifying therein any change in type and other taxpayer detail.</p><p>For those taxpayers who want to change their Facility\'s address and/or Facility type, taxpayers shall deregister the current facility and register the new facility through ORUS or visit their respective RDOs.</p>',
                icon: '<svg class="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>'
            },
            'close': {
                title: 'Closure of Business and Facility / Cancellation of TIN',
                desc: '<p class="mb-4">The cancellation of registration shall trigger the conduct of investigation to determine the taxpayer\'s exact tax liabilities.</p><div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-4"><p class="text-xs text-amber-800 font-bold m-0">In general, please prepare the following for submission to your RDO within ten (10) days from online filing:</p></div><ul class="list-disc pl-5 space-y-1 mb-2"><li>Original Copy of Certificate of Registration (COR)</li><li>Inventory List of unused principal/supplementary receipts/invoices</li><li>Unused principal receipts/invoices and all other unutilized accounting forms</li></ul>',
                icon: '<svg class="w-10 h-10 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
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
