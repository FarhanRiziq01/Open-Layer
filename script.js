document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("waypoint.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.alamat;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("polygon.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.nama;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("polyline.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.jalan;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([100.59278479614993,-0.45644766640162937]),
            zoom: 17
        })
    });
});