import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import MapSidebar from '../components/MapSidebar'
import AddProblemModal from '../components/AddProblemModal'
import ProblemDetailModal from '../components/ProblemDetailModal'
import { useMapFilters } from '../hooks/useMapFilters'
import { getProblemType } from '../data/problemTypes'
import { getStatus } from '../data/problemStatus'
import { getUserById } from '../data/users'
import { createMarkerIcon, reverseGeocode, ITUIUTABA_CENTER, DEFAULT_ZOOM } from '../utils/mapHelpers'
import styles from '../styles/MapPage.module.css'

export default function MapPage({ user, problems, onAddProblem, onUpdateStatus, showToast }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef  = useRef(null)
  const markersRef      = useRef([])

  const [pendingClick, setPendingClick]   = useState(null)
  const [addModalOpen, setAddModalOpen]   = useState(false)
  const [selectedProblemId, setSelectedProblemId] = useState(null)

  const { filters, toggleType, setPeriod, setOnlyMine, applyFilters } =
    useMapFilters(user.id)

  useEffect(() => {
    window.__openProblemDetail = (id) => setSelectedProblemId(id)
    return () => { delete window.__openProblemDetail }
  }, [])

 
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
      setAddModalOpen(true)
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
      const st = getStatus(p.status)
      const icon = createMarkerIcon(pt.color, pt.letter, p.status)
      const marker = L.marker([p.lat, p.lng], { icon })

      const byUser = getUserById(p.userId)
      const byText = p.anon ? 'Anônimo' : (byUser?.name ?? 'Desconhecido')

      marker.bindPopup(`
        <div style="min-width:190px">
          <p style="font-size:11px;font-weight:700;color:${pt.color};text-transform:uppercase;margin-bottom:4px">
            ${pt.label}
          </p>
          <p style="font-size:12px;color:#555;margin-bottom:3px">📍 ${p.address}</p>
          ${p.description ? `<p style="font-size:12px;margin-bottom:3px">${p.description}</p>` : ''}
          <p style="font-size:11px;color:#888;margin-bottom:8px">Por: ${byText} · ${p.date}</p>
          <p style="font-size:11px;font-weight:700;color:${st.color};margin-bottom:8px">
            ● ${st.label}
          </p>
          <button
            onclick="window.__openProblemDetail(${p.id})"
            style="width:100%;padding:6px 10px;background:#2d9e5a;color:white;border:none;
              border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit"
          >Ver detalhes</button>
        </div>
      `)

      marker.addTo(mapInstanceRef.current)
      markersRef.current.push(marker)
    })
  }, [problems, applyFilters])

  const handleConfirmAdd = async (formData) => {
    setAddModalOpen(false)
    try {
      await onAddProblem({ ...formData, userId: user.id })
      showToast('Problema adicionado com sucesso!', 'success')
    } catch {
      showToast('Erro ao adicionar problema.', 'error')
    }
    setPendingClick(null)
  }

  const handleUpdateStatus = useCallback(async (id, status, note) => {
    try {
      await onUpdateStatus(id, status, note)
      showToast('Status atualizado com sucesso!', 'success')
      setSelectedProblemId(null)
    } catch {
      showToast('Erro ao atualizar status.', 'error')
    }
  }, [onUpdateStatus, showToast])

  const visibleCount = applyFilters(problems).length
  const selectedProblem = problems.find((p) => p.id === selectedProblemId) || null

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
          Clique no mapa para reportar um problema · Clique em um pin para ver detalhes
        </div>
      </div>

      {addModalOpen && pendingClick && (
        <AddProblemModal
          clickData={pendingClick}
          onConfirm={handleConfirmAdd}
          onCancel={() => { setAddModalOpen(false); setPendingClick(null) }}
        />
      )}

      {selectedProblem && (
        <ProblemDetailModal
          problem={selectedProblem}
          currentUser={user}
          onClose={() => setSelectedProblemId(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}
