const markers = [];

async function run() {
  // get bus data
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  locations.forEach((location, index) => {
    const longitude = location.attributes.longitude;
    const latitude = location.attributes.latitude;

    if (markers[index]) {
      markers[index].setLngLat([longitude, latitude]);
    } else {
      const marker = new mapboxgl.Marker({ background: "/blue.png" })
        .setLngLat([longitude, latitude])
        .addTo(map);
      markers.push(marker);
    }

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

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Foo",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [-66.324462, -16.024695],
      },
    },
  ],
};

function deshabilitarBoton() {
  document.getElementById("button").disabled = true;
}
