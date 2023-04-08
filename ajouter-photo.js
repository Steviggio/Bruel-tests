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

  const form = document.querySelector('form');
  const title = document.getElementById('title');
  const category = document.getElementById('category');
  const validateBtn = document.getElementById('modal-box-validate')

  function checkInputs() {
    // Vérifier si les champs sont remplis 
    if (title.value.trim() !== '' && category.value.trim() !== '') {
      // Si les champs sont remplis, activer le bouton 'valider' 
      validateBtn.classList.add('active');
    } else {
      validateBtn.classList.remove('active');
    }
  }

  title.addEventListener('input', checkInputs);
  category.addEventListener('input', checkInputs);

  function sendWork() {

    const form = document.querySelector('form');
    const image = document.getElementById("modal-add-input");
    const title = document.getElementById('title');
    const category = document.getElementById('category');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Création de l'object à envoyer vers l'API
      const work = {
        "image": image.value,
        "title": title.value,
        "category": category.value
      };

      console.log(work)

      // const bodyJson = JSON.stringify(work);
      // fetch('http://localhost:5678/api/works', {
      //     method: "POST",
      //     headers: {"Content-Type": "application/json" },
      //     body: bodyJson
      // });
    });

  }
  sendWork()
  });