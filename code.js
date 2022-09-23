var globalrespuesta=["Hola","como","estas"]

async function respuesta(pregunta,direccion_respuesta,text_areresp){
    let respu;
    let res=document.getElementById(direccion_respuesta)
    let pe= respuestaAsync(pregunta.value,text_areresp);
    let resaync=await pe.then((r)=>{
        console.log("r","=>",r)
            respu=r
            console.log("respu","=>",respu)
        })
        .catch((c)=>{
            console.log("c","=>",c)
            alert(c)
            respu=c
            console.log("respu","=>",respu)
        });
    console.log("resaync","==>",resaync)
    console.log("respu","===>",respu)
    res.value=respu;
}


function respuestaAsync(pregunta,text_areresp){
    let res=new Promise((resolve,reject )=>{
        console.log("pregunta========",pregunta)
        if(pregunta=="hola"){
            resolve(saludar(text_areresp)) 
        }
        else{
            reject("no entiendo")
        }
    });
    return res;
}

function saludar(text_areresp){
    let random = Math.floor(Math.random()*(5000-1000+1)+1000);
    let div=document.getElementById(text_areresp)
    div.value=""
    console.log("entro a saludar")
        for (const iterator of globalrespuesta) {
            setTimeout(() => {
                console.log(iterator,"2")
            div.value+=iterator+'\n'
            }, random);
        }
        div.value+=random+"\n"
    return "saludado"
}
var imag=['https://cnnespanol.cnn.com/wp-content/uploads/2020/07/200703104728-labrador-retriever-stock-super-169.jpg?quality=100&strip=info','https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/10/30/16040649809238.jpg','./assets/imagen/w-motors-lykan-hypersport.928748.jpg'],
    texto=['Los cánidos (Canidae) son una familia de mamíferos del orden Carnivora, de régimen carnívoro. Entre otros, abarca a lobos (incluyendo perros), chacales, coyotes, cuones, dingos, licaones, aguarás guazú, guarás, zorros de la Pampa o aguarachays, zorros culpeo y vulpinos (zorros). Estos animales son digitígrados. Sus principales características en general, incluyen hocico largo y fino y cuerpo esbelto.',
    'El Lamborghini Murciélago es un automóvil superdeportivo diseñado y producido por el fabricante italiano Lamborghini en su fábrica de Sant´Agata Bolognese, con motor central-trasero montado longitudinalmente y tracción integral',
    'El “Lycan” es la más avanzada especie de lobos en las leyendas místicas. Escondidio bajo una elegante y lujosa máscara, el Lycan puede transformarse en cualquier cosa y, dado el tiempo, la necesidad deberá levantarse para mostrar sus poderes y liderazgo']
     let contador=0;
function carrousel(contenedor){
    contenedor.addEventListener('click',e=>{
        let atras=contenedor.querySelector('.atras'),
        adelante=contenedor.querySelector('.adelante'),
        div_img=contenedor.querySelector('.carrusel_Tarjetas'),
        text_div_img=contenedor.querySelector("#texto_carrusel"),
        target=e.target;
        console.log(text_div_img)
        if(target==atras){
            if(contador>0){
                div_img.style.backgroundImage="url('"+imag[contador-1]+"')";
                text_div_img.innerHTML=texto[contador-1]
                console.log(contador)
                contador--;
            }
            else{
                div_img.style.backgroundImage="url('"+imag[imag.length-1]+"')";
                text_div_img.innerHTML=texto[texto.length-1]
                console.log(texto[texto.length-1])
                console.log(contador)
                contador=imag.length-1;
            }
        }
        else if(target==adelante){
            if(contador<imag.length-1){
                div_img.style.backgroundImage="url('"+imag[contador+1]+"')";
                text_div_img.innerHTML=texto[contador+1]
                contador++;
            }
            else{
                div_img.style.backgroundImage="url('"+imag[0]+"')";
                text_div_img.innerHTML=texto[0]
                contador=0;
            }
        }

    });
}
window.addEventListener("DOMContentLoaded",()=>{
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "./login/login.html";
    }
    let conte=document.getElementById("carrusel")
    carrousel(conte)
});