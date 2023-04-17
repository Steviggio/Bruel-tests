
let worksElements;

// Function to display the modal works
function modalWork() {
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(modalWorks => {
			console.log(modalWorks)

			for (let i = 0; i < modalWorks.length; i++) {
				const work = modalWorks[i];


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

				// Necessary to initiate the event of the buttons along their implementation
				const deleteButtons = document.querySelectorAll('.deleteButtons')
				deleteButtons.forEach(button => {
					button.addEventListener("click", async () => {
						// Get the ID of the element that'll be deleted by using the stored data in the 'data-id' attribute of the button
						let id = button.getAttribute('id');
						console.log(id)

						// Send the request to the API to delete the element with the corresponding ID
						await fetch(`http://localhost:5678/api/works/${id}`, {
							method: "DELETE",
							headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }
						})
							.then(response => {
								if (response.ok) {
									// Update the gallery by refreshing the page
									// let item = document.querySelector(`.modal-gallery .item[data-id=${id}]`);
									// item.parentNode.removeChild(item);
									document.querySelector('.modal-gallery').innerHTML = '';
									document.querySelector('.gallery').innerHTML = '',
										modalWork()
									init()


								} else {
									console.error("Une erreur est survenue !")
								}

							})
							.catch(error =>
								console.error(error))
					});

				})


			}
		})
}


// Function to display the app works
function generateAllWorks() {
	const sectionGallery = document.querySelector(".gallery");
	sectionGallery.innerHTML = "";
	worksElements.forEach(function (work) {
		const figureDiv = document.createElement("figure");
		const workTitle = document.createElement("h3");
		workTitle.innerText = work.title;
		const workImage = document.createElement("img");
		workImage.src = work.imageUrl;
		sectionGallery.appendChild(figureDiv);
		figureDiv.appendChild(workImage);
		figureDiv.appendChild(workTitle);
	});
}

function generateFilteredWork(category) {
	const filteredWorks = worksElements.filter(function (work) {
		return work.category.name === category;
	});
	const sectionGallery = document.querySelector(".gallery");
	sectionGallery.innerHTML = "";
	filteredWorks.forEach(function (work) {
		const figureDiv = document.createElement("figure");
		const workTitle = document.createElement("h3");
		workTitle.innerText = work.title;
		const workImage = document.createElement("img");
		workImage.src = work.imageUrl;
		sectionGallery.appendChild(figureDiv);
		figureDiv.appendChild(workImage);
		figureDiv.appendChild(workTitle);
	});
}

function init() {
	fetch("http://localhost:5678/api/works")
		.then(response => response.json())
		.then(function (works) {
			worksElements = works;
			generateAllWorks();
			const btnAll = document.querySelector(".btn-all");
			const btnObjects = document.querySelector(".btn-objects");
			const btnFlats = document.querySelector(".btn-flats");
			const btnHotels = document.querySelector(".btn-hotels");
			btnAll.addEventListener("click", generateAllWorks);
			btnObjects.addEventListener("click", function () {
				generateFilteredWork("Objets");
			});
			btnFlats.addEventListener("click", function () {
				generateFilteredWork("Appartements");
			});
			btnHotels.addEventListener("click", function () {
				generateFilteredWork("Hotels & restaurants");
			});
		})
		.catch(function (error) {
			console.log(error);
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


	}
}

init()
modalWork()

let inputPhoto = document.getElementById("modal-add-input");
// Request for the 'new work' POST request 
form.addEventListener('submit', async function (event) {
	event.preventDefault();
	let categoryId = null;

	await fetch('http://localhost:5678/api/categories')
		.then(response => response.json())
		.then(data => {

			console.log(data);


			for (let i = 0; i < data.length; i++) {
				if (category.value === data[i].name) {
					categoryId = data[i].id;
					console.log(categoryId);
					break; // Sortir de la boucle dès qu'une correspondance est trouvée
				}
			}
			console.log(categoryId);
		})


	console.log(form)

	// Création de l'objetFormData à envoyer vers l'API - 
	let formData = new FormData();

	// const image = "http://localhost/images/" + input.files[0]
	console.log("0000000001" + input.value);
	formData.append("image", input.files[0]);
	console.log("0000000001" + title.value);
	formData.append("title", title.value);
	formData.append("category", categoryId); // Utiliser l'ID correspondant;
	console.log(formData);



	fetch('http://localhost:5678/api/works', {
		method: "POST",
		headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' },
		body: formData
	}).then(response => {
		if (response.status === 201) {
			console.log(response.json())
			modalBox2.style.display = 'none'
			preview.innerHTML = '';
			modalLabel.style.display = null;
			modalElement.style.display = null;
			form.reset()
			document.querySelector('.modal-gallery').innerHTML = '';
			document.querySelector(".gallery").innerHTML = "";
			init()
			modalWork()
		}
	})
}

);






