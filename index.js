const center = [48.84497573035927, 2.4247001358237523];

function convertToGpfURL(gppURL) {
  return "https://data.geopf.fr/wmts?"
  // return gppURL
}

const mapGpp = L.map('mapGpp', {
    center: center,
    zoom: 18
});

mapGpp.attributionControl.setPrefix('');

const mapGpf = L.map('mapGpf', {
    center: center,
    zoom: 18,
    zoomControl: false
});

mapGpp.sync(mapGpf);
mapGpf.sync(mapGpp);

Gp.Services.getConfig({
  customConfigFile: 'fullConfig.json',
  onSuccess: go,
  onFailure: (e) => {console.log(e)}
});

function go () {
  const search = L.geoportalControl.SearchEngine({});
  mapGpp.addControl(search);
  const lyr = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  const lyr2 = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  gpfUrl = convertToGpfURL(lyr._url);
  lyr2._url = gpfUrl;
  lyr.addTo(mapGpp);
  lyr2.addTo(mapGpf);

  document.getElementById("submit").addEventListener("click", () => {
    const lyr = L.geoportalLayer.WMTS({
      layer: document.getElementById("gppId").value,
    });
    const lyr2 = L.geoportalLayer.WMTS({
      layer: document.getElementById("gppId").value,
    });
    gpfUrl = convertToGpfURL(lyr._url);
    lyr2._url = gpfUrl;
    mapGpp.eachLayer(function (layer) {
      mapGpp.removeLayer(layer);
    });
    mapGpf.eachLayer(function (layer) {
      mapGpf.removeLayer(layer);
    });
    lyr.addTo(mapGpp);
    lyr2.addTo(mapGpf);
  });
}

