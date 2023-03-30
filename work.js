// import { identifyUser } from "./login";
import { generateWork } from "./functions";
// let data = window.localStorage.getItem('data')
// if (data === null) {
//     identifyUser()
// }

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(worksElements => {
        console.log(worksElements)

        generateWork(worksElements)

        // links for the filters 
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
                if (work.category.name === "Objets") {
                    return work;
                }
            });
            document.querySelector('.gallery').innerHTML = "";
            generateWork(cat)
        });

        // Works from category "flats"
        btnFlats.addEventListener("click", function () {
            const cat = worksElements.filter(function (work) {
                if (work.category.name === "Appartements") {
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
                if (work.category.name === "Hotels & restaurants") {
                    return work;
                }
            });
            console.log(cat)
            document.querySelector('.gallery').innerHTML = "";
            generateWork(cat)
        });

    });

