document.addEventListener('DOMContentLoaded', () => {

    const setModalContent = (tile) => {
        const modalTitle = tile.querySelector('h2')?.textContent || 'Lala';
        const modalContent = tile.querySelector('.modal-content') || 'Lorem ipsum dolor sit amet.';

        document.getElementById('modal-1-title').textContent = modalTitle;
        document.querySelector('#modal-1-text').innerHTML = modalContent.innerHTML;

        setModalControls(tile);
    }

    const setModalControls = (tile) => {
        if (!getPreviousTile(tile)) {
            document.querySelector('.modal__control--prev').classList.add('hidden');
        } else {
            document.querySelector('.modal__control--prev').classList.remove('hidden');
        }

        if (!getNextTile(tile)) {
            document.querySelector('.modal__control--next').classList.add('hidden');
        } else {
            document.querySelector('.modal__control--next').classList.remove('hidden');
        }
    }

    const openModal = (tile) => {
        setModalContent(tile);

        const modalOptions = {
            disableFocus: true,
            disableScroll: true,
            openClass: 'visible',
            onClose: () => {
                tile.classList.remove('active');
            }
        }
        MicroModal.show('modal-1', modalOptions);
    }

    const changeModalContent = (direction) => {
        const currentTile = document.querySelector('.grid-item.active');

        let newTile;
        if (direction === 'next') {
            newTile = getNextTile(currentTile);
        } else if (direction === 'prev') {
            newTile = getPreviousTile(currentTile);
        }

        if (newTile) {
            setModalContent(newTile);

            // Update the active tile
            currentTile.classList.remove('active');
            newTile.classList.add('active');
        }
    }

    const getPreviousTile = (tile) => {
        let previousTile = tile.previousElementSibling;
        while (previousTile && !previousTile.querySelector('.modal-content')) {
            previousTile = previousTile.previousElementSibling;
        }
        return previousTile;
    }

    const getNextTile = (tile) => {
        let nextTile = tile.nextElementSibling;
        while (nextTile && !nextTile.querySelector('.modal-content')) {
            nextTile = nextTile.nextElementSibling;
        }
        return nextTile;
    }

    // Prevent tap from being propagated to elements behind the modal
    document.querySelector('.modal__overlay').addEventListener('touchstart', (e) => {
        if (e.target.hasAttribute('data-micromodal-close')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Fill the modal before opening it with the contents of the tile
    document.querySelector('.grid-container').addEventListener('click', (event) => {
        const tile = event.target.closest('.grid-item:has(.modal-content)');
        if (tile) {
            openModal(tile);
            tile.classList.add('active');
        }
    });

    // Add event listeners to the controls
    document.querySelector('.modal__control--prev').addEventListener('click', function() {
        changeModalContent('prev');
    });

    document.querySelector('.modal__control--next').addEventListener('click', function() {
        changeModalContent('next');
    });

});
