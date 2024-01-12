import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions } from "../../utils.js"

export async function initCreateHotel() {
    try{
        // @ts-ignore
        const name = document.getElementById("name").value;
        // @ts-ignore
        const street = document.getElementById("street").value;
        // @ts-ignore
        const city = document.getElementById("city").value;
        // @ts-ignore
        const zip = document.getElementById("zip").value;
        // @ts-ignore
        const country = document.getElementById("country").value;
        // @ts-ignore
        const rooms = document.getElementById("rooms").value;
    
        const hotel = { name, street, city, zip, country, rooms };
    
        const response = await fetch(API_URL + "/hotel/create", makeOptions("PUT", hotel));
    
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
            alert("Hotel was created successfully")
            window.location.href = "/";
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
}