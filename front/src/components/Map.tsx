import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Truck {
    type: 'string',
    coordinates: [number, number]
}
interface Tile38Object {
    id: string,
    object: Truck;
}

interface TruckResponse {
    objects: Array<Tile38Object>;
}

const LodzCoordinates = {lat: 51.77058, lng: 19.47395};

export const Map = () => {
    const [points, setPoints] = useState<Tile38Object[]>([]);

    useEffect(() => {
    let rotationInterval = setInterval(async () => {
        try {
            const data = await fetch(`http://localhost:8080/nearby+fleet+point+${LodzCoordinates.lat}+${LodzCoordinates.lng}+120000`);
            const json = await data.json();

            if (json.objects) {
                setPoints(json.objects);
            }
        } catch (error) {
            console.log(error);
        }
    }, 1000)
    
    return () => {
        clearInterval(rotationInterval);
    }
}, [])


    return <MapContainer style={{width: '100vw', height: '100vh'}} center={LodzCoordinates} zoom={12} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => <Circle
            center={[point.object.coordinates[1], point.object.coordinates[0] ]}
            radius={10}
        />)}
        <Marker position={LodzCoordinates}>
            <Popup>
                Start position for all points
            </Popup>
        </Marker>
    </MapContainer>;

}