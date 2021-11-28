import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import mapStyles from "./mapStyles";

const mapContainerStyle = {
	height: "100vh",
	width: "100vw",
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

function Map({ onMapLoad, onMapClick, center, markers, selected, setSelected }) {
	return (
		<GoogleMap
			id="map"
			mapContainerStyle={mapContainerStyle}
			zoom={8}
			center={center}
			options={options}
			onClick={onMapClick}
			onLoad={onMapLoad}
		>
			{markers.map((marker) => (
				<Marker
					key={`${marker.lat}-${marker.lng}`}
					position={{ lat: marker.lat, lng: marker.lng }}
					onClick={() => {
						setSelected(marker);
					}}
					icon={{
						url: `/bear.svg`,
						origin: new window.google.maps.Point(0, 0),
						anchor: new window.google.maps.Point(15, 15),
						scaledSize: new window.google.maps.Size(30, 30),
					}}
				/>
			))}

			{selected ? (
				<InfoWindow
					position={{ lat: selected.lat, lng: selected.lng }}
					onCloseClick={() => {
						setSelected(null);
					}}
				>
					<div>
						<h2>
							<span role="img" aria-label="bear">
								🐻
							</span>{" "}
							Alert
						</h2>
						<p>Spotted {formatRelative(selected.time, new Date())}</p>
					</div>
				</InfoWindow>
			) : null}
		</GoogleMap>
	);
}

export default Map;
