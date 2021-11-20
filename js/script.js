import {paises} from './paises.js';

let botonSearch = document.getElementById("botonBuscar");
let input = document.getElementById("buscadorIp");
let marker = null;

    let map = L.map('map');
    const urlOpenLayers = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
    L.tileLayer(urlOpenLayers, {
        maxZoom : 15
    }).addTo(map)
    var myIcon = L.icon ({
        iconUrl: './images/icon-location.svg',
        iconSize: [40, 45],
        iconAnchor: [22, 44],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    })
    map.removeControl(map.zoomControl)

const apiIpify = () => {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_bHHGBCMFsYDPHmGRFKyMmNO14eDvp&ipAddress=${input.value}`;

        fetch(url)    
        .then(data => data.json())
        .then(data => {
            updateDatos(data);
            if(marker){
                map.removeLayer(marker)
            }
            map.setView([data.location.lat, data.location.lng], 80);
            marker = L.marker([data.location.lat, data.location.lng],{icon: myIcon}).addTo(map);
        })
}
const buscarIp = (e) => {
    e.preventDefault()
    apiIpify()
}
const updateDatos = (datos) => {
    let contenedor = document.getElementById("resultado");
    contenedor.innerHTML = `
    <div>
        <p>Ip address</p>
        <span>${datos.ip}</span>
    </div>
    <div>
        <p>Location</p>
        <span>${convertirNombrePais(datos.location.country)} ${datos.location.region}</span>
    </div>
    <div>
        <p>Timezone</p>
        <span>UTC ${datos.location.timezone}</span>
    </div>
    <div>
        <p>Isp</p>
        <span>${datos.isp}</span>
    </div>
    `
}
const convertirNombrePais = (iso) => {
    return paises[iso]

}
window.addEventListener("load", apiIpify)
botonSearch.addEventListener("click", buscarIp);