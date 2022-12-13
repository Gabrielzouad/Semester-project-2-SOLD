import { apiUrl } from "./parameter.mjs";

const email = document.getElementById("email-address");
const username = document.getElementById("username");
const password = document.getElementById("password");
const buttonDOM = document.getElementById("registerSubmit");

async function registerUser(e) {
  e.preventDefault();
  try {
    const response = await fetch(apiUrl + "/auction/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await response.json();
    if (result === 200) {
      window.location.href = ".././index.html";
    }
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

buttonDOM.addEventListener("click", registerUser);
