MicroModal.init({
    disableFocus: true,
    disableScroll: true,
});

document.addEventListener('DOMContentLoaded', function() {

    // Prevent tap from being propagated to elements behind the modal
    const modalOverlay = document.querySelector('.modal__overlay');

    modalOverlay.addEventListener('touchstart', function(e) {
        if (e.target.hasAttribute('data-micromodal-close')) {
            e.preventDefault();
        }
    }, { passive: false });


    // Fill the modal before opening it with the contents of the tile
    const tiles = document.querySelectorAll('.grid-item:has(.modal-content)');

    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const modalContent = tile.querySelector('.modal-content');
            const modalTitle = tile.querySelector('h2')?.textContent || 'Lala';

            // Copy the entire .modal-content markup into the modal body
            const modalBody = document.querySelector('#modal-1-text');
            modalBody.innerHTML = modalContent.innerHTML;

            document.getElementById('modal-1-title').textContent = modalTitle;

            MicroModal.show('modal-1');
        });
    });
});
