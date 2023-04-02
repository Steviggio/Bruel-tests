// Function to update the display of the DOM
export function generateWork(worksElements) {
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
