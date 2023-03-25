fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(worksElements => {
        console.log(worksElements)

        for (let i = 0; i < worksElements.length; i++) {
            const work = worksElements[i];
            const categories = work.categoryId;
            console.log(categories)

            // Link with the gallery section 
            let sectionGallery = document.querySelector(".gallery");

            // Creation of the figure inside the gallery sect°
            let figureDiv = document.createElement("figure")


            let workTitle = document.createElement("h3");
            workTitle.innerText = work.title;
            let workImage = document.createElement("img");
            workImage.src = work.imageUrl;

            sectionGallery.appendChild(figureDiv)
            figureDiv.appendChild(workImage);
            figureDiv.appendChild(workTitle);


        }

        // links for the filters 
        const btnAll = document.querySelector(".btn-all");
        const btnObjects = document.querySelector(".btn-objects");
        const btnFlats = document.querySelector(".btn-flats");
        const btnHotels = document.querySelector(".btn-hotels");

        btnAll.addEventListener("click", function () {
            const cat = worksElements;
            console.log(cat)
        });

        btnObjects.addEventListener("click", function () {
            const cat = worksElements.filter(function (work) {
                if (work.category.name === "Objets") {
                    return work;
                }
            });
            console.log(cat)
        });

        btnFlats.addEventListener("click", function () {
            const cat = worksElements.filter(function (work) {
                if (work.category.name === "Appartements") {
                    return work;
                }
            });
            console.log(cat)
        });

        btnHotels.addEventListener("click", function () {
            const cat = worksElements.filter(function (work) {
                if (work.category.name === "Hotels & restaurants") {
                    return work;
                }
            });
            console.log(cat)
        });

    });

