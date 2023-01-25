// Map modal query selectors
const mapButton = document.querySelector('#map-button')
const mapModalBg = document.querySelector('#map-modal-bg')
const mapModal = document.querySelector('#map-modal')

// Adds a click event to the Map button which opens a modal
mapButton.addEventListener('click', function () {
    mapModal.classList.add('is-active')
} )

// Adds a click event to the background; when clicked, it closes the modal
mapModalBg.addEventListener('click', function() {
    mapModal.classList.remove('is-active')
})