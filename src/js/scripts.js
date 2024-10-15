MicroModal.init();

document.addEventListener('DOMContentLoaded', function() {
    const tiles = document.querySelectorAll('.grid-item:has(.modal-content)');

    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const modalContent = tile.querySelector('.modal-content');
            const modalTitle = tile.querySelector('h2') ? tile.querySelector('h2').textContent : 'Default Title';

            // Copy the entire .modal-content markup into the modal body
            const modalBody = document.querySelector('#modal-1-text');
            modalBody.innerHTML = modalContent.innerHTML;

            document.getElementById('modal-1-title').textContent = modalTitle;

            MicroModal.show('modal-1');
        });
    });
});
