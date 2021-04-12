import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const exist = e => e !== undefined && e !== null;

function isPointValid(point) {
	if (!point) return false;
	if (point instanceof Array && exist(point[0] && exist(point[1]))) return true;
	return false;
}

/**
@typedef { Object } MapProps
@prop {{
  center: [number, number],
  zoom: number
}} initialConfiguration
@argument { MapProps } props
*/
export default function CustomMap({
	initialConfiguration: { center: initialCenter, zoom: initialZoom },
	children,
	...props
}) {
	const [center, setCenter] = React.useState(
		(isPointValid(initialCenter) && initialCenter) || undefined,
	);
	const [zoom, setZoom] = React.useState(exist(initialZoom) && initialZoom);

	React.useEffect(() => {
		if (!isPointValid(center) && isPointValid(initialCenter)) {
			setCenter(initialCenter);
		}
		if (!isPointValid(zoom) && isPointValid(initialZoom)) {
			setZoom(initialZoom);
		}
	}, [initialCenter, initialZoom]);

	return (
		<>
			{center && zoom && (
				<MapContainer
					{...props}
					center={center}
					zoom={zoom}
					zoomSnap={0.01}
					maxZoom={18} // Map cannot have more than 18 zoom without breaking
					style={{ height: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{children}
				</MapContainer>
			)}
		</>
	);
}
