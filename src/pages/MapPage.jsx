import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import MapSidebar from '../components/MapSidebar'
import AddProblemModal from '../components/AddProblemModal'
import { useMapFilters } from '../hooks/useMapFilters'
import { getProblemType } from '../data/problemTypes'
import { getUserById } from '../data/users'
import { createMarkerIcon, reverseGeocode, ITUIUTABA_CENTER, DEFAULT_ZOOM } from '../utils/mapHelpers'
import styles from '../styles/MapPage.module.css'

export default function MapPage({ user, problems, onAddProblem, showToast }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef  = useRef(null)
  const markersRef      = useRef([])

  const [pendingClick, setPendingClick] = useState(null)
  const [modalOpen, setModalOpen]       = useState(false)

  const { filters, toggleType, setPeriod, setOnlyMine, applyFilters } =
    useMapFilters(user.id)

  useEffect(() => {
    if (mapInstanceRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: ITUIUTABA_CENTER,
      zoom: DEFAULT_ZOOM,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    map.on('click', async (e) => {
      const { lat, lng } = e.latlng
      const address = await reverseGeocode(lat, lng)
      setPendingClick({ lat, lng, address })
      setModalOpen(true)
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    const visible = applyFilters(problems)

    visible.forEach((p) => {
      const pt = getProblemType(p.type)
      const icon = createMarkerIcon(pt.color, pt.letter)
      const marker = L.marker([p.lat, p.lng], { icon })

      const byUser   = getUserById(p.userId)
      const byText   = p.anon ? 'Anônimo' : (byUser?.name ?? 'Desconhecido')

      marker.bindPopup(`
        <div style="min-width:180px">
          <p style="font-size:11px;font-weight:700;color:${pt.color};text-transform:uppercase;margin-bottom:4px">
            ${pt.label}
          </p>
          <p style="font-size:12px;color:#555;margin-bottom:3px">📍 ${p.address}</p>
          ${p.description ? `<p style="font-size:12px;margin-bottom:3px">${p.description}</p>` : ''}
          <p style="font-size:11px;color:#888">Por: ${byText} · ${p.date}</p>
        </div>
      `)

      marker.addTo(mapInstanceRef.current)
      markersRef.current.push(marker)
    })
  }, [problems, applyFilters])

  const handleConfirm = async (formData) => {
    setModalOpen(false)
    try {
      await onAddProblem({ ...formData, userId: user.id })
      showToast('Problema adicionado com sucesso!', 'success')
    } catch {
      showToast('Erro ao adicionar problema.', 'error')
    }
    setPendingClick(null)
  }

  const visibleCount = applyFilters(problems).length

  return (
    <div className={styles.page}>
      <MapSidebar
        filters={filters}
        toggleType={toggleType}
        setPeriod={setPeriod}
        setOnlyMine={setOnlyMine}
      />

      <div className={styles.mapWrapper}>
        <div ref={mapContainerRef} className={styles.map} />

        <div className={styles.statsBar}>
          <span className={styles.statsDot} />
          {visibleCount} ocorrência{visibleCount !== 1 ? 's' : ''} visí{visibleCount !== 1 ? 'veis' : 'vel'}
        </div>

        <div className={styles.hint}>
          Clique no mapa para reportar um problema
        </div>
      </div>

      {modalOpen && pendingClick && (
        <AddProblemModal
          clickData={pendingClick}
          onConfirm={handleConfirm}
          onCancel={() => { setModalOpen(false); setPendingClick(null) }}
        />
      )}
    </div>
  )
}
