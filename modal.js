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
document.addEventListener("click", (event) => {
	if (event.target == modalBox1 || event.target == modalBox2) {
		modalBox1.style.display = 'none';
		modalBox2.style.display = 'none';
	}
})

const categoryList = document.getElementById('categories');
const categoryInput = document.getElementById('category');
// let titleInput = document.getElementById('title');


// titleInput.addEventListener('')



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



// // find if datas are in the localStorage
// if (localStorage.getItem('data') !== null) {
// 	// get the datas and parsing it and get token
// 	let data = window.localStorage.getItem("data")
// 	let parseData = JSON.parse(data)
// 	let token = parseData.token
// 	console.log(token)

// 	let filterSection = document.querySelector('.filter');
// 	filterSection.style.display = "none"
// 	const modalBar = document.querySelector('.modal-management');
// 	modalBar.style.display = 'block';
// 	const modalModify = document.querySelectorAll('.modal-modify-btn');
// 	modalModify.forEach(div =>
// 		div.style.display = 'block')
