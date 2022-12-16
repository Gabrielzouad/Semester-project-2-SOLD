import { apiUrl } from "../api/parameter.mjs";
const bearerToken = localStorage.getItem("accessToken");
const itemNameInputDOM = document.getElementById("itemNameInput");
const descriptionInputDOM = document.getElementById("descriptionInput");
const categoryNameInputDOM = document.getElementById("categoryInput");
const imageInputDOM = document.getElementById("imageInput");
const timeInputDOM = document.getElementById("timeInput");
const createListingButtonDOM = document.getElementById("createListingButton");

async function handleSubmit(e) {
  e.preventDefault();
  if (itemNameInputDOM.value && timeInputDOM.value) {
    try {
      const newListing = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          title: itemNameInputDOM.value, // Required
          description: descriptionInputDOM.value, // Optional
          tags: [categoryNameInputDOM.value], // Optional
          media: [imageInputDOM.value], // Required
          endsAt: timeInputDOM.value, // Required
        }),
      };

      const postListing = await fetch(apiUrl + "/auction/listings", newListing);
      return postListing;
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("error");
  }
}

createListingButtonDOM.addEventListener("click", (e) => {
  handleSubmit(e);
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
