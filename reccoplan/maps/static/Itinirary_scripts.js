function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

async function getItineraryID() {
    var url = "http://127.0.0.1:8000/itinerary/api/itinerary-list/";

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const itineraryID = data[0].id; // Assuming the ID is the first item in the response array
        return itineraryID;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error to propagate it
    }
}