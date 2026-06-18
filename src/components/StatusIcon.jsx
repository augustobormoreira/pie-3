
export default function StatusIcon({ status, size = 22 }) {
  const common = { width: size, height: size, viewBox: '0 0 16 16' }

  if (status === 'em_revisao') {
    return (
      <svg {...common}>
        <path d="M8 0 L16 14 L0 14 Z" fill="#f9a825" stroke="white" strokeWidth="1" />
        <text x="8" y="12" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">!</text>
      </svg>
    )
  }

  if (status === 'resolvido') {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="8" fill="#2d9e5a" />
        <path d="M4 8.2 L7 11.2 L12 4.8" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  
  return (
    <svg {...common}>
      <polygon points="8,0 15,4 15,12 8,16 1,12 1,4" fill="#e53935" stroke="white" strokeWidth="1" />
      <text x="8" y="12" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">!</text>
    </svg>
  )
}
