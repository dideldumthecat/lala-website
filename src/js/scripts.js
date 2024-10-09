MicroModal.init();

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.grid-item button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const gridItem = this.closest('.grid-item');
            const modalContent = gridItem.querySelector('.modal-content');

            if (modalContent) {
                const modalTitle = gridItem.querySelector('h2') ? gridItem.querySelector('h2').textContent : 'Default Title';

                // Copy the entire .modal-content markup into the modal body
                const modalBody = document.querySelector('#modal-1-text');
                modalBody.innerHTML = modalContent.innerHTML;

                document.getElementById('modal-1-title').textContent = modalTitle;

                MicroModal.show('modal-1');
            }
        });
    });
});
