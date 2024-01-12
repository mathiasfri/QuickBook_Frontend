import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions } from "../../utils.js"

export function initLogin() {
    // @ts-ignore
    document.getElementById("login-btn").onclick = login;
    document.getElementById("login-message").innerText = ""
    
    const usernameInput = document.getElementById("username-input")
    const passwordInput = document.getElementById("password-input")

    async function login(evt){
        evt.preventDefault();
        evt.stopPropagation();

        const loginRequest = { 
            // @ts-ignore
            username: usernameInput.value, 
            // @ts-ignore
            password: passwordInput.value 
        };

        try {
            const options = makeOptions("POST", loginRequest);
            const response = await fetch(API_URL + "/login", options).then(handleHttpErrors);
            storeLoginDetails(response);
        } catch (err) {
            console.log(err);
        }

        if (localStorage.getItem("token") !== null) {
            // @ts-ignore
            usernameInput.value = ""
            // @ts-ignore
            passwordInput.value = ""
            document.getElementById("login-message").innerText = "You are now logged in to: " + localStorage.getItem("user")
        }
        else {
            document.getElementById("login-message").innerText = "Login failed"
        }
    }

    function storeLoginDetails(res) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", res.username)
        localStorage.setItem("roles", res.roles)

        //toggleUiBasedOnRoles(true);
    }
}