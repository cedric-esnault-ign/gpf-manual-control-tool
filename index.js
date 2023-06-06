const center = [48.84497573035927, 2.4247001358237523];

function convertToGpfURL(gppURL) {
  return gppURL
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
  apiKey: "calcul,ortho",
  onSuccess: go
});

function go () {
  const search = L.geoportalControl.SearchEngine({});
  mapGpp.addControl(search);
  const lyr = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  gpfUrl = convertToGpfURL(lyr._url);
  const lyr2 = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  lyr2._url = gpfUrl;
  lyr.addTo(mapGpp);
  lyr2.addTo(mapGpf);

  document.getElementById("submit").addEventListener("click", () => {
  });
}

