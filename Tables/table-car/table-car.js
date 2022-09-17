document.addEventListener('DOMContentLoaded', function (event) {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../../login/login.html";
    }
    let teams = [];
    let status;
    const baseUrl = 'http://localhost:3030';

    /*function fetchTeams(){
        debugger
        const url=`${baseUrl}/teams`;
        //cambiamos el fetch('https://jsonplaceholder.typicode.com/users') por fetch(url)
        fetch(url)
        .then((response) => {
            status=response.status; 
            return response.json();
            // if(response.status==200)
            // {
            //     return response.json()
            // }
            // else{
            //     alert("error")
            //     return response.json()
            // }
        })
        .then((data) => {
            if(status==200){
                console.log(data)
                let teamList=data.map(team=>{return `<li> name: ${team.name} | City:${team.city}</li>`});
                var teamContent=`<ul>${teamList.join('')}</ul>`;
                document.getElementById('teams-container').innerHTML=teamContent
            }
            else{
                alert(data)
            }
        })
    }*/
    async function fetchClients() {
        //debugger
        const url = `${baseUrl}/storage`;
        //cambiamos el fetch('https://jsonplaceholder.typicode.com/users') por fetch(url)
        let response = await fetch(url);
        try {
            if (response.status == 200) {
                let data = await response.json();
                /*let clientList=data.map(client=>{return `<li>
                 firstName:${client.firstName} |
                 middleName:${client.middleName } |
                 lastName:${client.lastName} |
                 dateOfBirth:${client.dateOfBirth} |
                 gender:${client.gender} |
                 phoneNumber:${client.phoneNumber} 
                </li>`*/

                /*let clientList=data.map(client=>{
                    return `
                 <li>firstName:${client.firstName}</li>
                 <li>middleName:${client.middleName } </li>
                 <li>lastName:${client.lastName}</li>
                 <li>dateOfBirth:${client.dateOfBirth}</li>
                 <li>gender:${client.gender}</li>
                 <li>phoneNumber:${client.phoneNumber}</li>
                 <br>`
                });*/
                let clientList = data.map(client => {
                    return [`
                 <td>${client.name}</td>
                 <td>${client.brand} </td>
                 <td>${client.type}</td>
                 <td>${client.motorType}</td>
                 <td>${client.bodyType}</td>
                 <td>${client.fuelType}</td>
                 <td>${client.amountAvailable}</td>
                 <td>${client.price}</td>`]
                });
                //var clientContent=`<ul>${clientList.join('')}</ul>`;
                //ar clientContent=`<tr>${clientList[0]}</tr><tr>${clientList[1]}</tr>`;
                var clientContent = `${ListaTR(clientList).join('')}`;
                document.getElementById('client-container').innerHTML = clientContent

                let buttonsEdit = document.querySelectorAll('#client-container tr button[data-edit-client-id]');
                for (const buttonE of buttonsEdit) {
                    buttonE.addEventListener('click', editClient);
                }
                let buttonsDelete = document.querySelectorAll('#client-container tr button[data-delete-client-id]');
                for (const buttonD of buttonsDelete) {
                    buttonD.addEventListener('click', deleteClient);
                }
                let buttonView = document.querySelectorAll('#client-container tr button[data-view-client-id]');
                for (const buttonV of buttonView) {
                    buttonV.addEventListener('click', viewClient);
                }
            }
            else {
                var errorText = await response.text();
                alert("no se pude comunicar")
            }
        }
        catch (error) {
            var errorText = await error.text();
            alert(errorText)
        }
    }
    function ListaTR(ListaClientes) {
        let res = [];
        // ListaClientes.forEach(client => {
        //     console.log("forcli",client)
        //     res=`<tr>${client}</tr>`;
        // });
        for (let index = 0; index < ListaClientes.length; index++) {
            const client = ListaClientes[index];
            res[index] = `<tr id="column-${index}">${client}</tr>`
        }
        return res;
    }
    function editClient(a) {
        //debugger
        let clientID = this.dataset.editClientId;
        console.log(this);
        let urlO = `http://127.0.0.1:5500/forms/Form-car/form-car.html?CarID=${clientID}&update=true&type=storagecar`
        window.location.href = urlO
    }
    function viewClient(event) {
        let clientID = this.dataset.viewClientId;
        console.log(clientID)
        let urlOther = `http://127.0.0.1:5500/views/view-car/view-car.html?CarID=${clientID}`;
        window.open(urlOther)
        // window.location.href="../../../main.html";
    }
    async function deleteClient(b) {
        const baseUrl = 'http://localhost:3030';
        const url = `${baseUrl}/storage/${this.dataset.deleteClientId}`;
        var dataglobal;
        let response = await fetch(url);
        let data;
        try {
            if (response.status == 200) {
                data = await response.json();
            }
        }
        catch {
            alert("No se encontro al cliente")
        }
        // fetch(url).then(async (res)=>{
        //     if(res.status==200)
        //     {
        //         let data=await res.json()
        //         console.log("data",data)
        //         dataglobal=data
        //         //console.log("data",data)
        //     }
        //     else
        //     {
        //         alert("No se encontro al automovil")
        //     }
        // })
        console.log(dataglobal)
        if (window.confirm(`¿Esta seguro de eliminar el automovil ${data.name} de la marca ${data.brand}?`)) {
            //debugger
            console.log(this);
            console.log("this", this.dataset)
            console.log("this", this.dataset.deleteClientId)
            let car = this.dataset.deleteClientId
            let url = `${baseUrl}/storage/${car}`;
            fetch(url, {
                method: 'DELETE'
            }).then((data) => {
                if (data.status === 200) {
                    alert('El automovil fue eliminado');
                    window.location.reload();
                }
                else {
                    alert("error no se pudo eliminar al automovil")
                }
            });
        }
    }
    fetchClients()
    document.getElementById('fetch-btn').addEventListener('click', fetchClients)
});