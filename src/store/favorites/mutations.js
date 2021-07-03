export function addToList(state,payload) {
    const favorites = state.favorites
    const hasUser = favorites.some((user) => user.id === payload.id)
    if (hasUser) {
        throw new Error('usuário já existe')
    }
    payload.index = favorites.length
    favorites.push(payload)
}
export function removeFromList(state,payload) {
    const favorites = state.favorites
    favorites.splice(payload.index, 1)
}