/* pour faire de l'ajax à l'ancienne, il faut créer une connexion XHR : Xml Http Reuest */

function getXhr(){
    let xhr = null;
    /* avant, il fallait vérifier si ajax etait possible sur le navigateur ET trouver le bon protocole (si IE ou autre navigateur) */

    if(window.ActiveXObject || window.XMLHttpRequest){
        if(window.ActiveXObject){
            /* si micro$oft */
            /* deux protocoles possibles pour de l'ajax */
            try{
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            }catch(erreur){
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
        }else{
            xhr = new XMLHttpRequest();
        }
    }else{
        console.error('Votre navigateur ne supporte les protocoles AJAX');
        xhr = false;
    }

    return xhr;
}

loaded(function(){
    const xhr = getXhr();
    sA('.read').forEach(button=>{
        button.addEventListener('click', function(){
            const urlRessource = button.dataset.url;
            console.log(urlRessource);
            /*
            xhr.open('GET', urlRessource, false);
            xhr.send();
            console.log(xhr);
            console.log(xhr.responseText);
            */

            xhr.onreadystatechange = function(){
                if(xhr.status !== 200){
                    if(xhr.status === 404){
                        s('#reponse').innerHTML = `Erreur 404 : <br /> la ressource "${urlRessource}" n'existe pas à l'adresse indiquée`;
                    }else{
                        s('#reponse').innerHTML = `Erreur ${xhr.status} : <br /> impossibilité de résoudre la requête à l'adresse "${urlRessource}"`;
                    }
                }else{
                    s('#reponse').innerHTML = xhr.responseText;
                }
            }

            xhr.open('GET', urlRessource);

            xhr.send();

        });
    });
});