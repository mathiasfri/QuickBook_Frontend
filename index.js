//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import { setActiveLink, loadHtml, renderHtml } from "./utils.js";

import { initCreateHotel } from "./pages/createHotel/createHotel.js";
import { initSearchHotel } from "./pages/searchHotel/searchHotel.js";
import { initListHotels } from "./pages/showHotels/showHotels.js";
import { initLogin } from "./pages/login/login.js";
import { initSignup } from "./pages/signup/signup.js";

window.addEventListener("load", async () => {

  const templateHotels = await loadHtml("./pages/showHotels/showHotels.html");
  const templateCreateHotel = await loadHtml("./pages/createHotel/createHotel.html");
  const templateSearchHotels = await loadHtml("./pages/searchHotel/searchHotel.html");
  const templateSignup = await loadHtml("./pages/signup/signup.html");
  const templateLogin = await loadHtml("./pages/login/login.html");

  const templateNotFound = await loadHtml("./pages/notFound/notFound.html");

  // @ts-ignore
  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  // @ts-ignore
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () =>
      (document.getElementById("content").innerHTML = `
      <div class="container" style="width: 80%">
      <h1 style="color: black">QuickBook</h1>
    </div>

   `),
     "/hotels": () => {
      renderHtml(templateHotels, "content");
      initListHotels();
    },
    "/create-hotel": () => {
      renderHtml(templateCreateHotel, "content");
      initCreateHotel();
    },
    "/search-hotels": () => {
      renderHtml(templateSearchHotels, "content");
      initSearchHotel();
    },
    "/signup": () => {
      renderHtml(templateSignup, "content");
      initSignup();
    },
    "/login": () => {
      renderHtml(templateLogin, "content");
      initLogin();
    },
    "/logout": () => {
      logout();
      alert("You are now logged out");
    },
  
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content");
    })
    .resolve();
});


function logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  localStorage.removeItem("roles")
}

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};