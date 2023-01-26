const timeStamp = "1674488640";
const apiKey = "fc6e72b73644025cb41fa3812dcc1bdc";
const md5 = "0dccccee80215ee11a05b21255de1229";
let arr = [];

fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`
)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let comics = document.querySelector(".comics-card");
        json.data.results.map((item, index) => {
            let srcImage = item.thumbnail.path + "." + item.thumbnail.extension;
            let title = item.title;
            let description = item.description;
            // console.log(item);

            divComics(srcImage, title, description, comics, index, json);
        });
    });

function divComics(srcImage, title, description, toAppend, index, json) {
    let divF = document.createElement("div");
    let divS = document.createElement("div");
    let divImg = document.createElement("img");
    let divTitle = document.createElement("h1");
    let divDescription = document.createElement("h2");

    divTitle.textContent = title;
    // divDescription.textContent = description;
    divImg.src = srcImage;
    divF.setAttribute("data-key", index);

    divS.appendChild(divImg);
    divS.appendChild(divTitle);
    divS.appendChild(divDescription);
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

// function closeModal() {
//     document.querySelector(".modal").style.display = "none";
// }

document.querySelector(".btn-closemodal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});
