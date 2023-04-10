
let modal = null


// Fonction pour l'ouverture du modal
const openModal = async function (e) {
    e.preventDefault()

    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener("click", closeModal)
    modal.querySelectorAll('.js-close').addEventListener("click", closeModal)
    modal.querySelectorAll('.modal-box-content').addEventListener("click", stopPropagation)
};


// Fonction pour la fermeture du modal 
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelectorAll('.js-close').removeEventListener("click", closeModal)
    modal = null
}

// const loadModal = async function (url) {
//     const target = '#' + url.split('#')[1]
//     const existingModal = document.querySelector(target)
//     if (existingModal !== null) return
//     const html = await fetch(url).then(response => response.text())
//     const element = document.createRange().createContextualFragment(html).querySelector(target)
//     if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
//     document.body.append(element)
//     return element
// }

// Fonction pour éviter que la modal se ferme lors d'un clic à l'intérieur 
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Lien avec le modal pour définir l'évenement lors du clic sur le lien d'ouverture
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)

const addPhotoBtn = document.getElementById("modal-box-add");
const modalGallery = document.getElementById('gallery_modal');

const modalAddPhoto = document.getElementById("add_photo");

addPhotoBtn.addEventListener("click", function() {
    modalAddPhoto.style.display = null;
    modalGallery.style.display = "none"
})

});



fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(worksElements => {
        console.log(worksElements)

        function generateModalWork(worksElements) {
            for (let i = 0; i < worksElements.length; i++) {
                const work = worksElements[i];

                const modalSection = document.querySelector('.modal-gallery');

                // Link with the DOM of the modal card
                const modalFigure = document.createElement("figure");

                const modalDelete = document.createElement('button');
                const modalDeleteImage = document.createElement('img');
                modalDeleteImage.src = './assets/icons/trash-bin-big.png';


                const modalImage = document.createElement('img');
                modalImage.src = work.imageUrl

                const modalFigCaption = document.createElement('figcaption');
                modalFigCaption.innerText = "éditer";


                // Display works in the figures

                if (i === 0) {
                    const modalArrow = document.createElement('button');
                    const modalArrowImage = document.createElement('img');
                    modalArrowImage.src = './assets/icons/vector.png';

                    modalFigure.appendChild(modalArrow);
                    modalArrow.appendChild(modalArrowImage);
                }

                // Adding the elements in the DOM
                modalSection.appendChild(modalFigure)
                modalFigure.appendChild(modalDelete);
                modalDelete.appendChild(modalDeleteImage);
                modalFigure.appendChild(modalImage);
                modalFigure.appendChild(modalFigCaption);
            }
        }

        // find if datas are in the localStorage
        if (localStorage.getItem('data') !== null) {
            // get the datas and parsing it and get token
            let data = window.localStorage.getItem("data")
            let parseData = JSON.parse(data)
            let token = parseData.token
            console.log(token)

            // const modal = document.querySelector('.modal-management');
            // modal.style.display = 'block';


        } else {
            modal.style.display = 'none'
        }



        generateModalWork(worksElements);

    });

