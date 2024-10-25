document.addEventListener('DOMContentLoaded', () => {

    const selectors = {
        gridContainer: document.querySelector('.grid-container'),
        modalOverlay: document.querySelector('.modal__overlay'),
        modalTitle: document.getElementById('modal-1-title'),
        modalText: document.querySelector('#modal-1-text'),
        modalControlPrevious: document.querySelector('.modal__control--prev'),
        modalControlNext: document.querySelector('.modal__control--next'),
        modalContent: document.querySelector('.modal__content'),
    }

    const setModalContent = (tile) => {
        const modalTitle = tile.querySelector('h2')?.textContent || 'Lala';
        const modalContent = tile.querySelector('.modal-content') || 'Lorem ipsum dolor sit amet.';

        selectors.modalTitle.textContent = modalTitle;
        selectors.modalText.innerHTML = modalContent.innerHTML;

        setModalControls(tile);
    }

    const setModalControls = (tile) => {
        selectors.modalControlPrevious.classList.toggle('hidden', getPreviousTile(tile) === null);
        selectors.modalControlNext.classList.toggle('hidden', getNextTile(tile) === null);
    }

    const openModal = (tile) => {
        setModalContent(tile);

        const modalOptions = {
            disableFocus: true,
            disableScroll: true,
            openClass: 'visible',
            onClose: () => {
                document.querySelector('.grid-item.active').classList.remove('active');
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
    selectors.modalOverlay.addEventListener('touchstart', (e) => {
        if (e.target.hasAttribute('data-micromodal-close')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Fill the modal before opening it with the contents of the tile
    selectors.gridContainer.addEventListener('click', (event) => {
        const tile = event.target.closest('.grid-item:has(.modal-content)');
        if (tile) {
            openModal(tile);
            tile.classList.add('active');
        }
    });

    // Add event listeners to the controls
    selectors.modalControlPrevious.addEventListener('click', () => {
        changeModalContent('prev');
    });

    selectors.modalControlNext.addEventListener('click', () => {
        changeModalContent('next');
    });

});
