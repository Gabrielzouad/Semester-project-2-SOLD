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
        title: createTitle.value, // Required
        description: createBody.value, // Optional
        tags: createTag.value, // Optional
        media: createImage.value, // Optional
        endsAt: endTime, // Required
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
