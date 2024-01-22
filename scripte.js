const accessKey = "-O7l2CrUAn6cH5NZfSUgmximdoaTfJlALra8kKc-ciU";

const form1 = document.querySelector("form");
const input1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results"); // Change to .search-results
const showmore = document.getElementById("show-more-button");

let inputs = "";
let page = 1;

async function searchedImage() {
    inputs = input1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputs}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

form1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchedImage();
});

showmore.addEventListener("click", () => {
    searchedImage();
});
