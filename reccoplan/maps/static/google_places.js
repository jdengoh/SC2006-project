
var CurPosition;
var CurPlace;
var searchResultMarkers = [];
var nearbyPlacesMarkers = [];

let map;
let autocomplete;

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



async function getItineraryID() {
    var url = "http://127.0.0.1:8000/itinerary/api/itinerary-list/";

    try {
        // console.log("try")
        const resp = await fetch(url);
        const data = await resp.json();
        if (data[0] == null) {
            throw "No itineraries found"
        }
        const itineraryID = data[0].id; // Assuming the ID is the first item in the response array
        return itineraryID;
    } catch (error) {
        console.error("Error:", error);
        // console.log('cannot bro')

        // missing itinerary, lets create it
        var createUrl = "http://127.0.0.1:8000/itinerary/api/itinerary-create/";
        console.log( await getUserID())
        try {
            const resp = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                
                body: JSON.stringify({
                    "name": "Itinerary",
                    "user": await getUserID(),
                })
            });
            const newData = await resp.json();
            return newData.id; // Return the ID of the newly created itinerary
        } catch (error) {
            console.error("Error creating itinerary:", error);
            throw error; // Rethrow the error to propagate it
        }
    }
}

function initMap(){
   /*var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    map = new google.maps.Map(document.getElementById('map'),
    {
        center:{lat:23.346, lng: 113.684},
        zoom:8,
    });*/
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    currLoct = { lat: 23.23, lng: 113.13};
    map = new google.maps.Map(document.getElementById("map"), {
        center: currLoct,
        zoom: 15,
        mapId: "8d193001f940fde3",
    });


    const locationButton = document.getElementById('button');
    locationButton.textContent = 'Search for Nearby Activities';
    locationButton.classList.add('map-button');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    const CL_Button = document.getElementById('CL_button');
    CL_Button.textContent = 'Search for Current Location';
    CL_Button.classList.add('CL_button');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(CL_Button);

    
    CL_Button.addEventListener('click',()=> {
        clearAllMarkers();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (CL_position) => {
                    const CL_pos = {
                        lat: CL_position.coords.latitude,
                        lng: CL_position.coords.longitude,
                    };
                    map.setCenter(CL_pos);
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: CL_pos }, (results, status) =>{
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                // Get the first result which represents the closest address
                                const place = results[0];

                                // Extract relevant information from the result
                                const formattedAddress = place.formatted_address;
                                CurPlace = place;
                                CurPosition = CL_pos;
                                console.log('Formatted Address:', formattedAddress);
                                console.log('CurPlace:', CurPlace);
                                console.log('CurPosition', CurPosition);

                                // Now you can use the formatted address as needed
                                // For example, display it to the user
                            } else {
                                console.error('No results found');
                            }
                        } else {
                            console.error('Geocoder failed due to: ' + status);
                        }
                    });
                    var marker = new google.maps.Marker({
                        CL_position:CL_pos,
                        map:map,
                    });
                    CurPosition = CL_pos;
                    marker.setVisible(false);
                    marker.setPosition(CL_pos);
                    map.setZoom(17);
                    marker.setVisible(true);
                    //Push the marker into the array
                    searchResultMarkers.push(marker);
                },
                (error) => {
        // Handle error
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            default:
                console.error("An unknown error occurred.");
                }
            }
        );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    });
    
    autocomplete.addListener('place_changed',()=>{ 
        clearAllMarkers();
        const place = autocomplete.getPlace();
        const position = place.geometry.location;
        CurPlace= place;
        CurPosition = position;
        var marker = new google.maps.Marker({
                        position: position,
                        map:map,
                    });  
        marker.setVisible(false);
        if(!place.geometry || !place.geometry.location){
            window.alert("No information found for ", + place.name + "." );
        } else {
        if(CurPlace.geometry.viewport){
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place);
            map.setZoom(17);
        }
       
        }
        marker.setPosition(position);
        marker.setVisible(true);
        searchResultMarkers.push(marker);

    }); 

    locationButton.addEventListener('click',()=> {
        console.log('position:', CurPlace);
        service.nearbySearch(
        {location: CurPosition, radius: 500, type: ["store"] },
        (results, status, pagination) => {
            //if (status !== "OK" || !results) return;
            addPlaces(results, map,nearbyPlacesMarkers);
            moreButton.disabled = !pagination || !pagination.hasNextPage;
            if (pagination && pagination.hasNextPage) {
                getNextPage = () => {
                // Note: nextPage will call the same handler function as the initial call
                pagination.nextPage();
                };
            }
        },
    );
    });
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");

    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) {
            getNextPage();
        }
    };

    // Perform a nearby search.

}
async function getPlaceDetails(place, map) {
    let postalCode = '';
    let address = '';
    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: place.reference,
            fields: ['address_component']
        }, (placeResult, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < placeResult.address_components.length; i++) {
                    const addressType = placeResult.address_components[i].types[0];
                    if (addressType === 'postal_code') {
                        postalCode = placeResult.address_components[i]['long_name'];
                    }
                    if (addressType === 'street_number' || addressType === 'route') {
                        address += placeResult.address_components[i]['long_name'] + ' ';
                    }
                    if (addressType === 'locality') {
                        address += placeResult.address_components[i]['long_name'] + ', ';
                    }
                    if (addressType === 'neighborhood') {
                        address += placeResult.address_components[i]['long_name'] + ' ';
                    }
                    if (addressType === 'subpremise') {
                        address += placeResult.address_components[i]['long_name'] + ' ';
                    }
                }
                console.log('Address:', address);
                console.log('Postal Code:', postalCode);
                resolve({ address, postalCode });
            } else {
                reject(status);
            }
        });
    });
}


async function addPlaces(places, map, markerArray) {

    clearMarkers(markerArray);

    const placesList = document.getElementById("places");
    placesList.innerHTML = '';

    if (places.length === 0) {
        noPlacesFound(map);
        } else {
            placesList.innerHTML = ''
            placesList.innerHTML +=
            `<thead>
                <tr>
                    <th>Activity</th>
                    <th>Link</th>
                    <th>Add?</th>

                </tr>
            </thead>

            <tbody>`
            var i=0;
            for (const place of places) {
                //console.log("PLACES BELOW")
                // console.log(place)
                // Get place details using PlacesService
            const { address, postalCode } = await getPlaceDetails(place, map);

                if (place.geometry && place.geometry.location) {
                    const image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25),
                    };

                    const marker = new google.maps.Marker({
                        map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location,
                    });

                    markerArray.push(marker);
                    var item = 
                    `<tr>
                        <td>${place.name}</td>
                        <td>${address} ${postalCode}</td>
                        <td>
                            <button id="add_activity_${i}" class="btn btn-secondary"> Add </button>
                        </td>
                    </tr>
                    `
                    placesList.innerHTML += item
                    i++;
                    //console.log(i)
                    //const li = document.createElement("li");
                    //li.textContent = place.name;
                    //placesList.appendChild(li);
                    //li.addEventListener("click", () => {
                    //map.setCenter(place.geometry.location);
                    //});                        }
                }
            
        placesList.innerHTML += `</tbody>`
        }
    }

        j=0;
        for (const place of places) {
            const { address, postalCode } = await getPlaceDetails(place, map);
            let add_act = "add_activity_"
            let id = add_act.concat(j.toString())
            console.log(id)
            var createbtn = document.getElementById(id)
            if (createbtn) {
                createbtn.addEventListener('click', (function(){
                //returZZZZZZn function(){
                createItem(place, address, postalCode)
                })
        // }(places[i]))
            )
            }
            j++;
        }

}
// function createItem(place){
//     (async () => {
//         const i_id = await getItineraryID();
//         var url = "http://127.0.0.1:8000/api/location-create/"

//         fetch(url, {
//             method:'POST',
//             headers:{
//                 'Content-type':'application/json',
//                 'X-CSRFtoken': csrftoken
//             },
//             body:JSON.stringify({
//                 'name': place.name,
//                 "postal_code" : 12345,
//                 'address': place.reference,
//                 'itineraryID': parseInt(i_id),
//             })
//         })

//         })();
    
// }
async function createItem(place, address, postalCode){
    try {
        
        var restuarant_url = "http://127.0.0.1:8000/itinerary/api/restaurants-list/";
        const resp_check = await fetch(restuarant_url);
        const data_check = await resp_check.json();

        if (data_check[0] != null) {
            const i_id = await getItineraryID();
            id = data_check[0].id;
            var url = `http://127.0.0.1:8000/api/location-update/${id}/`;
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFtoken': csrftoken
                },
                body: JSON.stringify({
                    "name": place.name,
                    "postal_code": postalCode,
                    "address": address,
                    "itineraryID": parseInt(i_id),
                    "is_Restaurant": true,
                })
                });
            // console.log(place.name, postalCode, address)
            // console.log("Location created:", resp);

            //delete all previous activities
            url_activities = `http://127.0.0.1:8000/itinerary/api/itinerary-list/`

            resp_activities = await fetch(url_activities);
            data_activities = await resp_activities.json();
            activities = data_activities[0].activities;

            if (activities.length > 0) {
                for (const activity of activities) {
                    if (activity.id != id) {
                        url_del = `http://127.0.0.1:8000/api/location-delete/${activity.id}/`
                        fetch(url_del, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json',
                                'X-CSRFtoken': csrftoken
                            }
                        });
        
                     }
                }
            }

        }
        else {
            const i_id = await getItineraryID();
        var url = "http://127.0.0.1:8000/api/location-create/";

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFtoken': csrftoken
            },
            body: JSON.stringify({
                "name": place.name,
                "postal_code": postalCode,
                "address": address,
                "is_Restaurant": true,
                "itineraryID": parseInt(i_id),
            })
        });
        } 
    } catch (error) {
        console.error("Error creating location:", error);
        throw error;
    }
}

// function setMapOnAll(map) {
//     for (let i = 0; i < markerArray.length; i++) {
//             markers[i].setMap(map);
// }
//     markers=[];
// }

function clearMarkers(markerArray) {
markerArray.forEach(marker => {
    marker.setMap(null);
});
markerArray.length = 0;
}

// Function to clear all markers
function clearAllMarkers() {
clearMarkers(nearbyPlacesMarkers);
clearMarkers(searchResultMarkers);
}

function noPlacesFound(map){
    const placesList = document.getElementById("places");
    placesList.innerHTML = '';
}

window.initMap = initMap;

   

// function initAutocomplete() {
//     var input = document.getElementById('pac-input');
//     var autocomplete = new google.maps.places.Autocomplete(input);
    
// }


function AutoComplete(map){
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
    autocomplete.bindTo('bounds',map);          
    }



    