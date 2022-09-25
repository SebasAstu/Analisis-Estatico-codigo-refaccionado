window.addEventListener('DOMContentLoaded', function (event) {
    const baseUrl = 'http://localhost:3030';

    function login(event) {
        //debugger;
        

        event.preventDefault();
        const url = `${baseUrl}/authentication/Login`;
        var usernameErrorElement
        usernameErrorElement = document.getElementById("login-errors");
        if (!Boolean(event.currentTarget.Correo_user.value)) {
            usernameErrorElement.textContent = "username is requered"
            usernameErrorElement.style.display = "block"
            console.log(event.currentTarget.contraseña.value)
        }
        else{
            usernameErrorElement.textContent = ""
            usernameErrorElement.style.display = "hidden"
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
                    
                    sessionStorage.setItem("jwt", data.message);
                    console.log("SESION", sessionStorage)
                    
                    window.location.href = "../Storage/storage-car/storage-car.html";

                });
            } else {
                alert("No Se puede iniciar sesion")
            }
        }).catch((err) => {

            
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
    document.getElementById("contraseña").addEventListener('change',(e)=>{  
        console.log("ee",e.currentTarget)
            if(!Boolean(e.currentTarget.value))
            {
                e.currentTarget.style.background="red"
            }
            else{
                e.currentTarget.style.background="white"
            }
        });

    document.getElementById("ver-contrasenia").addEventListener('click', VerContraseña)
    document.getElementById("InicioSesion").addEventListener('submit', login);
});