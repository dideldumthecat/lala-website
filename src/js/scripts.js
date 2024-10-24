MicroModal.init({
    disableFocus: true,
    disableScroll: true,
});

document.addEventListener('DOMContentLoaded', () => {

    const openModal = (tile) => {
        const modalTitle = tile.querySelector('h2')?.textContent || 'Lala';
        const modalContent = tile.querySelector('.modal-content') || 'Lorem ipsum dolor sit amet.';
        const modalBody = document.querySelector('#modal-1-text');

        document.getElementById('modal-1-title').textContent = modalTitle;
        modalBody.innerHTML = modalContent.innerHTML;

        MicroModal.show('modal-1');
    }

    // Prevent tap from being propagated to elements behind the modal
    const modalOverlay = document.querySelector('.modal__overlay');

    modalOverlay.addEventListener('touchstart', (e) => {
        if (e.target.hasAttribute('data-micromodal-close')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Fill the modal before opening it with the contents of the tile
    document.querySelector('.grid-container').addEventListener('click', (event) => {
        const tile = event.target.closest('.grid-item:has(.modal-content)');
        if (tile) openModal(tile);
    });

});
