function readURL(input) {
    //debugger
    console.log(input)
    const imagen=document.getElementById("imagenView")
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        imagen.style.visibility="visible"
        reader.onload = function (e) {

           imagen.src= e.target.result
           imagen.width="350";
           imagen.height="250";
            /*$('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);*/
        };

        reader.readAsDataURL(input.files[0]);
    }

}


document.addEventListener('DOMContentLoaded', function (event) {
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "../../login/login.html";
    }
    let updating = false;
    let trueclientID;

    var queryParams = window.location.search.split('?');
    if (queryParams.length > 1) {
        console.log("1", queryParams)
        var fraccionar = queryParams[1].split('=');
        console.log("fraccionar",fraccionar)
        var clientID = fraccionar[1].split('&')

        var typeCar=fraccionar[3].split('&')[0]
        var truecarID=parseInt(fraccionar[4])
        console.log("typecar",typeCar)
        console.log("clientID",clientID)
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
    function ObtenerAutomovil(event) {
        event.preventDefault();
        let c = verificarFormulario(event)
        if (c != 0) {
            alert("complete los campos")
        }
        else {
            let url = `${baseUrl}/storage`;
            console.log("event", event)
            console.log(event.currentTarget.name.value)
            console.log(typeof parseInt(event.currentTarget.name.value))

            var data = {
                name: event.currentTarget.name.value == "" ? "null" : event.currentTarget.name.value,
                brand: event.currentTarget.brand.value == "" ? "null" : event.currentTarget.brand.value,
                type: event.currentTarget.type.value == "" ? "null" : event.currentTarget.type.value,
                motorType: event.currentTarget.motorType.value == "" ? "null" : event.currentTarget.motorType.value,
                bodyType: event.currentTarget.bodyType.value == "" ? "null" : event.currentTarget.bodyType.value,
                fuelType: event.currentTarget.fuelType.value == "" ? "null" : event.currentTarget.fuelType.value,
                imagen: event.currentTarget.imagen.value == "" ? "null" : event.currentTarget.imagen.value,
                amountAvailable: parseInt(event.currentTarget.amountAvailable.value == "" ? "0" : event.currentTarget.amountAvailable.value),
                price: parseInt(event.currentTarget.price.value == "" ? "0" : event.currentTarget.price .value)
            };
            console.log(data)   
            const formData=new FormData(event.currentTarget)
            fetch(url, {
                //headers: { "Content-type": "application/json; charset=UTF-8" },
                method: 'POST',
                //body: JSON.stringify(data)
                body:formData
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
        if(params.currentTarget.name.value != ""){ 
            params.currentTarget.name.style.backgroundColor = "white"
        }
        else{
            params.currentTarget.name.style.backgroundColor = "red", verificar += 1
        }
        return verificar;
    }
    async function updateAutomovil(event) {
        //debugger
        event.preventDefault();
        let url 
        if(typeCar=="storagecar"){
            url = `${baseUrl}/storage/${trueclientID}`;
        }
        if (typeCar=="car"){
            url = `${baseUrl}/client/${trueclientID}/car/${truecarID}`;
        }
        console.log(event)
        var data = {
            name: event.currentTarget.name.value == "" ? "null" : event.currentTarget.name.value,
                brand: event.currentTarget.brand.value == "" ? "null" : event.currentTarget.brand.value,
                type: event.currentTarget.type.value == "" ? "null" : event.currentTarget.type.value,
                motorType: event.currentTarget.motorType.value == "" ? "null" : event.currentTarget.motorType.value,
                bodyType: event.currentTarget.bodyType.value == "" ? "null" : event.currentTarget.bodyType.value,
                fuelType: event.currentTarget.fuelType.value == "" ? "null" : event.currentTarget.fuelType.value,
                imagen: event.currentTarget.imagen.value == "" ? "null" : event.currentTarget.imagen.value,
                amountAvailable: parseInt(event.currentTarget.amountAvailable.value == "" ? "0" : event.currentTarget.amountAvailable.value),
                price: parseInt(event.currentTarget.price.value == "" ? "0" : event.currentTarget.price .value)
        };
        console.log("data", data)
        let aux11=document.getElementById("formulario-auto")
        const formData=new FormData(event.currentTarget)
        console.log("formDataf",formData)
        fetch(url, {
            //headers: { "Content-type": "application/json" },
            method: 'PUT',
            //body: JSON.stringify(data)
            body:formData
        }).then(response => {
            console.log("res", response.body)
            console.log("res", response)
            console.log("return response", response.status);
            if (response.status == 200) {
                alert("El automovil del cliente fue actualizado")
            }
            else {
                response.text().then(response=>{
                    alert(response)
                })
                //response.text().then(alert("No se puede actualizar el automovil del cliente "));
            }
        })
    }
    async function CargarAutomovil(event) {
        //debugger
        let aux=document.getElementById("formulario-auto")
        console.log(trueclientID)
        console.log("aux",aux.children)
        console.log(aux.children[1])
        console.log(aux.children[1].children)
        console.log(aux.children[3].children[1])
        let url
        if(typeCar=="storagecar"){
            url = `${baseUrl}/storage/${trueclientID}`;
        }
        if (typeCar=="car"){
            url = `${baseUrl}/client/${trueclientID}/car/${truecarID}`;
        }
        
        let response = await fetch(url);
        if (response.status == 200) {
            let data = await response.json();
            console.log("dataCargarAuto",data)
            console.log("t!!", event)
            console.log("aux",aux)
            console.log("data.imagen",data.imagen)
            const imageUrlCar = data.imagen? `${baseUrl}/${data.imagen}` : "";
            if(typeCar=="car")
            {
                let aux1=document.getElementById("amountAvailable")
                console.log("aux1",aux1)
                aux1.style.visibility="hidden"
                aux1.disabled = true
                let aux2=document.getElementById("amountlabel")
                aux2.style.visibility="hidden"
                aux.children[1].children[5].readOnly=true
                aux.children[1].children[5].style.backgroundColor="lightblue"
                aux.children[1].children[7].readOnly=true
                aux.children[1].children[7].style.backgroundColor="lightblue"
                aux.children[1].children[9].readOnly=true
                aux.children[1].children[9].style.backgroundColor="lightblue"
                aux.children[1].children[11].readOnly=true
                aux.children[1].children[11].style.backgroundColor="lightblue"
                aux.children[3].children[3].readOnly=true;
                aux.children[3].children[3].style.backgroundColor="lightblue"

            }
            else{
                aux.children[3].children[1].value=data.amountAvailable
            }
            aux.children[1].children[1].value=data.name
            aux.children[1].children[1].readOnly =true
            aux.children[1].children[1].style.backgroundColor="lightblue"
            aux.children[1].children[3].value=data.brand
            aux.children[1].children[3].readOnly =true;
            aux.children[1].children[3].style.backgroundColor="lightblue"
            aux.children[1].children[5].value=data.type
            aux.children[1].children[7].value=data.motorType
            aux.children[1].children[9].value=data.bodyType
            aux.children[1].children[11].value=data.fuelType
            aux.children[3].children[3].value=data.price
            let imagenPerfil=document.getElementById("imagenView")
            imagenPerfil.style.visibility="visible"
            imagenPerfil.width="350";
            imagenPerfil.height="250";
            imagenPerfil.src=imageUrlCar
            //aux.children[3].children[6].src=imageUrlCar
        }
    }
    if (!updating) {
        document.getElementById("formulario-auto").addEventListener('submit', ObtenerAutomovil)
    }
    else {
        let r=document.querySelector("#formulario-auto .titulo").innerHTML ="Actualizar automovil <hr>";
        document.getElementById("registrarBoton").value = "Actualizar"
        CargarAutomovil();
        document.getElementById("formulario-auto").addEventListener('submit', updateAutomovil)
        //document.getElementById("formulario-auto").addEventListener('click', updateClient)
    }
});