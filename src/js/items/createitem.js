import { apiUrl } from "../api/parameter.mjs";
const bearerToken = localStorage.getItem("accessToken");
const options = {
  headers: { Authorization: "bearer" + "" + bearerToken },
};

async function handleSubmit(event) {
  console.log(createTitle.value, createBody.value);
  event.preventDefault();
  try {
    const postUserToApi = await fetch(apiUrl + "/auction/listings", options, {
      method: "POST",
      body: JSON.stringify({
        title: createTitle.value, // RequiredS
        body: createBody.value, // Required
        media: createImage.value, // Optional
      }),
    });
    const response = await postUserToApi.json();
    console.log(response);
    window.location.reload(false);
  } catch (e) {
    console.log(e);
  }
}

createButtonDOM.addEventListener("click", handleSubmit);
