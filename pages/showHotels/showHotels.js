import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"

export async function initListHotels() {
    try{
        const URL = API_URL + "/hotel"
        const hotels = await fetch(URL).then(handleHttpErrors)
        const rows = hotels.map(hotel =>  { 
            return `
            <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${hotel.street}</td>
                <td>${hotel.city}</td>
                <td>${hotel.zip}</td>
                <td>${hotel.country}</td>
                <td>${hotel.rooms}</td>
            </tr>
            `}).join("\n")
        const safeRows = sanitizeStringWithTableRows(rows)
        document.getElementById("tablerows").innerHTML = safeRows
    } catch (err){
        console.log(err)
    }
}