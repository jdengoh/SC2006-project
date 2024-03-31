/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck TODO remove when fixed
// [START maps_places_searchbox]
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // [START maps_places_searchbox_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  // [END maps_places_searchbox_getplaces]
}

$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + AIzaSyDL77OS5N8c5X2khsmnCs-xvOk5z5Ig9oU + "&libraries=places") 
.done(function( script, textStatus ) {
    google.maps.event.addEventListener(window, "load", initAutoComplete)
})

// window.initAutocomplete = initAutocomplete;
window.initMap = initMap;
function Autocomplete(){
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'));
  autocomplete.bintTo('bounds',map);
  const auto_marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0,0-29),
  });

  autocomplete.addListener('place_changed',()=>{
    auto_marker.setVisible(false);
    const place = autocomplete.getPlace();
    const position = place.geometry.location;
    if(!place.grometry || !place.geometry.location){
      window.alert("No information found for ", + place.name + "." );
    } else {
      if(place.geometry.viewport){
        map.fitbounds(place.geometry.viewport);
      } else {
        map.setCenter(position);
        map.setZoom(17);
      }
    }
    auto_marker.setPosition(position);
    auto_marker.setVisible(true);
  })
}
// [END maps_places_searchbox]


// /**
//  * @license
//  * Copyright 2022 Google LLC. All Rights Reserved.
//  * SPDX-License-Identifier: Apache-2.0
//  */


// // [START maps_place_autocomplete_element]

// async function initMap() {
//     // [START maps_place_autocomplete_element_add]
//     // Request needed libraries.
//     //@ts-ignore
    
//     const [{ Map }] = await Promise.all([google.maps.importLibrary("places")]);
//     // Create the input HTML element, and append it.
//     //@ts-ignore
//     const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();
//     // Create the map.
//     const pyrmont = { lat: -33.866, lng: 151.196 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: pyrmont,
//         zoom: 17,
//         mapId: "8d193001f940fde3",
//       });
//     // Create the places service.
//     const service = new google.maps.places.PlacesService(map);
//     let getNextPage;
//     const moreButton = document.getElementById("more");

//     moreButton.onclick = function () {
//       moreButton.disabled = true;
//       if (getNextPage) {
//         getNextPage();
//       }
//     };
//     service.nearbySearch(
//       { location: pyrmont, radius: 500, type: "store" },
//       (results, status, pagination) => {
//         if (status !== "OK" || !results) return;
  
//         addPlaces(results, map);
//         moreButton.disabled = !pagination || !pagination.hasNextPage;
//         if (pagination && pagination.hasNextPage) {
//           getNextPage = () => {
//             // Note: nextPage will call the same handler function as the initial call
//             pagination.nextPage();
//           };
//         }
//       },
//     );
  
//     //@ts-ignore
//     document.body.appendChild(placeAutocomplete);
  
//     // [END maps_place_autocomplete_element_add]
//     // Inject HTML UI.
//     const selectedPlaceTitle = document.createElement("p");
  
//     selectedPlaceTitle.textContent = "";
//     document.body.appendChild(selectedPlaceTitle);
  
//     const selectedPlaceInfo = document.createElement("pre");
  
//     selectedPlaceInfo.textContent = "";
//     document.body.appendChild(selectedPlaceInfo);
//     // [START maps_place_autocomplete_element_listener]
//     // Add the gmp-placeselect listener, and display the results.
//     //@ts-ignore
//     placeAutocomplete.addEventListener("gmp-placeselect", async ({ place }) => {
//       await place.fetchFields({
//         fields: ["displayName", "formattedAddress", "location"],
//       });
//       selectedPlaceTitle.textContent = "Selected Place:";
//       selectedPlaceInfo.textContent = JSON.stringify(
//         place.toJSON(),
//         /* replacer */ null,
//         /* space */ 2,
//       );
//     });
//     // [END maps_place_autocomplete_element_listener]
//   }
  
//   //initMap();
//   // [END maps_place_autocomplete_element]