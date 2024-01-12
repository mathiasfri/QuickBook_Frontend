import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions } from "../../utils.js"

export async function initSearchHotel(){
    var id;
    document.getElementById("search").addEventListener("click", async function(){
        try{
            // @ts-ignore
            id = document.getElementById("id").value;
            const GET_URL = (API_URL + "/hotel/" + id);
    
            const response = await fetch(GET_URL, makeOptions("GET", null)).then(handleHttpErrors);
            const res = response;

            const row = `
              <tr>
                <td>${res.id}</td>
                <td>${res.name}</td>
                <td>${res.street}</td>
                <td>${res.city}</td>
                <td>${res.zip}</td>
                <td>${res.country}</td>
                <td>${res.rooms}</td>
              </tr>
            `;
              const safeRows = sanitizeStringWithTableRows(row)
              document.getElementById("tablerows").innerHTML = safeRows
        } catch (err){
            console.log(err)
        }
    });

    document.getElementById("delete").addEventListener("click", async function(){
        try{
            // @ts-ignore
            id = document.getElementById("id").value;
            const DELETE_URL = (API_URL + "/hotel/delete/" + id);
            const response = await fetch(DELETE_URL, makeOptions("DELETE", null)).then(handleHttpErrors);
        } catch (err){
            console.log(err)
        }
    });
} 