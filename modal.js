const modalOpenBtns = document.querySelectorAll('.js-modal');
const modalCloseBtns = document.querySelectorAll('.js-close');
const modalBackBtn = document.querySelector('#js-modal-back');
const modalBox1 = document.querySelector('#modal-box1');
const modalBox2 = document.querySelector('#modal-box2');
const modalBoxAddBtn = document.querySelector('.js-modal-box2');


// Ouvrir le modal-box1
modalOpenBtns.forEach(button =>
button.addEventListener('click', () => {
	modalBox1.style.display = null;
})
)

// Ouvrir le modal-box2
modalBoxAddBtn.addEventListener('click', () => {
	modalBox1.style.display = 'none';
	modalBox2.style.display = null;
});

// Fermer les modals avec les boutons js-close
modalCloseBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		modalBox1.style.display = 'none';
		modalBox2.style.display = 'none';
	});
});

// Revenir au modal-box1 depuis modal-box2
modalBackBtn.addEventListener('click', () => {
	modalBox2.style.display = 'none';
	modalBox1.style.display = null;
});

// Si l'utilisateur clique hors des modaux, ceux-ci se ferment
document.addEventListener("click" , (event) => {
	if (event.target == modalBox1 || event.target == modalBox2) {
		modalBox1.style.display = 'none';
		modalBox2.style.display = 'none';
	}
})

const categoryList = document.getElementById('categories')
const categoryInput = document.getElementById('category');


categoryInput.addEventListener('change', () => {
	const selectedCategory = categoryInput.value;
	const categories = Array.from(categoryList.options).map(option => option.value);

	if (!categories.includes(selectedCategory)) {
		categoryInput.value = '';
		alert('Veuillez choisir l\'une des catégories proposées.');
	}
});


fetch('http://localhost:5678/api/categories')
	.then(response => response.json())
	.then(data => {
		console.log(data);
		const categories = data.map(category => category.name);
		console.log(categories);

		for (let i = 0; i < categories.length; i++) {
			const option = document.createElement('option');
			option.value = categories[i];
			categoryList.appendChild(option);
		}
	})
	.catch(error => console.error(error));


fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(worksElements => {


		// Supprimer un des travaux via le modal
		// fetch('http://localhost:5678/api/works' + workID)



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


				modalDelete.addEventListener("click", async () => {
					// Get the ID of the element that'll be deleted by using the stored data in the 'data-id' attribute of the button
					let id = modalDelete.getAttribute('id');
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
								fetch('http://localhost:5678/api/works')
									.then(response => response.json())
									.then(worksElements =>
										modalWork(worksElements))
							} else {
								console.error("Une erreur est survenue !")
							}

						})
						.catch(error =>
							console.error(error))
				});

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

		modalWork(worksElements);

	});

