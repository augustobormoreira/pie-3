// Status que a Prefeitura pode atribuir a um problema reportado.
export const PROBLEM_STATUS = {
  nao_visto: {
    id: 'nao_visto',
    label: 'Não visto',
    color: '#e53935',
    description: 'Ainda não analisado pela prefeitura',
  },
  em_revisao: {
    id: 'em_revisao',
    label: 'Em revisão',
    color: '#f9a825',
    description: 'Equipe da prefeitura está avaliando o problema',
  },
  resolvido: {
    id: 'resolvido',
    label: 'Resolvido',
    color: '#2d9e5a',
    description: 'Problema solucionado pela prefeitura',
  },
}

export const DEFAULT_STATUS = 'nao_visto'

export function getStatus(id) {
  return PROBLEM_STATUS[id] || PROBLEM_STATUS[DEFAULT_STATUS]
}

export function getStatusList() {
  return Object.values(PROBLEM_STATUS)
}
