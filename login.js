// File created to make tests concerning login routes | possibilities


// information of the unique account registered in the database


// email: sophie.bluel@test.tld

// password: S0phie 


// const chargeUtile = JSON.stringify(user)
const btnConnect = document.querySelector("#btn-connect");

btnConnect.addEventListener("click", function(){

    let email = document.getElementById("email").dataset.email;
    let password = document.getElementById("password").dataset.password;
    
    const chargeUtileText = {
        "email": `"${email}"`,
        "password": `"${password}"`
    }
    
    const chargeUtile = JSON.stringify(chargeUtileText)
    console.log(chargeUtile)

    
    
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: chargeUtile
    })
    .then(response => response.json())
    .then(data => {
        // Stocker les data dans le localStorage
        window.localStorage.setItem("data", data);
        // Rediriger vers la page d'accueil
        window.location.href = "index.html";
    })
})







// const btnLogin = document.querySelector("#btn-connect");
// btnLogin.addEventListener("click", function() {
