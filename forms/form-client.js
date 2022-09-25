function readURL(input) {
    console.log(input)
    const imagen = document.getElementById("imagenView")
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        imagen.style.visibility = "visible"
        reader.onload = function (e) {

            imagen.src = e.target.result
            imagen.width = "350";
            imagen.height = "250";
        };

        reader.readAsDataURL(input.files[0]);
    }

}
document.addEventListener('DOMContentLoaded', function (event) {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../login/login.html";
    }
    let updating = false;
    let trueclientID;
    var queryParams = window.location.search.split('?');
    if (queryParams.length > 1) {
        console.log("1", queryParams)
        var fraccionar = queryParams[1].split('=');
        var clientID = fraccionar[1].split('&')
        trueclientID = clientID[0]
        console.log("2", trueclientID)
        console.log("3", typeof updating, "valor", updating)
        let a = fraccionar[2]
        a != undefined ? (updating = true) : (updating = false)
        console.log("4", typeof updating, "valor", updating)
    }
    let teams = [];
    let status;
    const baseUrl = 'http://localhost:3030';
    function PostClient(event) {
        event.preventDefault();
        let c = verificarFormulario(event)
        if (c != 0) {
            alert("complete los campos")
        }
        else {
            let url = `${baseUrl}/client`;
            console.log("event", event)
            console.log("ct", event.currentTarget)
            console.log("t", event.target)

            var data = {
                firstName: event.currentTarget.name.value == "" ? "null" : event.currentTarget.name.value,
                lastName: event.currentTarget.lastName.value == "" ? "null" : event.currentTarget.lastName.value,
                middleName: event.currentTarget.middleName.value == "" ? "null" : event.currentTarget.middleName.value,
                dateOfBirth: event.currentTarget.dateOfBirth.value == "" ? new Date() : event.currentTarget.dateOfBirth.value,
                gender: event.currentTarget.gender.value == "" ? "null" : event.currentTarget.gender.value,
                email: event.currentTarget.email.value == "" ? "null" : event.currentTarget.email.value,
                imagen: "null" ,
                imagenURL: event.currentTarget.imagen.value == "" ? "null" : event.currentTarget.imagen.value,
                phoneNumber: parseInt(event.currentTarget.phoneNumber.value == "" ? "0" : event.currentTarget.phoneNumber.value)
            };
            console.log(data)
            const formData = new FormData(event.currentTarget)
            var formData1 = {};
            for (var pair of formData.entries()) {
                formData1[pair[0]] = pair[1];
            }
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJsonString = JSON.stringify(plainFormData);
            console.log("plainFormData", plainFormData)
            console.log("formDataJsonString", formDataJsonString);
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                console.log("res", response.body)
                console.log("res", response)
                console.log("return response", response.status);
                if (response.status == 201) {
                    alert("cliente fue creado")
                }
                else {
                    response.text().then(alert("No se puede crear el cliente "));
                }
            })
        }
    }
    function verificarFormulario(params) {
        let verificar = 0
        let nameParam=params.currentTarget.name.value;
        if( nameParam!= ""){
            params.currentTarget.name.style.backgroundColor = "white"
        }
        else{
            params.currentTarget.name.style.backgroundColor = "red"
            verificar += 1 
        }
        let lastNameParam=params.currentTarget.lastName.value
        if( lastNameParam!= ""){
            params.currentTarget.lastName.style.backgroundColor = "white"
        }
        else{
            params.currentTarget.lastName.style.backgroundColor = "red"
            verificar += 1 
        }
        return verificar;
    }
    async function updateClient(event) {
        debugger
        event.preventDefault();
        const url = `${baseUrl}/client/${trueclientID}`;
        console.log(event)
        var data = {
            firstName: event.currentTarget.name.value == "" ? "null" : event.currentTarget.name.value,
            lastName: event.currentTarget.lastName.value == "" ? "null" : event.currentTarget.lastName.value,
            middleName: event.currentTarget.middleName.value == "" ? "null" : event.currentTarget.middleName.value,
            dateOfBirth: event.currentTarget.dateOfBirth.value == "" ? new Date() : event.currentTarget.dateOfBirth.value,
            gender: event.currentTarget.gender.value == "" ? "null" : event.currentTarget.gender.value,
            email: event.currentTarget.email.value == "" ? "null" : event.currentTarget.email.value,
            imagen: event.currentTarget.imagen.value == "" ? "null" : event.currentTarget.imagen.value,
            phoneNumber: parseInt(event.currentTarget.phoneNumber.value == "" ? "0" : event.currentTarget.phoneNumber.value)
        };
        console.log("data", data)
        const formData = new FormData(event.currentTarget)
        await fetch(url, {
            method: 'PUT',
            body: formData
        }).then(response => {
            console.log("res", response.body)
            console.log("res", response)
            console.log("return response", response.status);
            if (response.status == 200) {
                alert("cliente fue actualizado")
            }
            else {
                response.text().then(response=>{
                    alert(response)
                })
            }
        })
    }

    async function CargarClient(event) {
        //debugger
        let aux = document.getElementById("formulario-auto")
        console.log(trueclientID)
        console.log(aux.children)
        console.log(aux.children[1])
        console.log("child 3", aux.children[3].children)
        console.log("typeimage", typeof aux.children[3].children[1])
        const url = `${baseUrl}/client/${trueclientID}`;
        let response = await fetch(url);
        if (response.status == 200) {
            let data = await response.json();
            console.log("data", data)
            console.log("t!!", event)
            console.log(this)
            const imageUrlCar = data.imagen ? `${baseUrl}/${data.imagen}` : "";
            aux.children[1].children[1].value = data.firstName
            aux.children[1].children[1].readOnly = true
            aux.children[1].children[1].style.backgroundColor = "lightblue"
            aux.children[1].children[3].value = data.middleName
            aux.children[1].children[3].readOnly = true
            aux.children[1].children[3].style.backgroundColor = "lightblue"
            aux.children[1].children[5].value = data.lastName
            aux.children[1].children[5].readOnly = true
            aux.children[1].children[5].style.backgroundColor = "lightblue"
            aux.children[1].children[7].value = new Date(data.dateOfBirth)
            let imagenPerfil = document.getElementById("imagenView")
            imagenPerfil.style.visibility = "visible"
            imagenPerfil.width = "350";
            imagenPerfil.height = "250";
            imagenPerfil.src = imageUrlCar
            aux.children[3].children[5].value = data.email
            aux.children[3].children[7].value = data.phoneNumber
            aux.children[6].children[0].value = data.gender
        }
    }
    if (!updating) {
        document.getElementById("formulario-auto").addEventListener('submit', PostClient)
        document.getElementById("imagen").addEventListener("change", readURL)
    }
    else {
        let r = document.querySelector("#formulario-auto .titulo").innerHTML = "Actualizar cliente <hr>";
        document.getElementById("registrarBoton").value = "Actualizar"
        CargarClient();
        document.getElementById("formulario-auto").addEventListener('submit', updateClient)
    }
});