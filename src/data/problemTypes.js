export const PROBLEM_TYPES = [
  { id: 'buracos', label: 'Buracos de rua',      color: '#e53935', letter: 'A' },
  { id: 'ilumina', label: 'Iluminação pública',  color: '#f57c00', letter: 'B' },
  { id: 'lixo',    label: 'Lixo acumulado',      color: '#43a047', letter: 'C' },
  { id: 'dengue',  label: 'Foco de dengue',      color: '#e53935', letter: 'D' },
  { id: 'crime',   label: 'Crime reportado',     color: '#6a1b9a', letter: 'E' },
  { id: 'arvores', label: 'Árvores / Vegetação', color: '#00897b', letter: 'F' },
  { id: 'outros',  label: 'Outros',              color: '#795548', letter: 'G' },
]

export function getProblemType(id) {
  return PROBLEM_TYPES.find((t) => t.id === id) || PROBLEM_TYPES[PROBLEM_TYPES.length - 1]
}
