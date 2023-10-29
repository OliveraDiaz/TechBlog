document.addEventListener('DOMContentLoaded', () => {
    function openModal() {
        document.querySelector('.modal').classList.add('active');
    }

    function closeModal() {
        document.querySelector('.modal').classList.remove('active');
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach
    trigger => { 
        const modal = document.querySelector(trigger.dataset.modalTarget);
        const triggers = document.querySelectorAll(trigger.dataset.modalTrigger);

        if (modal && triggers) {
            triggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    closeAllModals();
                    openModal();
                });
            });

            modal.addEventListener('click', () => {
                closeModal();
            });
        }
    }
});

