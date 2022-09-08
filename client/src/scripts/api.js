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

export const addCard = async (id, body) => {
   const res = await fetch(`http://localhost:8000/cards`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ column: id, body }),
   })
   const data = await res.json()

   return data
}


export const removeCard = async (id) => {
   const res = await fetch(`http://localhost:8000/cards/${id}`, {
      method: 'DELETE',
   })
   const data = await res.json()
   return data
}

export const addColumn = async (title) => {
   const res = await fetch(`http://localhost:8000/columns`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
   })
   const data = await res.json()
   return data
}
export const removeColumn = async (id) => {
   const res = await fetch(`http://localhost:8000/columns/${id}`, {
      method: 'DELETE',
   })
   const data = await res.json()
   return data
}