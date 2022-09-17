window.addEventListener('load',function(evenet){
    const baseUrl='http://localhost:3030';
    function CreateUser(e){
        debugger
        e.preventDefault();
        const url = `${baseUrl}/authentication/user`;
        
        console.log("e",e);
        var data = {
            Email: e.currentTarget.Correo_user.value,
            Password: e.currentTarget.contraseña.value,
            ConfirmPassword:e.currentTarget.confirmarContraseña.value
        }
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response)=>{
            if(response.status===200){
                let aux= response.json();
                console.log(aux)
                alert("El usuario fue creado con exito")
                let urlOther=`http://127.0.0.1:5500/login/login.html`
                window.location.href=urlOther
            }
        }).catch((rejected)=>{
            //let aux1= await response.text()
            let aux2= rejected;
            rejected.text()
            console.log("aux2",aux2)

        });

    }

    function verificar(){

    }
    document.getElementById("CrearUsuario").addEventListener('submit',CreateUser)
});