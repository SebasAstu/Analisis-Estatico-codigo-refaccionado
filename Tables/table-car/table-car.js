document.addEventListener('DOMContentLoaded', function (event) {
    if (!Boolean(sessionStorage.getItem("jwt"))) {
        window.location.href = "../../login/login.html";
    }
    let teams = [];
    let status;
    const baseUrl = 'http://localhost:3030';
    async function fetchClients() {
        const url = `${baseUrl}/storage`;
        let response = await fetch(url);
        try {
            if (response.status == 200) {
                let data = await response.json();
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
        for (let index = 0; index < ListaClientes.length; index++) {
            const client = ListaClientes[index];
            res[index] = `<tr id="column-${index}">${client}</tr>`
        }
        return res;
    }
    function editClient(a) {
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
        console.log(dataglobal)
        if (window.confirm(`¿Esta seguro de eliminar el automovil ${data.name} de la marca ${data.brand}?`)) {
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