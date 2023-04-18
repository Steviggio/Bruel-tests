Voici un repo crée afin de m'assister lors du projet 3 - Créer un site web dynamique avec JS. On y trouve :
- Récupération d'éléments d'origine du projet et des divers fichiers JS ajouté dans le front-end 
- Tests en tout genre pour me permettre de manipuler le DOM.

Le CSS des différents éléments est trouvable dans le repo.

---
## Faire un modal :

> Ajout de balise HTML => bouton d'affichage de la modal / balise aside de pour la modal (présence de deux balises aside pour deux modaux différents)

```html
<a href="#modal-box1" class="js-modal">Afficher la modale</a>

<aside class="modal-main" id="modal-box1" aria-hidden="true" role="dialog" aria-modal="false"
aria-labelledby="titlemodal" style="display:none">
<div id="gallery_modal" class="modal-box-content">
<span class="js-close">&times;</span>
<h2 id="titlemodal">Galerie photo</h2>
<div class="modal-gallery"></div>
<div class="modal-border"></div>
<div class="modal-btns">
<a href="#modal-box2" class="js-modal-box2" id="modal-box-add">Ajouter une photo</a>
<a id="modal-box-delete">Supprimer la galerie</a>
</div>
</div>

</aside>

<aside class="modal-main" id="modal-box2" aria-hidden="true" role="dialog" aria-modal="false"
aria-labelledby="titlemodal" style="display:none">
<!-- modal de la partie Add photo -->

<div class="modal-box-content" id="add_photo">
<span>
<button id="js-modal-back">
<img id="modal-add-arrow-img" src="/assets/icons/back.png" alt="">
</button>
</span>
<span class="js-close">&times;</span>
<h2 id="modal-add-title">Ajout photo</h2>
<div class="modal-add-box">
<div id="modal-add-jpg">
<div id="modal-add-jpg-container"></div>
<p class="modal-add-element" id="modal-add-text">jpg, png : 4mo max</p>
</div>
<form id="modal-add-form" method="post">
<img class="modal-add-element" id="modal-add-img" src="/assets/icons/modal-add.png">
<input class="modal-add-element" type="file" name="image" accept="image/*" id="modal-add-input">
<label for="modal-add-input" id="modal-add-jpg-btn">+ Ajouter photo</label>
<label for="title">Titre</label>
<input type="text" name="title" id="title">
<label for="category">Catégorie</label>
<div id="datalist">
<input list="categories" name="categories" id="category">
<i id="datalist-icon" class="icon iconfont icon-arrow"></i>
<datalist id="categories"></datalist>
</div>
</form>
</div>

<div class="modal-border"></div>
<div class="modal-btns">
<button type="submit" form="modal-add-form" id="modal-box-validate">Valider</button>
</div>
</div>

</aside>
```
> Fonction afin de générer le contenu de la gallery modale :

```js

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
headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }})
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
console.error("Une erreur est survenue !")}
}).catch(error =>
console.error(error))
});})}})}

```

## Les différentes requêtes HTTP utilisées :

- La requête "POST":

``` Javascript
fetch(`http://localhost:5678/api/works/${id}`, {
method: "DELETE",
headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }})
```

- La requête "GET":

``` Javascript
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(function (works) {
worksElements = works})
```

- La requête "DELETE":

``` Javascript
fetch(`http://localhost:5678/api/works/${id}`, {
method: "DELETE",
headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }})
```

## Faire des filtres de catégories grâce à une API :

> Déclaration d'une fonction qui prend en paramètre la catégorie des éléments afin de les isoler :

``` Javascript
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
```

> Ajout des addEventListener des différents filtres : 
``` Javascript
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
```

---

## Formulaire de connexion d'un site :

> Création d'une section HTML avec un formulaire de connexion :

``` html
<section class="login">
<h2>Log in</h2>
<form action="/login" method="post">
<label for="email" >E-mail</label>
<input type="email" name="email" id="email">
<label for="password" >Mot de passe</label>
<input type="password" name="password" id="password" >
<input id="btn-connect" type="submit" value="Se connecter">
</form>
<a href="">Mot de passe oublié</a>
</section>
``` 

> Ajout d'un addEventListener contenant une fonction asynchrone récupérant l'identifiant et le mot de passe / Envoi une requête "POST" en direction de l'API => couple id/mdp correct = récupération du userId/token | couple incorrect = renvoi vers le login et message d'alert "couple incorrecte"

``` js
const btnConnect = document.querySelector("#btn-connect");

btnConnect.addEventListener("click", async function (event) {
event.preventDefault();
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

const chargeUtileText = {
"email": email,
"password": password
}

const chargeUtile = JSON.stringify(chargeUtileText)

await fetch("http://localhost:5678/api/users/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: chargeUtile
})
.then(response => response.json())
.then(data => {
if (data.token != null) {
let serializedData = JSON.stringify(data)
try { window.localStorage.setItem("data", serializedData)
alert("Connection réussie")
} catch (e) {
// Gérer les erreurs éventuelles lors de l'enregistrement des données dans le stockage
console.error("Impossible d'enregistrer les données dans le stockage : ", e)
}}})
})
```

## Afficher un message d'erreur lors d'un mauvais couple id/mdp :

``` js 
alert("Erreur dans le mot de passe ou l'identifiant")}
```

---

## Afficher dynamiquement les images provenant d'une API :

> Déclaration d'une variable globale récupérant les données de l'API

```js 
let worksElements;
```

> Ajout d'une fonction de génération des éléments dans le DOM

```js 
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
```

> Ajout d'une fonction d'initialisation, effectuant une requête "GET" auprès de l'API

```js 
function init() {
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(function (works) {
worksElements = works;
generateAllWorks();
})
.catch(function (error) {
console.log(error);
})}
```

---

##  Charger une photo, la prévisualiser et l'envoyer vers une API :

> Lien avec le DOM de l'input de l'image et la box de preview

``` js
let input = document.getElementById("modal-add-input");
let preview = document.getElementById('modal-add-jpg-container');
```

> Création d'un objet FileReader afin de pouvoir lire l'image charger dans le fichier ('file') / ajout d'un addEventListener où l'on peut retrouver => création d'un élément image dans le DOM | ajout de la valeur du FileReader dans la source de l'image crée | ajout de l'image dans la box de preview 

``` js 
input.addEventListener('change', () => {
const file = input.files[0];
const reader = new FileReader();

reader.addEventListener('load', () => {
// Création d'un élément image
const image = new Image();
image.src = reader.result;

// Ajout de l'image à la div de prévisualisation
preview.appendChild(image);
});})
```