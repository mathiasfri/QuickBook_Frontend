import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions } from "../../utils.js"




export function initSignup() {
    const signupButton = document.getElementById("btn-signup");

    if (signupButton){
        signupButton.addEventListener("click", async function (event){
            event.preventDefault();
            event.stopPropagation();
            try {
                await createUser();
                alert("User was created successfully")
                window.location.href = "/";
            } catch (err) {
                console.log(err);
            }
        });
    }
 
}

document.addEventListener("DOMContentLoaded", initSignup);

async function createUser() {
    const URL = API_URL + "/guest/create";
    
    // @ts-ignore
    const username = document.getElementById("username").value;
    // @ts-ignore
    const password = document.getElementById("password").value;
    // @ts-ignore
    const email = document.getElementById("email").value;
    // @ts-ignore
    const firstName = document.getElementById("firstName").value;
    // @ts-ignore
    const lastName = document.getElementById("lastName").value;
    // @ts-ignore
    const phoneNumber = document.getElementById("phoneNumber").value;           
    const guest = { username, password, email, firstName, lastName, phoneNumber };

    const options = makeOptions("PUT", guest);
    const response = await fetch(URL, options).then(handleHttpErrors);

    if (response.ok) {
        // User signup was successful
        const responseData = await response.json();
        return responseData;
        alert("User was created successfully")
        window.location.href = "/";
      } else {
        // User signup failed
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
}


