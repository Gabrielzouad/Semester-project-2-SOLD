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
