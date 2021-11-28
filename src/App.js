import React from "react";

import { useLoadScript } from "@react-google-maps/api";

import Search from "./Search";
import Map from "./Map";

const libraries = ["places"];

const center = {
	lat: 43.6532,
	lng: -79.3832,
};

export default function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
	const [markers, setMarkers] = React.useState([]);
	const [selected, setSelected] = React.useState(null);

	const onMapClick = React.useCallback((e) => {
		setMarkers((current) => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";

	return (
		<div>
			<h1>
				Bears{" "}
				<span role="img" aria-label="tent">
					⛺️
				</span>
			</h1>
			<Search panTo={panTo} />
			<Map
				onMapLoad={onMapLoad}
				onMapClick={onMapClick}
				center={center}
				markers={markers}
				selected={selected}
				setSelected={setSelected}
			/>
		</div>
	);
}
