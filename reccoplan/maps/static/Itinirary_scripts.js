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

async function getUserID() {
    var url = "http://127.0.0.1:8000/api/get-current-user-id/";
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const userID = data.user_id; // Assuming the ID is in the response
        console.log("userID", userID)
        return userID;
    } catch (error) {
        console.error("Error(no such user):", error);
        throw error; // Rethrow the error to propagate it
    }
}


const csrftoken = getCookie('csrftoken');



// async function getItineraryID() {
//     var url = "http://127.0.0.1:8000/itinerary/api/itinerary-list/";

//     try {
//         console.log("try")
//         const resp = await fetch(url);
//         const data = await resp.json();
//         const itineraryID = data[0].id; // Assuming the ID is the first item in the response array
//         return itineraryID;
//     } catch (error) {
//         console.error("Error:", error);
//         console.log('cannot bro')

//         // missing itinerary, lets create it
//         var createUrl = "http://127.0.0.1:8000/itinerary/api/itinerary-create/";
//         try {
//             const resp = await fetch(createUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': csrftoken
//                 },
//                 body: JSON.stringify({
//                     "name": "Itinerary",
//                     "user": await parseInt(getUserID())
//                 })
//             });
//             const newData = await resp.json();
//             return newData.id; // Return the ID of the newly created itinerary
//         } catch (error) {
//             console.error("Error creating itinerary:", error);
//             throw error; // Rethrow the error to propagate it
//         }
//     }
// }
