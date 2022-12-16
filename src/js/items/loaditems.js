import { apiUrl } from "../api/parameter.mjs";

const listingsDOM = document.getElementById("listings");
const bearerToken = localStorage.getItem("accessToken");
const searchInputDOM = document.getElementById("searchInput");

const options = {
  headers: { Authorization: "bearer" + "" + bearerToken },
};

let offset = 0;

document.getElementById("prev-button").addEventListener("click", (e) => {
  if (offset > 0) {
    offset -= 100;
    callAPI();
  }
});

// Handle the "next" button click
document.getElementById("next-button").addEventListener("click", (e) => {
  offset += 100;
  callAPI();
});
console.log(document.getElementById("prev-button"));

async function callAPI() {
  listingsDOM.innerHTML = "";
  const response = await fetch(apiUrl + `/auction/listings?sortOrder=asc&_active=true&limit=100&offset=${offset}`, options);
  const data = await response.json();
  console.log(data);

  data.forEach((listing) => {
    if (!(listing.media.length == 0) || listing.media === null) {
      if (bearerToken !== null) {
        listingsDOM.innerHTML += `
      <a id="${listing.id}" href="productpage.html?id=${listing.id}" class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
        <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
      </a>`;
      } else {
        listingsDOM.innerHTML += `
      <a id="${listing.id}" href="signUp.html" class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
        <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
      </a>`;
      }
    }
  });
}
callAPI();
searchInputDOM.addEventListener("keydown", async (event) => {
  const response = await fetch(apiUrl + `/auction/listings?sortOrder=asc&_active=true&limit=100&offset=${offset}`, options);
  const data = await response.json();
  const query = searchInputDOM.value.trim().toLowerCase();
  listingsDOM.innerHTML = "";

  data.forEach((listing) => {
    if (listing.title.toLowerCase().includes(query) && (!(listing.media.length == 0) || listing.media === null)) {
      if (bearerToken !== null) {
        listingsDOM.innerHTML += `
        <a "id="${listing.id}" href="productpage.html?id=${listing.id}" class="group">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
          <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
          <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
        </a>`;
      } else {
        listingsDOM.innerHTML += `
        <a "id="${listing.id}" href="signUp.html" class="group">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
          <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
          <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
        </a>`;
      }
    }
  });
});
