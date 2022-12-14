window.addEventListener('DOMContentLoaded', function (event) {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../../login/login.html";
    }
    const baseUrl = 'http://localhost:3030';
    const url = `${baseUrl}/storage`;
    async function CarsStorage(e) {
        let response = await fetch(url);
        let errorText;
        try {
            if (response.status == 200) {
                let data = await response.json();
                console.log("data", data)
                let CarsList = data.map(cars => {
                    const imageUrl = cars.imagen ? `${baseUrl}/${cars.imagen}` : "";
                    return `
                    <div>
                        <img src="${imageUrl}" alt="Avatar" class="roundImage">
                        <div>
                        <label><strong>Nombre: </strong>${cars.name} </label><br>
                        <label><strong>Marca: </strong>${cars.brand} </label><br>
                        <label><strong>Tipo de automovil: </strong>${cars.type} </label><br>
                        <label><strong>Tipo de motor: </strong>${cars.motorType} </label><br>
                        v<label><strong>tipo de carroceria: </strong>${cars.bodyType} </label><br>
                        <label><strong>Tipo de gasolina: </strong>${cars.fuelType} </label><br>
                        <label><strong>Cantidad disponible: </strong>${cars.amountAvailable} </label><br>
                        <label><strong>Precio: </strong>${cars.price} </label><br>
                        <button class="ComprarBoton" data-buy-client-car-id="${cars.id}">Comprar</button> 
                        </div>
                    </div>`});
                var CarsContent = CarsList.join('');
                document.getElementById('sotrage-list').innerHTML = CarsContent;
                let buttonsEdit = document.querySelectorAll('#sotrage-list button[data-buy-client-car-id]');
                for (const buttonE of buttonsEdit) {
                    buttonE.addEventListener('click', buyCar);
                }
            }
            else {
                errorText = await response.text();
                alert("no se pude comunicar")
            }
        }
        catch (error) {
            errorText = await error.text();
            alert(errorText)
        }
    }
    function buyCar(b) {
        var queryParams = window.location.search.split('?');
    console.log("qp",queryParams)
    var fraccionar = queryParams[1].split('=');
    console.log("fr",fraccionar)
    var clienteID = fraccionar[1]
        const base_Url = 'http://localhost:3030';
        let carid=this.dataset.buyClientCarId
        console.log("carid",carid)
        const url_ = `${base_Url}/client/${clienteID}/Car/${carid}`;
        fetch(url_,{method: 'POST'}).then((res) => {
            console.log("res",res)
            if (res.status == 201) {
                alert("Compra exitosa")
                window.location.reload()
            }
            else {
                alert("No pudo completar la comprar")
            }
        })
    }
    function retornar(){
        let wls=window.location.search
        let urlO=`http://127.0.0.1:5500/views/view-client/view-client.html`+wls
        window.location.href=urlO
    }
    CarsStorage();
    document.getElementById("AtrasBtn").addEventListener('click',retornar)
});