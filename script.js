const timeStamp = "1674488640";
const apiKey = "fc6e72b73644025cb41fa3812dcc1bdc";
const hash = "0dccccee80215ee11a05b21255de1229";

fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`
)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let comics = document.querySelector(".comics-card");
        json.data.results.map((item, index) => {
            let srcImage = item.thumbnail.path + "." + item.thumbnail.extension;
            let title = item.title;

            divComics(srcImage, title, comics, index, json);
        });
    });

function divComics(srcImage, title, toAppend, index, json) {
    let divF = document.createElement("div");
    let divS = document.createElement("div");
    let divImg = document.createElement("img");
    let divTitle = document.createElement("h1");

    divTitle.textContent = title;
    divImg.src = srcImage;
    divF.setAttribute("data-key", index);

    divS.appendChild(divImg);
    divS.appendChild(divTitle);
    divF.appendChild(divS);

    toAppend.appendChild(divF);

    divF.classList.add("comics-card-f");

    divF.addEventListener("click", () => modalView(index, json));
}

function modalView(key, json) {
    let modal = document.querySelector(".modal");
    modal.style.display = "flex";
    let comic = json.data.results[key];

    let modaTitle = document.querySelector(".modal__body_info h2");
    document.querySelector(".modal__body_info h3").textContent =
        comic.description;

    document.querySelector(".modal__body_img img").src =
        comic.thumbnail.path + "." + comic.thumbnail.extension;

    console.log(`modalView  comic`, comic);

    modaTitle.textContent = comic.title;

    if (!comic) {
        console.log("Erro: quadrinho não encontrado");
        return;
    }
}

/* close modal */
document.querySelector(".btn-closemodal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});
