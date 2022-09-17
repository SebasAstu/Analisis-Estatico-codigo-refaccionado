document.addEventListener("DOMContentLoaded",function(event){
    
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "../../login/login.html";
    }
    var cliente;
    async function cargarVista(eventOne){
        //alert("entro")
        console.log("wls",window.location.search)
        var queryParams = window.location.search.split('?');
        console.log("qp",queryParams)
        var clientID= queryParams[1].split('=')[1];
        cliente=clientID;
        console.log("comID",clientID)
        const baseUrl='http://localhost:3030';
        const url=`${baseUrl}/client/${clientID}`;
        let response= await fetch(url);
        try{
            if(response.status==200){
                let data = await response.json();
                console.log(data)
                //let imagen=`<img src="${data.imagen}" alt="">`
                const imageUrl = data.imagen? `${baseUrl}/${data.imagen}` : "";
                let imagenPerfil=document.getElementById("imagenPerfil")
                imagenPerfil.src=imageUrl
                console.log("ima",imagenPerfil.src)
                let infor=document.getElementById("informacion")
                let info=`
                <label><strong>Primer nombre</strong>: ${data.firstName}</label><br>
                <label><strong>Segundo nombre</strong>: ${data.middleName}</label><br>
                <label><strong>Apellido</strong>: ${data.lastName}</label><br>
                <label><strong>Fecha de nacimiento</strong>: ${data.dateOfBirth}</label><br>
                <label><strong>Genero</strong>: ${data.gender }</label><br>
                <label><strong>Correo electronico</strong>: ${data.email}</label><br>
                <label><strong>Numero de telefono</strong>: ${data.phoneNumber}</label><br>
                <label><strong>Contidad de autos</strong>: ${data.cars.length}</label>`
                infor.innerHTML=info
                let cars=data.cars
                console.log(cars)
                let carList=cars.map(car=>{
                    const imageUrlCar = car.imagen? `${baseUrl}/${car.imagen}` : "";
                    return [`
                 <td>${car.name}</td>
                 <td>${car.brand}</td>
                 <td>${car.type}</td>
                 <td>${car.motorType}</td>
                 <td>${car.bodyType}</td>
                 <td>${car.price}</td>
                 <td>${car.fuelType}</td>
                 <td><img src="${imageUrlCar}" alt="" style="width: 100px; height:100px;"></td>
                 <td> <button class="verBoton" data-view-client-id="${car.id}">Ver</button></td>
                 <td> <button class="editarBoton" data-edit-client-id="${car.id}">Editar</button></td>
                 <td> <button class="eliminarBoton" data-delete-client-id="${car.id}">Eliminar</button></td>`]
                });
                console.log(carList)
                var carLista=`${ListaTR(carList).join('')}`;
                document.getElementById('listAutos').innerHTML=carLista
                
                let buttonsEdit = document.querySelectorAll('#listAutos tr button[data-edit-client-id]');
                for (const buttonE of buttonsEdit) {
                    buttonE.addEventListener('click', editClient);
                }
                let buttonsDelete = document.querySelectorAll('#listAutos tr button[data-delete-client-id]');
                for (const buttonD of buttonsDelete) {
                    buttonD.addEventListener('click', deleteClient);
                }
                let buttonView=document.querySelectorAll('#listAutos tr button[data-view-client-id]');
                for(const buttonV of buttonView){
                    buttonV.addEventListener('click',viewClient);
                }
            }
        }
        catch{

        }
    }
    function ListaTR(ListaClientes){
        let res=[];
        for (let index = 0; index < ListaClientes.length; index++) {
            const client = ListaClientes[index];
            res[index]=`<tr id="column-${index}">${client}</tr>`
        }
        return res;
    } 
    function editClient(a){
        //debugger
        let carId=this.dataset.editClientId;
        console.log(this); 
        let urlO=`http://127.0.0.1:5500/forms/Form-car/form-car.html?clientID=${cliente}&update=true&type=car&carId=${carId}`
        window.location.href=urlO
    }
    function viewClient(event){
        let clientID=this.dataset.viewClientId;
        console.log(clientID)
        let urlOther=`http://127.0.0.1:5500/views/View-car/view-car.html?clientID=${clientID}`;
        window.open(urlOther)
        // window.location.href="../../../main.html";
    } 
    async function deleteClient(b){
        const baseUrl='http://localhost:3030';
        const url=`${baseUrl}/client/${cliente}/car/${this.dataset.deleteClientId}`;
        console.log(this.dataset)
        let response= await fetch(url);
        let data;
        try{
            if(response.status==200){
                data = await response.json();
            }
        }
        catch{
            alert("No se encontro al cliente")
        }
        // fetch(url).then(async (res)=>{
        //     if(res.status==200)
        //     {
        //         data=await res.json()
        //         //console.log("data",data)
        //     }
        //     else
        //     {
        //         alert("No se encontro al cliente")
        //     }
        // })
        if(window.confirm(`¿Esta seguro de eliminar el automovil ${data.name}?`))
        {
            //debugger
        console.log(this);
        console.log("this",this.dataset)
        console.log("this",this.dataset.deleteClientId)
        let clientId=this.dataset.deleteClientId
        let url = `${baseUrl}/client/${cliente}/car/${clientId}`;
        fetch(url, { 
        method: 'DELETE' 
        }).then((data)=>{
            if(data.status === 200){
                alert('El cliente fue eliminado');
                window.location.reload()
            }
            else {
                alert("error no se pudo eliminar al cliente")
            }
        }); 
        }
    }
    function buyNewCar(e){
        let urlO=`http://127.0.0.1:5500/Storage/storage-car/storage-car.html?clientID=${cliente}`
        window.location.href=urlO
        console.log("eventbuy",e)
    }
    document.getElementById("BuyCarboton").addEventListener("click",buyNewCar)
    cargarVista()
});