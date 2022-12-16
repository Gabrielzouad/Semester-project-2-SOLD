import { apiUrl } from "../api/parameter.mjs";

const bearerToken = localStorage.getItem("accessToken");
const itemHeaderDOM = document.getElementById("itemHeader");
const itemDescriptionDOM = document.getElementById("itemDescription");
const itemCurrentBidDOM = document.getElementById("itemCurrentBid");
const itemTimeLeftDOM = document.getElementById("itemTimeLeft");
const itemImageContainerDOM = document.getElementById("itemImageContainer");
const itemAddBidDOM = document.getElementById("addBiddingButton");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const options = {
  headers: { Authorization: "bearer" + "" + bearerToken },
};

const response = await fetch(apiUrl + `/auction/listings/${id}?_bids=true&_seller=true`, options);
const data = await response.json();
console.log(data);

itemHeaderDOM.innerHTML = data.title;
itemDescriptionDOM.innerHTML = data.description;
itemImageContainerDOM.innerHTML = `<img src="${data.media[0]}" class="h-full w-full object-cover object-center">`;

// Calculate the number of days, hours, minutes, and seconds remaining for the item
setInterval(() => {
  const ends = new Date(data.endsAt);
  const current = new Date();
  const diff = ends - current;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  itemTimeLeftDOM.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}, 1000);

// finds the highest bidder for the given item
const bids = data.bids;

function getHighestBid(bids) {
  let highestBid = null;

  for (const bid of bids) {
    if (highestBid === null || bid.amount > highestBid.amount) {
      highestBid = bid;
    }
  }

  return highestBid;
}

const highestBid = getHighestBid(bids);

if (highestBid === null) {
  itemCurrentBidDOM.innerHTML = "There are no bids on this item";
} else {
  itemCurrentBidDOM.innerHTML = ` The highest bid is <span class="font-bold">${highestBid.amount}</span> by ${highestBid.bidderName}.`;
}

async function postBid(highestBid) {
  const price = document.getElementById("bid-amount").value;
  const currentBid = highestBid && highestBid.amount !== null ? highestBid.amount : 0;
  console.log(currentBid);

  const placeBid = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${bearerToken}`,
    },
    body: JSON.stringify({
      amount: parseInt(price),
    }),
  };

  if (isNaN(Number(price))) {
    // Log an error message if the price is not a valid number
    console.log("this is not a valid number");
  }

  if (price > currentBid) {
    try {
      // Make the API request to place the bid
      const bidResult = await fetch(apiUrl + `/auction/listings/${id}/bids`, placeBid);
      const json = await bidResult.json();
      location.reload();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  } else console.error("not working");
}

itemAddBidDOM.addEventListener("click", (e) => {
  e.preventDefault();
  postBid(highestBid);
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
