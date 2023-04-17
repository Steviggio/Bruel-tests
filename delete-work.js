let buttons = document.querySelectorAll('.deleteButtons');

buttons.forEach((button) => {
button.addEventListener("click", function () {
  console.log('000000001')
});
})

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    // Get the ID of the element that'll be deleted by using the stored data in the 'data-id' attribute of the button
    let id = button.getAttribute('data-id');
    console.log(id)

  //   // Send the request to the API to delete the element with the corresponding ID
  //   await fetch(`http://localhost:5678/api/works/${id}`, {
  //     method: "DELETE",
  //     headers: { 'Authorization': `Bearer ${token + " " + `userId:${userId}`}`, 'Accept': '*/*' }
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       // Update the gallery by refreshing the page
  //       // let item = document.querySelector(`.modal-gallery .item[data-id=${id}]`);
  //       // item.parentNode.removeChild(item);
  //       document.querySelector('.modal-gallery').innerHTML = '';
  //     } else {
  //       console.error("Une erreur est survenue !")
  //     }
  //   })
  //   .catch(error =>
  //     console.error(error))
  });
});


