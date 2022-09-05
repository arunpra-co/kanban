export const getCards = async () => {
   const res = await fetch('http://localhost:8000/cards', {
      method: 'GET',
   })
   const data = await res.json()
   return data
}

export const getColumns = async () => {
   const res = await fetch('http://localhost:8000/columns', {
      method: 'GET',
   })
   const data = await res.json()
   return data
}
