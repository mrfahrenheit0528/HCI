function toggleAccordion(button) {
            // Find the content sibling
            const content = button.nextElementSibling;

            // Toggle active class on button
            button.classList.toggle('active');

            // Toggle expanded class on content
            content.classList.toggle('expanded');
        }
