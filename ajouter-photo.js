

let input = document.getElementById("modal-add-input");
let preview = document.getElementById('modal-add-jpg-container');
let modalElement = document.querySelector(".modal-add-element")
let modalLabel = document.querySelector("#modal-add-jpg-btn")

input.addEventListener('change', () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    // Création d'un élément image
    const image = new Image();
    image.src = reader.result;

    // Ajout de l'image à la div de prévisualisation
    preview.appendChild(image);
  });

  if (file) {
    reader.readAsDataURL(file);
    modalElement.style.display = "none"
    modalLabel.style.display = "none"
  } 
})


let form = document.getElementById('modal-add-form');
let title = document.getElementById('title');
let category = document.getElementById('category');
let validateBtn = document.getElementById('modal-box-validate')


function validateForm() {
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;

  if (title.trim() === '' || category.trim() === '') {
    alert('Tous les champs sont nécessaires');
    return false;
  }

  // Le formulaire est valide, on peut le soumettre
  return true;
}

validateBtn.addEventListener("click", validateForm)

function checkInputs() {
  // Vérifier si les champs sont remplis 
  if (title.value.trim() !== '' && category.value.trim() !== '') {
    // Si les champs sont remplis, activer le bouton 'valider' 
    validateBtn.classList.add('active');
  } else {
    validateBtn.classList.remove('active');
  }
}

// Récupération du userId et du token en localStorage
let authInfo = window.localStorage.getItem("data")
console.log("00000000001- infos " + authInfo)
let parseInfo = JSON.parse(authInfo)
console.log('000000001 - parsedinfos : ' + parseInfo)
let userId = parseInfo.userId
console.log("0000000000001- user ID : " + userId)
let token = parseInfo.token
console.log("00000000001 - token : " + token)

title.addEventListener('input', checkInputs);
category.addEventListener('input', checkInputs);


// const dataJson = JSON.stringify(data)
// window.localStorage.setItem("categories", dataJson)


// let categoriesLocal = window.localStorage.getItem("categories")
// console.log("0000000001 - categoriesLocal : " + categoriesLocal)
// // let categories = 
// // console.log("000000001 : categories " + categories)



// form.addEventListener('submit', async function (event) {
//   event.preventDefault();
//   let categoryId = null;

//   await fetch('http://localhost:5678/api/categories')
//     .then(response => response.json())
//     .then(data => {

//       console.log(data);


//       for (let i = 0; i < data.length; i++) {
//         if (category.value === data[i].name) {
//           categoryId = data[i].id;
//           console.log(categoryId);
//           break; // Sortir de la boucle dès qu'une correspondance est trouvée
//         }
//       }
//       console.log(categoryId);
//     })


//   console.log(form)

//   // Création de l'objetFormData  à envoyer vers l'API
//   let formData = new FormData();

//   // const image = "http://localhost/images/" + input.files[0]
//   console.log("0000000001" + input.value);
//   formData.append("image", input.files[0]);
//   console.log("0000000001" + title.value);
//   formData.append("title", title.value);
//   formData.append("category", categoryId); // Utiliser l'ID correspondant;
//   console.log(formData);

//   await fetch('http://localhost:5678/api/works', {
//     method: "POST",
//     headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' },
//     body: formData
//   }).then(response => {
//     if (response.status === 201 ) {
//       console.log(response.json())
//       modalBox2.style.display = 'none'
//       modalBox2.innerHTML.innerHTML = ''
      
//     }
//   })
// });



// let generateButtons = document.querySelectorAll('.modal-gallery figure button');
// console.log("000000000000000 - generatedbtns" + generateButtons)

// generateButtons.forEach((button) => {
//   button.addEventListener("click",  () => {

//     // Get the ID of the element that'll be deleted by using the stored data in the 'data-id' attribute of the button
//     let id = button.getAttribute('data-id');
//     console.log("00000001 id " + id)

//     // Send the request to the API to delete the element with the corresponding ID
//     fetch(`http://localhost:5678/api/works/${id}`, {
//       method: "DELETE",
//       headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }
//     })
//     .then(response => {
//       if (response.ok) {
//         // Update the gallery by refreshing the page
//         // let item = document.querySelector(`.modal-gallery .item[data-id=${id}]`);
//         // item.parentNode.removeChild(item);
//         document.querySelector('.modal-gallery').innerHTML = '';
//       } else {
//         console.error("Une erreur est survenue !")
//       }
//     })
//     .catch(error =>
//       console.error(error))
//   });
// });
