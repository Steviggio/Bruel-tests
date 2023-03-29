// File created to make tests concerning login routes | possibilities

const user = {
    "email": "sophie.bluel@test.tld",
    "password": "S0phie" 
}

const chargeUtile = JSON.stringify(user)



fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: chargeUtile
})
.then(response => response.json())
.then(data => {console.log(data)})



// const btnLogin = document.querySelector("#btn-connect");
// btnLogin.addEventListener("click", function() {
