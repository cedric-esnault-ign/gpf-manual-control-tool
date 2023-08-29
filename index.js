const center = [48.84497573035927, 2.4247001358237523];

function convertToGpfWmtsURL(gppURL) {
  return "https://data.geopf.fr/wmts?"
  // return gppURL
}

function convertToGpfWmsURL(gppURL) {
  return "https://data.geopf.fr/wms-v/ows?"
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
  const lyrGpp = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  const lyrGpf = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
  });
  gpfUrl = convertToGpfWmtsURL(lyrGpp._url);
  lyrGpf._url = gpfUrl;
  lyrGpp.addTo(mapGpp);
  lyrGpf.addTo(mapGpf);

  document.getElementById("submit").addEventListener("click", () => {
    const service = document.querySelector('input[name="radioService"]:checked').value;
    let lyrGpp;
    let lyrGpf;
    let gpfUrl;
    if (service === "wmts") {
      lyrGpp = L.geoportalLayer.WMTS({
        layer: document.getElementById("gppId").value,
      });
      lyrGpf = L.geoportalLayer.WMTS({
        layer: document.getElementById("gppId").value,
      });
      gpfUrl = convertToGpfWmtsURL(lyrGpp._url);
    } else if (service === "wms") {
      lyrGpp = L.geoportalLayer.WMS({
        layer: document.getElementById("gppId").value,
      });
      lyrGpp.options.styles = "";
      lyrGpp.wmsParams.styles = "";
      console.log(lyrGpp);
      lyrGpf = L.geoportalLayer.WMS({
        layer: document.getElementById("gppId").value,
      });
      lyrGpf.options.styles = "";
      lyrGpf.wmsParams.styles = "";
      gpfUrl = convertToGpfWmsURL(lyrGpp._url);
    }
    lyrGpf._url = gpfUrl;
    mapGpp.eachLayer(function (layer) {
      mapGpp.removeLayer(layer);
    });
    mapGpf.eachLayer(function (layer) {
      mapGpf.removeLayer(layer);
    });
    lyrGpp.addTo(mapGpp);
    lyrGpf.addTo(mapGpf);
  });
}

