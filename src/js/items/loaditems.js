import { apiUrl } from "../api/parameter.mjs";

const listingsDOM = document.getElementById("listings");
const bearerToken = localStorage.getItem("accessToken");
const searchInputDOM = document.getElementById("searchInput");

const options = {
  headers: { Authorization: "bearer" + "" + bearerToken },
};

const response = await fetch(apiUrl + "/auction/listings?sortOrder=desc&_active=true", options);
const data = await response.json();

data.forEach((listing) => {
  if (!(listing.media.length == 0) || listing.media === null) {
    listingsDOM.innerHTML += `
      <a id="${listing.id}" class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
        <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
      </a>`;
  } else {
    console.log("no image");
  }
});

searchInputDOM.addEventListener("keydown", (event) => {
  const query = searchInputDOM.value.trim().toLowerCase();
  listingsDOM.innerHTML = "";

  data.forEach((listing) => {
    if (listing.title.toLowerCase().includes(query) && (!(listing.media.length == 0) || listing.media === null)) {
      listingsDOM.innerHTML += `
        <a "id="${listing.id}" onclick="${redirectIfLocalStorageTrue}()" class="group">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img src="${listing.media[0]}" alt="${listing.title}" class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
          <h3 class="mt-4 text-sm text-gray-700">${listing.title}</h3>
          <p class="mt-1 text-lg font-thin text-gray-500">Total bids <span class="text-gray-900 font-bold">${listing._count.bids}<span></p>
        </a>`;
    } else {
      console.log("no image");
    }
  });
});

function redirectIfLocalStorageTrue() {
  if (localStorage.getItem()) {
    window.location.href = `productpage.html/${listing.id}`;
  } else {
    window.location.href = "signup.html";
  }
}
