import {map} from './config/peta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';

document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/waypoint.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.alamat;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polygon.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.nama;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});


document.addEventListener("DOMContentLoaded", () => {
    const PointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polyline.json") // Ganti "geojsondrawpoint.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            let rowNum = 1; // Nomor urut awal
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = PointTable.insertRow();
                    const numCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const coordinatesCell = row.insertCell(2);
                    const typeCell = row.insertCell(3);
                    
                    numCell.innerText = rowNum; // Mengisi nomor urut
                    nameCell.innerText = feature.properties.jalan;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                    rowNum++; // Menambah nomor urut setiap kali menambahkan baris
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import { Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

// Definisikan URL GeoJSON untuk masing-masing jenis fitur
const polygonGeoJSONUrl = 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polygon.json';
const lineStringGeoJSONUrl = 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polyline.json';
const pointGeoJSONUrl = 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/waypoint.json';

// Buat sumber vektor dan lapisan vektor untuk masing-masing jenis fitur
const polygonSource = new VectorSource({
    format: new GeoJSON(),
    url: polygonGeoJSONUrl,
});

const lineStringSource = new VectorSource({
    format: new GeoJSON(),
    url: lineStringGeoJSONUrl,
});

const pointSource = new VectorSource({
    format: new GeoJSON(),
    url: pointGeoJSONUrl,
});

const polygonLayer = new VectorLayer({
    source: polygonSource,

});

const lineStringLayer = new VectorLayer({
    source: lineStringSource,

});

const pointLayer = new VectorLayer({
    source: pointSource,

});

// Tambahkan lapisan-lapisan ke peta
map.addLayer(polygonLayer);
map.addLayer(lineStringLayer);
map.addLayer(pointLayer);

onClick('popup-closer', onClosePopupClick);
onClick('insertmarkerbutton', onSubmitMarkerClick);
onClick('hapusbutton', onDeleteMarkerClick);
onClick('hitungcogbutton', getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);



// document.addEventListener("DOMContentLoaded", () => {
//     const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

//     fetch("waypoint.json") // Ganti "data.json" dengan nama file JSON Anda
//         .then(response => response.json())
//         .then(data => {
//             data.features.forEach(feature => {
//                 if (feature.geometry.type === "Point") {
//                     const row = pointTable.insertRow();
//                     const nameCell = row.insertCell(0);
//                     const coordinatesCell = row.insertCell(1);
//                     const typeCell = row.insertCell(2);
//                     nameCell.innerText = feature.properties.alamat;
//                     coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
//                     typeCell.innerText = feature.geometry.type;
                    
//                 }
//             });
//         })
//         .catch(error => console.error("Terjadi kesalahan:", error));
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

//     fetch("polygon.json") // Ganti "data.json" dengan nama file JSON Anda
//         .then(response => response.json())
//         .then(data => {
//             data.features.forEach(feature => {
//                 if (feature.geometry.type === "Polygon") {
//                     const row = pointTable.insertRow();
//                     const nameCell = row.insertCell(0);
//                     const coordinatesCell = row.insertCell(1);
//                     const typeCell = row.insertCell(2);
//                     nameCell.innerText = feature.properties.nama;
//                     coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
//                     typeCell.innerText = feature.geometry.type;
                    
//                 }
//             });
//         })
//         .catch(error => console.error("Terjadi kesalahan:", error));
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

//     fetch("polyline.json") // Ganti "data.json" dengan nama file JSON Anda
//         .then(response => response.json())
//         .then(data => {
//             data.features.forEach(feature => {
//                 if (feature.geometry.type === "LineString") {
//                     const row = pointTable.insertRow();
//                     const nameCell = row.insertCell(0);
//                     const coordinatesCell = row.insertCell(1);
//                     const typeCell = row.insertCell(2);
//                     nameCell.innerText = feature.properties.jalan;
//                     coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
//                     typeCell.innerText = feature.geometry.type;
                    
//                 }
//             });
//         })
//         .catch(error => console.error("Terjadi kesalahan:", error));
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const map = new ol.Map({
//         target: 'map',
//         layers: [
//             new ol.layer.Tile({
//                 source: new ol.source.OSM()
//             })
//         ],
//         view: new ol.View({
//             center: ol.proj.fromLonLat([100.59096625838828,-0.45806766905052876]),
//             zoom: 18
//         })
//     });

//     // Mendownload data waypoint, line string, dan polyline
//     const waypointSource = new ol.source.Vector({
//         url: 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/waypoint.json',
//         format: new ol.format.GeoJSON()
//     });

//     const lineStringSource = new ol.source.Vector({
//         url: 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polygon.json',
//         format: new ol.format.GeoJSON()
//     });

//     const polylineSource = new ol.source.Vector({
//         url: 'https://raw.githubusercontent.com/FarhanRiziq01/Open-Layer/main/polyline.json',
//         format: new ol.format.GeoJSON()
//     });

//     // Membuat layer untuk waypoint, line string, dan polyline
//     const waypointLayer = new ol.layer.Vector({
//         source: waypointSource,
//         style: new ol.style.Style({
//             image: new ol.style.Circle({
//                 radius: 5,
//                 fill: new ol.style.Fill({
//                     color: 'red'
//                 })
//             })
//         })
//     });

//     const lineStringLayer = new ol.layer.Vector({
//         source: lineStringSource,
//         style: new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: 'green',
//                 width: 2
//             })
//         })
//     });

//     const polylineLayer = new ol.layer.Vector({
//         source: polylineSource,
//         style: new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: 'black',
//                 width: 3
                
//             })
//         })
//     });

//     // Menambahkan layer ke peta
//     map.addLayer(waypointLayer);
//     map.addLayer(lineStringLayer);
//     map.addLayer(polylineLayer);

//     // Mendapatkan koordinat dari GeoJSON
//     const getCoordinates = (source) => {
//         const features = source.getFeatures();
//         const coordinates = features[0].getGeometry().getCoordinates();
//         return coordinates;
//     };

//     // Menampilkan koordinat di dalam tabel
//     waypointSource.once('change', () => {
//         const waypointCoords = getCoordinates(waypointSource);
//         document.getElementById('featureName').textContent = 'Waypoint';
//         document.getElementById('featureType').textContent = 'Point';
//         document.getElementById('featureCoords').textContent = waypointCoords.toString();
//     });

//     lineStringSource.once('change', () => {
//         const lineStringCoords = getCoordinates(lineStringSource);
//         document.getElementById('featureName').textContent = 'Line String';
//         document.getElementById('featureType').textContent = 'Line String';
//         document.getElementById('featureCoords').textContent = lineStringCoords.toString();
//     });

//     polylineSource.once('change', () => {
//         const polylineCoords = getCoordinates(polylineSource);
//         document.getElementById('featureName').textContent = 'Polyline';
//         document.getElementById('featureType').textContent = 'Polyline';
//         document.getElementById('featureCoords').textContent = polylineCoords.toString();
//     });
// });


//     // Menambahkan layer ke peta
//     map.addLayer(waypointLayer);
//     map.addLayer(lineStringLayer);
//     map.addLayer(polylineLayer);

//     // Mendapatkan koordinat dari GeoJSON
//     function getCoordinates(source) {
//         var features = source.getFeatures();
//         var coordinates = features[0].getGeometry().getCoordinates();
//         return coordinates;
//     }

//     // Menampilkan koordinat di dalam tabel
//     waypointSource.once('change', function() {
//         var waypointCoords = getCoordinates(waypointSource);
//         document.getElementById('featurename').textContent = 'Waypoint';
//         document.getElementById('featureType').textContent = 'Point';
//         document.getElementById('featureCoords').textContent = waypointCoords.toString();
//     });

//     lineStringSource.once('change', function() {
//         var lineStringCoords = getCoordinates(lineStringSource);
//         document.getElementById('featurename').textContent = 'Line String';
//         document.getElementById('featureType').textContent = 'Line String';
//         document.getElementById('featureCoords').textContent = lineStringCoords.toString();
//     });

//     polylineSource.once('change', function() {
//         var polylineCoords = getCoordinates(polylineSource);
//         document.getElementById('featurename').textContent = 'Polyline';
//         document.getElementById('featureType').textContent = 'Polyline';
//         document.getElementById('featureCoords').textContent = polylineCoords.toString();
//     });


