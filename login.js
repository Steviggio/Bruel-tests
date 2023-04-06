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
    .then(data => {
        console.log("0000000000001")
        console.log(data);
        if (data.token != null) {
        let serializedData = JSON.stringify(data)
        window.localStorage.setItem("data", serializedData)
        // window.location.href = "index.html"}
        } else {
            alert("Erreur dans le mot de passe ou l'identifiant")
        }
    })



