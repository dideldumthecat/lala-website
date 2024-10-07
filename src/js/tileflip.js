document.querySelectorAll('.grid-item button').forEach(button => {
    button.addEventListener('click', function() {
        const gridItem = button.closest('.grid-item');
        gridItem.classList.toggle('flipped');
    });
});
