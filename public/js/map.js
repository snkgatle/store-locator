mapboxgl.accessToken =
  'pk.eyJ1Ijoia2FiZWxvIiwiYSI6ImNrY3V5eGtkNjA5OTMzMG8xbXFpdDIzNHoifQ.Y1duf95N56uwYeFXeBaqUg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [28.265569119101997,-25.703100123585926]
});

var storeList = null;
var stores = null;
var loaded = false;

async function loadAllStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();
  storeList = data;
  console.log(data)
  getStores(data);
  if(loaded) {
    addLayers();
  }
}

// Fetch stores from API
function getStores(data) {

 stores = data.data.map(store => {
    console.log('Loading store')
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });
}

// Load map with stores
// function loadMap(stores) {
  map.on('load', function() {
    loaded = true;
    if (stores == null) {
      return;
    }
    addLayers();
  });
// }

function addLayers() {
  map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
}

loadAllStores();
