

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

				const modalImage = document.createElement('img');
				modalImage.src = work.imageUrl

				const modalFigCaption = document.createElement('figcaption');
				modalFigCaption.innerText = "éditer"


				// Display works in the figures


				// Adding the elements in the DOM 
				modalSection.appendChild(modalFigure)
				modalFigure.appendChild(modalDelete);
				modalFigure.appendChild(modalFigCaption);
				modalFigure.appendChild(modalImage)
			}
		}

		// Function to update the display of the DOM
		function generateWork(worksElements) {
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
		}

		// find if datas are in the localStorage
		if (localStorage.getItem('data') !== null) {
			// get the datas and parsing it and get token
			let data = window.localStorage.getItem("data")
			let parseData = JSON.parse(data)
			let token = parseData.token
			console.log(token)


			const modalBar = document.querySelector('.modal-management');
			modalBar.style.display = 'block';
			const modalModify = document.querySelector('.modal-modify-btn');
			modalModify.style.display = 'block';
			// generateModalWork(worksElements)
		}


		generateWork(worksElements)
		// generateModalWork(worksElements)

		// links for the filters with the DOM
		const btnAll = document.querySelector(".btn-all");
		const btnObjects = document.querySelector(".btn-objects");
		const btnFlats = document.querySelector(".btn-flats");
		const btnHotels = document.querySelector(".btn-hotels");


		// All works are displayed
		btnAll.addEventListener("click", function () {
			const cat = worksElements;
			console.log(cat);
			document.querySelector('.gallery').innerHTML = "";
			generateWork(cat)
		});

		// Works from category "objects"
		btnObjects.addEventListener("click", function () {
			const cat = worksElements.filter(function (work) {
				if (work.category.name === "Objets" || work.category.id === 1) {
					return work;
				}
			});
			document.querySelector('.gallery').innerHTML = "";
			generateWork(cat)
		});

		// Works from category "flats"
		btnFlats.addEventListener("click", function () {
			const cat = worksElements.filter(function (work) {
				if (work.category.name === "Appartements" || work.category.id === 2) {
					return work;
				}
			});
			console.log(cat)
			document.querySelector('.gallery').innerHTML = "";
			generateWork(cat)
		});

		// Works from category "hotels and restaurants"
		btnHotels.addEventListener("click", function () {
			const cat = worksElements.filter(function (work) {
				if (work.category.name === "Hotels & restaurants" || work.category.id === 3) {
					return work;
				}
			});
			console.log(cat)
			document.querySelector('.gallery').innerHTML = "";
			generateWork(cat)
		});

		// DOM links for the modal
		const btnModal = document.getElementsByClassName("modal-modify-btn");
		const modal = document.getElementById("modal-box");
		const span = document.getElementsByClassName("close");

		// When the user clicks on the 
		btnModal.onclick = function () {
			modal.style.display = "block"
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	});

