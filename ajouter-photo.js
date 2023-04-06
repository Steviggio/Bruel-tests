// const image_input = document.querySelector("#modal-add-input");

// image_input.addEventListener("change", function() {
//   const file = image_input.file
//   console.log(file)
// })

// image_input.addEventListener("change", function () {
//   const file = in
//   reader.addEventListener("load", () => {
//     uploaded_image = reader.result;
//     document.querySelector("#modal-add-jpg-container").getElementsByClassName.backgroundImage = `url(${uploaded_image})`;
//   });
//   reader.readAsDataURL(this.files[0]);
// })

const input = document.getElementById("modal-add-input");
const preview = document.getElementById('modal-add-jpg-container');
const modalElement = document.querySelector(".modal-add-element")
const modalLabel = document.querySelector("#modal-add-jpg-btn")

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
});