// Function to update the display of the DOM
export async function generateWork() {

    await fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(worksElements => {
            console.log(worksElements)

            for (let i = 0; i < worksElements.length; i++) {
                const work = worksElements[i];

                // Link with the gallery section 
                const sectionGallery = document.querySelector(".gallery");

                // Adding a figure to the gallery sect°
                const figureDiv = document.createElement("figure")


                const workTitle = document.createElement("h3");
                workTitle.innerText = work.title;
                const workImage = document.createElement("img");
                workImage.src = work.imageUrl;

                sectionGallery.appendChild(figureDiv)
                figureDiv.appendChild(workImage);
                figureDiv.appendChild(workTitle);


            }
        }
        )
}


export async function generateModalWork(worksElements) {

    fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(worksElements => {
		console.log(worksElements)

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


        // Adding the elements in the DOM 
        modalSection.appendChild(modalFigure)
        modalFigure.appendChild(modalDelete);
        modalDeleteImage.appendChild(modalDeleteImage);
        modalFigure.appendChild(modalImage);
        modalFigure.appendChild(modalFigCaption);
    }
})


}

export function sendWork() {

    const form = document.querySelector('form');
    const image = document.getElementById("modal-add-input");
    const title = document.getElementById('title');
    const category = document.getElementById('category');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Création de l'object à envoyer vers l'API
        const work = {
            "image": image.src,
            "title": title.value,
            "category": category.value
        };

        console.log(work)

        // const bodyJson = JSON.stringify(work);
        // fetch('http://localhost:5678/api/works', {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json" },
        //     body: bodyJson
        // });



    });

}

export function updateGallery() {
    fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(worksElements => generateWork(worksElements)
    )}