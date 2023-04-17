

fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(worksElements => {
		console.log(worksElements)

		function modalWork(worksElements) {

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

			let filterSection = document.querySelector('.filter');
			filterSection.style.display = "none"
			const modalBar = document.querySelector('.modal-management');
			modalBar.style.display = 'block';
			const modalModify = document.querySelectorAll('.modal-modify-btn');
			modalModify.forEach(div =>
				div.style.display = 'block')

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

		let form = document.getElementById('modal-add-form');
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

			await fetch('http://localhost:5678/api/works', {
				method: "POST",
				headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' },
				body: formData
			}).then(response => {
				if (response.status === 201) {
					console.log(response.json())
					modalBox2.style.display = 'none'

					form.reset()
					inputPhoto.innerHTML = '' 
					document.querySelector('.modal-gallery').innerHTML = '';
					document.querySelector(".gallery").innerHTML = "";
					fetch('http://localhost:5678/api/works')
						.then(response => response.json())
						.then(worksElements => {
							generateWork(worksElements)
							modalWork(worksElements)
						}
						)
				}
			})

		});


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
								fetch('http://localhost:5678/api/works')
									.then(response => response.json())
									.then(worksElements => {
										modalWork(worksElements)
										generateWork(worksElements)
									})

						} else {
							console.error("Une erreur est survenue !")
						}

					})
					.catch(error =>
						console.error(error))
			});

		})


	});

