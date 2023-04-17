// Function to update the display of the DOM
function modalWork() {
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
				modalDelete.className = 'deleteButtons'
				modalDelete.id = work.id
				const modalDeleteImage = document.createElement('img');
				modalDeleteImage.src = './assets/icons/trash-bin-big.png';


				const modalImage = document.createElement('img');
				modalImage.src = work.imageUrl

				const modalFigCaption = document.createElement('figcaption');
				modalFigCaption.innerText = "éditer";

				// modalDeleteImage.addEventListener("click", function())
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


				// Attaching event listener to delete buttons 
				// 	modalDelete.addEventListener("click", function () {
				// 		console.log('000000001' + this.id);
				// });

			}
		})
}


function generateWork() {

	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(worksElements => {
			console.log(worksElements)

			for (let i = 0; i < worksElements.length; i++) {
				const work = worksElements[i];

				// Link with the gallery section 
				const sectionGallery = document.querySelector(".gallery");

				// Creation of the figure inside the gallery sect°
				const figureDiv = document.createElement("figure")


				const workTitle = document.createElement("h3");
				workTitle.innerText = work.title;
				const workImage = document.createElement("img");
				workImage.src = work.imageUrl;

				sectionGallery.appendChild(figureDiv)
				figureDiv.appendChild(workImage);
				figureDiv.appendChild(workTitle);

			}
		})

	// find if datas are in the localStorage
	if (localStorage.getItem('data') !== null) {
		// get the datas and parsing it and get token
		let data = window.localStorage.getItem("data")
		let parseData = JSON.parse(data)
		let token = parseData.token
		console.log(token)

		let filterSection = document.querySelector('.filter');
		filterSection.style.display = "none"
		const modalBar = document.querySelector('.modal-management');
		modalBar.style.display = 'block';
		const modalModify = document.querySelectorAll('.modal-modify-btn');
		modalModify.forEach(div =>
			div.style.display = 'block')

		// generateModalWork(worksElements)
	}
}


export function updateGallery() {
    fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(worksElements => generateWork(worksElements)
    )}