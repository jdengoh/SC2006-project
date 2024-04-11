var CurPosition;
var CurPlace;
var searchResultMarkers = [];
var nearbyPlacesMarkers = [];

let map;
let autocomplete;
function initMap() {
    /*var input = document.getElementById('pac-input');
     var autocomplete = new google.maps.places.Autocomplete(input);
     map = new google.maps.Map(document.getElementById('map'),
     {
         center:{lat:23.346, lng: 113.684},
         zoom:8,
     });*/
    var input = document.getElementById('pac-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    currLoct = { lat: 23.23, lng: 113.13 };
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


    CL_Button.addEventListener('click', () => {
        clearAllMarkers();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (CL_position) => {
                    const CL_pos = {
                        lat: CL_position.coords.latitude,
                        lng: CL_position.coords.longitude,
                    };
                    map.setCenter(CL_pos);
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: CL_pos }, (results, status) => {
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
                        CL_position: CL_pos,
                        map: map,
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
                    switch (error.code) {
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

    autocomplete.addListener('place_changed', () => {
        clearAllMarkers();
        const place = autocomplete.getPlace();
        const position = place.geometry.location;
        CurPlace = place;
        CurPosition = position;
        var marker = new google.maps.Marker({
            position: position,
            map: map,
        });
        marker.setVisible(false);
        if (!place.geometry || !place.geometry.location) {
            window.alert("No information found for ", + place.name + ".");
        } else {
            if (CurPlace.geometry.viewport) {
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

    locationButton.addEventListener('click', () => {
        console.log('position:', CurPlace);
        service.nearbySearch(
            { location: CurPosition, radius: 500, type: "store" },
            (results, status, pagination) => {
                //if (status !== "OK" || !results) return;
                addPlaces(results, map, nearbyPlacesMarkers);
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



function addPlaces(places, map, markerArray) {

    clearMarkers(markerArray);

    const placesList = document.getElementById("places");
    placesList.innerHTML = '';

    if (places.length === 0) {
        noPlacesFound(map);
    } else {
        for (const place of places) {
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


                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                    map.setCenter(place.geometry.location);
                });
            }
        }
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

function noPlacesFound(map) {
    const placesList = document.getElementById("places");
    placesList.innerHTML = '';
}

window.initMap = initMap;



// function initAutocomplete() {
//     var input = document.getElementById('pac-input');
//     var autocomplete = new google.maps.places.Autocomplete(input);

// }


function AutoComplete(map) {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
    autocomplete.bindTo('bounds', map);
}