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
        console.log(row)
      const div = document.createElement("div");
      row.appendChild(div)
      div.className="col-12 col-lg-3";
      const card = document.createElement("div");
      div.appendChild(card)
      card.style="width: 20rem;height: 35rem;";
      //img
      const img=document.createElement("img")
      card.appendChild(img)
      img.setAttribute("src",libro.img)
      img.className="card-img-top object-fit-cover"
      img.style="height: 60%;";
      //div body
      const divBody = document.createElement("div");
      




    });
  })
  .catch((error) => console.log(error));

function addCarrello(titolo, prezzo) {
  localStorage.setItem(titolo, prezzo);
}
function delCarrello(titolo, prezzo) {}
