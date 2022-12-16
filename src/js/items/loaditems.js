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

const avatarIconDOM = document.getElementById("avatarIcon");
const profileName = localStorage.getItem("userName");
const profile = await fetch(apiUrl + `/auction/profiles/${profileName}`, options);
const profileData = await profile.json();

if (bearerToken !== null) {
  if (profileData.avatar == null) {
    avatarIconDOM.innerHTML = `
    <span class="inline-flex items-center rounded-md shadow">
                  <p class="mx-auto px-4 py-2 text-base font-medium">${profileData.credits}</p>
                  <a href="" class="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50">
                    <span class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </a>
                </span>
    `;
  } else {
    avatarIconDOM.innerHTML = `
    <span class="inline-flex items-center rounded-md shadow">
                  <p class="mx-auto px-4 py-2 text-base font-medium">${profileData.credits}</p>
                  <a href="#" class="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50">
                    <span class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      <img src="${profileData.avatar}"></img>
                    </span>
                  </a>
                </span>`;
  }
}
