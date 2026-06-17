export const USERS_DB = [
  { id: 1, name: 'João da Silva', email: 'joao@email.com', password: '123456' },
]

export function findUserByCredentials(email, password) {
  return USERS_DB.find((u) => u.email === email && u.password === password) || null
}

export function createUser({ name, email, password }) {
  const existing = USERS_DB.find((u) => u.email === email)
  if (existing) throw new Error('E-mail já cadastrado.')
  const newUser = { id: Date.now(), name, email, password }
  USERS_DB.push(newUser)
  return newUser
}

export function getUserById(id) {
  return USERS_DB.find((u) => u.id === id) || null
}
