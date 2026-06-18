import L from 'leaflet'
function statusBadgeSvg(status) {
  switch (status) {
    case 'em_revisao':
      return `
        <g transform="translate(16,-2)">
          <path d="M7 0 L14 12 L0 12 Z" fill="#f9a825" stroke="white" stroke-width="1.3"/>
          <text x="7" y="10.5" font-family="Arial,sans-serif" font-size="8" font-weight="bold"
            fill="white" text-anchor="middle">!</text>
        </g>`
    case 'resolvido':
      return `
        <g transform="translate(16,-2)">
          <circle cx="7" cy="6" r="7" fill="#2d9e5a" stroke="white" stroke-width="1.3"/>
          <path d="M3.5 6.2 L6 8.7 L10.5 3.5" fill="none" stroke="white" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"/>
        </g>`
    case 'nao_visto':
    default:
      return `
        <g transform="translate(16,-2)">
          <polygon points="7,0 13,3.5 13,10.5 7,14 1,10.5 1,3.5" fill="#e53935" stroke="white" stroke-width="1.3"/>
          <text x="7" y="10.5" font-family="Arial,sans-serif" font-size="8" font-weight="bold"
            fill="white" text-anchor="middle">!</text>
        </g>`
  }
}

export function createMarkerIcon(color, letter, status) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="46" viewBox="0 0 44 46" overflow="visible">
      <g transform="translate(0,4)">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 8.285 15 27 15 27S30 23.285 30 15C30 6.716 23.284 0 15 0z"
          fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="15" cy="15" r="9" fill="white" opacity="0.25"/>
        <text x="15" y="19.5" font-family="Arial,sans-serif" font-size="10" font-weight="bold"
          fill="white" text-anchor="middle">${letter}</text>
      </g>
      ${statusBadgeSvg(status)}
    </svg>`

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [44, 46],
    iconAnchor: [15, 46],
    popupAnchor: [4, -46],
  })
}

export async function reverseGeocode(lat, lng) {
  await new Promise((r) => setTimeout(r, 200))
  return `${lat.toFixed(4)}°S, ${lng.toFixed(4)}°O — Ituiutaba, MG`
}

export const ITUIUTABA_CENTER = [-18.972, -49.47]
export const DEFAULT_ZOOM = 13

