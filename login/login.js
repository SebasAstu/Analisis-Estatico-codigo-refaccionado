window.addEventListener('DOMContentLoaded', function (event) {
    const baseUrl = 'http://localhost:3030';

    function login(event) {
        //debugger;
        //console.log(event.currentTarget);

        event.preventDefault();
        const url = `${baseUrl}/authentication/Login`;

        if (!Boolean(event.currentTarget.Correo_user.value)) {
            var usernameErrorElement = document.getElementById("login-errors");
            usernameErrorElement.textContent = "username is requered"
            usernameErrorElement.style.display = "block"
            console.log(event.currentTarget.contraseña.value)
        }
        var data = {
            Email: event.currentTarget.Correo_user.value,
            Password: event.currentTarget.contraseña.value
        }
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 200) {

                response.json().then((data) => {
                    //debugger;
                    sessionStorage.setItem("jwt", data.message);
                    console.log("SESION", sessionStorage)
                    window.location.href = "../main.html";

                });
            // } else {
            //     let err = new Error("HTTP status code: " + response.status)
            //     err.response = response
            //     err.status = response.status
            //     console.log("err",err.message)
            //     throw err
                //response.text().then(text =>{ throw Error(text)});
            }
        }).catch((err) => {

            //debugger;
            console.log("catch",err.json())
            alert(err.message);
        });

    }

    function verificarPassword(password){
        console.log(password[1])
        console.log(password[0])
    }
    function VerContraseña(e) {
        let aux = document.getElementById("InicioSesion")
        if (aux[1].type == 'password') {
            aux[1].type = `text`
        } else {
            aux[1].type = `password`
        }
        //console.log("iniciosesio",aux[1].type)
    }
    document.getElementById("ver-contrasenia").addEventListener('click', VerContraseña)
    document.getElementById("InicioSesion").addEventListener('submit', login);
});