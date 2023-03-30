// File created to make tests concerning login routes | possibilities


// information of the unique account registered in the database


// email: sophie.bluel@test.tld

// password: S0phie 


// declaring the submit button for the login page
const btnConnect = document.querySelector("#btn-connect");

// Sending the email/password in the form onclick
btnConnect.addEventListener("click", function () {

    let email = document.getElementById("email").dataset.email;
    let password = document.getElementById("password").dataset.password;

    const chargeUtileText = {
        "email": `"${email}"`,
        "password": `"${password}"`
    }

    const chargeUtile = JSON.stringify(chargeUtileText)
    console.log(chargeUtile)


    // Pushing the email/password of the user to the API for connectionz
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: chargeUtile
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const serializedData = JSON.stringify(data);
            window.localStorage.setItem("UserData", serializedData);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Error during login: " + error);
        });
})







// const btnLogin = document.querySelector("#btn-connect");
// btnLogin.addEventListener("click", function() {
