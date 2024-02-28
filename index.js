const row = document.getElementsByClassName("row")[0];

fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    // console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  })
  .then((books) => {
    books.forEach((libro, index) => {
      //col
      const div = document.createElement("div");
      row.appendChild(div);
      div.className = "col-12 col-lg-3";

      //card
      const card = document.createElement("div");
      div.appendChild(card);
      card.style = "width: 20rem;height: 35rem;";
      card.className = "card";

      //img
      const img = document.createElement("img");
      card.appendChild(img);
      img.setAttribute("src", libro.img);
      img.className = "card-img-top object-fit-cover";
      img.style = "height: 60%;";
      //div body
      const divBody = document.createElement("div");
      divBody.className = "card-body";
      card.appendChild(divBody);
      const h5 = document.createElement("h5");
      h5.className = "card-title";
      divBody.appendChild(h5);
      h5.innerHTML = libro.title;
      //prezzo
      const prezzo = document.createElement("p");
      prezzo.className = "card-text fw-bold";
      prezzo.textContent = "PREZZO €: " + libro.price;
      divBody.appendChild(prezzo);
      //btn elimina
      const btnElimina=document.createElement("button")
      btnElimina.className="btn btn-danger"
      btnElimina.textContent="Elimina"
      divBody.appendChild(btnElimina)
      btnElimina.onclick=function(){
        div.remove()
        delCarrello(libro.title,libro.price)
      }
      //btn aggiungi
      const btnAggiungi=document.createElement("button")
      btnAggiungi.className="btn btn-success ms-2"
      btnAggiungi.textContent="Aggiungi"
      divBody.appendChild(btnAggiungi)
      btnAggiungi.onclick=()=> addCarrello(libro.title,libro.price)
    });
  })
  .catch((error) => console.log(error));

  function addCarrello(titolo, prezzo) {
    localStorage.setItem(titolo, prezzo);
    let tot = parseFloat(localStorage.getItem('totale')); 
    if (!tot) {
      tot = 0;
    }
    tot += parseFloat(prezzo);
    localStorage.setItem('totale', tot);
  }
  
function delCarrello(titolo,prezzo) {
 
if(localStorage.getItem(titolo)){
  let tot = parseFloat(localStorage.getItem('totale')); 
  tot -= parseFloat(prezzo);
  localStorage.setItem('totale', tot);

}

  localStorage.removeItem(titolo)

}