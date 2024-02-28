const row = document.getElementsByClassName("row")[0];
const shop = document.getElementsByClassName("shop")[0];
carrello();
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
      div.className = "col-12 col-md-6 col-lg-4 col-xl-3 ";

      //card
      const card = document.createElement("div");
      div.appendChild(card);
      card.style = "height: 33rem;";
      card.className = "card w-100 bg-light text-dark";

      //img
      const img = document.createElement("img");
      card.appendChild(img);
      img.setAttribute("src", libro.img);
      img.className = "card-img-top object-fit-cover ";
      img.style = "height: 60%;";
      //div body
      const divBody = document.createElement("div");
      divBody.className = "card-body row align-items-end ";
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

      //div bottoni
      const divbtn = document.createElement("div");
      divBody.appendChild(divbtn);
      //btn elimina
      const btnElimina = document.createElement("button");
      btnElimina.className = "btn btn-danger";
      btnElimina.textContent = "Elimina";
      divbtn.appendChild(btnElimina);
      btnElimina.onclick = function () {
        div.remove();
        delCarrello(libro.title, libro.price);
      };
      //btn aggiungi
      const btnAggiungi = document.createElement("button");
      btnAggiungi.className = "btn btn-success ms-2";
      btnAggiungi.textContent = "Aggiungi";
      divbtn.appendChild(btnAggiungi);
      btnAggiungi.onclick = () => addCarrello(libro.title, libro.price);
    });
  })
  .catch((error) => console.log(error));

function addCarrello(titolo, prezzo) {
  let tot = parseFloat(localStorage.getItem("totale"));
  if (!tot) {
    tot = 0;
  }
  tot += Math.floor(parseFloat(prezzo));
  localStorage.setItem("totale", tot);

  localStorage.setItem(titolo, prezzo);
}

function delCarrello(titolo, prezzo) {
  if (localStorage.getItem(titolo)) {
    let tot = parseFloat(localStorage.getItem("totale"));
    tot -= Math.floor(parseFloat(prezzo));
    localStorage.setItem("totale", tot);
  }

  localStorage.removeItem(titolo);
}

function carrello() {
  shop.innerHTML = `<button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick=gestioneShop()>
CARRELLO
</button>

<!-- Modal -->
<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content bg-light text-dark">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Il tuo carrello</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <p class="fw-bold ms-2" id="tot">  </p>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>`;
}

function gestioneShop() {
  const modalBody = document.getElementsByClassName("modal-body")[0];
  const tot = document.getElementById("tot");
  modalBody.innerHTML = "";
  for (let index = 0; index < localStorage.length; index++) {
    const p = document.createElement("p");
    modalBody.appendChild(p);
    if (localStorage.key(index) == "totale") {
      tot.innerHTML="TOTALE: €" + localStorage.getItem("totale")
    } else {
      p.textContent =
        localStorage.key(index) +
        " prezzo: €" +
        localStorage.getItem(localStorage.key(index));
    }
  }
}
