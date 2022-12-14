document.addEventListener("DOMContentLoaded",function(event){
    
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "../../login/login.html";
    }
    var cliente;
    async function cargarVista(eventOne){
        
        
        console.log("wls",window.location.search)
        var queryParams = window.location.search.split('?');
        console.log("qp",queryParams)
        var clientID= queryParams[1].split('=')[1];
        cliente=clientID;
        console.log("comID",clientID)
        const baseUrl='http://localhost:3030';
        const url=`${baseUrl}/storage/${clientID}`;
        let response= await fetch(url);
        try{
            if(response.status==200){
                let data = await response.json();
                console.log("data",data)
                
                const imageUrl = data.imagen? `${baseUrl}/${data.imagen}` : "";
                let imagenPerfil=document.getElementById("imagenPerfil")
                imagenPerfil.src=imageUrl
                console.log("ima",imagenPerfil.src)
                let infor=document.getElementById("informacion")
                let info=`
                <label><strong>Nombre</strong>: ${data.name}</label><br>
                <label><strong>Marca</strong>: ${data.brand}</label><br>
                <label><strong>Tipo de automovil</strong>: ${data.type}</label><br>
                <label><strong>Tipo de moto</strong>: ${data.motorType}</label><br>
                <label><strong>Tipo de carroceria</strong>: ${data.bodyType }</label><br>
                <label><strong>Tipo de gasolina</strong>: ${data.fuelType}</label><br>
                <label><strong>Cantidad disponible</strong>: ${data.amountAvailable}</label><br>
                <label><strong>Precio</strong>: ${data.price}</label>`
                infor.innerHTML=info
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
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
        if(window.confirm(`??Esta seguro de eliminar el automovil ${data.name}?`))
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
    cargarVista()
});