

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(worksElements => {
        console.log(worksElements)

        function generateModalWork(worksElements) {
            for (let i = 0; i < worksElements.length; i++) {
                const work = worksElements[i];

                const modalSection = document.querySelector('.modal-gallery');

                // Link with the DOM of the modal card
                const modalFigure = document.createElement("figure");

                const modalDelete = document.createElement('button');
                const modalDeleteImage = document.createElement('img');
                modalDeleteImage.src = './assets/icons/trash-bin-big.png';


                const modalImage = document.createElement('img');
                modalImage.src = work.imageUrl

                const modalFigCaption = document.createElement('figcaption');
                modalFigCaption.innerText = "éditer";


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



        generateModalWork(worksElements);

    });

