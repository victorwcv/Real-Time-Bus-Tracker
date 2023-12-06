const markers = [];

async function run() {
  // get bus data
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  locations.forEach((location, index) => {
    const longitude = location.attributes.longitude;
    const latitude = location.attributes.latitude;
    //add markers on the map
    if (markers[index]) {
      markers[index].setLngLat([longitude, latitude]);
    } else {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([longitude, latitude])
        .addTo(map);
      markers.push(marker);
    }
    //shows the coordinates of the buses on the console
    console.log(latitude, longitude);
  });
  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

// Tocken from mapbox
mapboxgl.accessToken =
  "pk.eyJ1Ijoid2lsbGlhbTE2OTUiLCJhIjoiY2xwb3EweDJ0MHFrMzJrcjR2MHBsdjVjYyJ9.y6qrRa3Chl84gYfKC75ohA";

// Rendering map
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 12,
});

// disable the trace start button
function deshabilitarBoton() {
  document.getElementById("button").disabled = true;
}
