import L from 'leaflet'


export function createMarkerIcon(color, letter) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 8.285 15 27 15 27S30 23.285 30 15C30 6.716 23.284 0 15 0z"
        fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="9" fill="white" opacity="0.25"/>
      <text x="15" y="19.5" font-family="Arial,sans-serif" font-size="10" font-weight="bold"
        fill="white" text-anchor="middle">${letter}</text>
    </svg>`

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -44],
  })
}


export async function reverseGeocode(lat, lng) {

  await new Promise((r) => setTimeout(r, 200))
  return `${lat.toFixed(4)}°S, ${lng.toFixed(4)}°O — Ituiutaba, MG`
}

export const ITUIUTABA_CENTER = [-18.972, -49.47]
export const DEFAULT_ZOOM = 13
