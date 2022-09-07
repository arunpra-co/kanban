import Sortable from 'sortablejs'

import { getColumns, getCards, addCard, removeCard } from './api'
import { getNextSiblings, getPrevSiblings } from './utils'

async function createHtml() {
   let columns = await getColumns()
   let cards = await getCards()
   //sort column wrt index
   columns.sort((a, b) => {
      return a.index - b.index
   })

   for (let column of columns) {
      const html = `
      <div class="container-wrapper" id=${column.id}>  
         <div class="container-wrapper-title">
         <div class='container-wrapper--flex w-full container-wrapper-title-grp'>
            <div class='container-wrapper--flex'>
               <div class="container-wrapper--icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grip-vertical" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                     <circle cx="9" cy="5" r="1" />
                     <circle cx="9" cy="12" r="1" />
                     <circle cx="9" cy="19" r="1" />
                     <circle cx="15" cy="5" r="1" />
                     <circle cx="15" cy="12" r="1" />
                     <circle cx="15" cy="19" r="1" />
                  </svg>
               </div>
               <div class="container-wrapper-text">
                  ${column.title}
               </div>
               </div>

               <div data-id=${column.id} class='flex  pointer gap-2'>
                  <div class='mt-4'>
                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                     </svg>
                  </div>
                  <div id='button-${column.id}' class="container-wrapper--icon pointer ">
                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                     </svg>
                  </div>
               </div>
               
            </div>
         </div>
               <ul id="column-${column.index}" data-id="column-${column.id}" index=${column.index} class="container-column"></ul>
         </div>
      </div>
      `

      //filter out cards of current column
      const col_cards = cards.filter((card) => {
         return card.column == column.id
      })

      //sort cards with index(asc)
      const sorted_cards = col_cards.sort((a, b) => {
         return a.index - b.index
      })


      document.querySelector('.container').insertAdjacentHTML('beforeend', html)

      //add card in a column


      for (let card of sorted_cards) {
         const cardHtml = `
         <li class="container-card flex justify-between items-center" data-id='card-${card.id}' id=${card.id} index=${card.index} column=${card.column}>
               ${card.body}
               <div class='mt-4 pointer'>
               
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                     <line x1="4" y1="7" x2="20" y2="7" />
                     <line x1="10" y1="11" x2="10" y2="17" />
                     <line x1="14" y1="11" x2="14" y2="17" />
                     <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                     <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
               </div>

         </li>  
         `
         document.querySelector(`#column-${column.index}`).insertAdjacentHTML('beforeend', cardHtml)
         document.querySelector(`[data-id="card-${card.id}"]`).addEventListener('click', async (e) => {

            await removeCard(card.id)
            document.querySelector(`[data-id="card-${card.id}"]`).remove()
         })
      }

      //onClick add card button
      (document.getElementById(`button-${column.id}`).addEventListener('click', async () => {
         let body = prompt(`Enter a title for card in ${column.title}`)
         if (body.length > 0 || body != ' ') {
            const data = await addCard(column.id, body)

            let z = document.createElement('li')
            z.setAttribute('class', 'container-card flex justify-between items-center')
            z.setAttribute('id', `${data.id}`)
            z.setAttribute('index', `${data.index}`)
            z.setAttribute('column', `${data.column}`)
            z.setAttribute('data-id', `card-${data.id}`)

            const innerHtml = `
            ${body}
            <div class='mt-4 pointer'>
            
               <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
               </svg>
            </div>

            `
            z.innerHTML = innerHtml
            document.querySelector(`[data-id="column-${column.id}"]`).appendChild(z).addEventListener('click', async (e) => {

               await removeCard(data.id)
               document.querySelector(`[data-id="card-${data.id}"]`).remove()
            })
         }
      }))

      // onClick delete card button



      //cards sortables
      new Sortable.create(document.getElementById(`column-${column.index}`), {
         group: 'shared',
         animation: 150,

         onEnd: async function (event) {
            const res = await fetch(`http://localhost:8000/cards/${event.item.id}`, {
               method: 'PATCH',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ index: event.newDraggableIndex, column: event.to.getAttribute('index') }),
            })

            //increase index of all siblings
            let count = event.newDraggableIndex
            for (let item of getNextSiblings(event.item)) {
               count = count + 1
               const res = await fetch(`http://localhost:8000/cards/${item?.getAttribute('id')}`, {
                  method: 'PATCH',
                  headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ index: count }),
               })
            }
         },
      })
   }



   // column sortables
   new Sortable(document.getElementById('container'), {
      group: 'columns',
      handle: '.container-wrapper--icon',
      animation: 150,
      onEnd: async function (event) {
         const res = await fetch(`http://localhost:8000/columns/${event.item.id}`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index: event.newIndex }),
         })

         let count2 = event.newIndex
         for (let item of getPrevSiblings(event.item)) {
            console.log(item)

            count2 = count2 - 1
            item.querySelector('.container-column').setAttribute('index', `${count2}`)
            const res = await fetch(`http://localhost:8000/columns/${item?.getAttribute('id')}`, {
               method: 'PATCH',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ index: count2 }),
            })
         }

         event.item.querySelector('.container-column').setAttribute('index', `${event.newIndex}`)

         let count = event.newIndex
         for (let item of getNextSiblings(event.item)) {


            count = count + 1
            item.querySelector('.container-column').setAttribute('index', `${count}`)

            const res = await fetch(`http://localhost:8000/columns/${item?.getAttribute('id')}`, {
               method: 'PATCH',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ index: count }),
            })
         }
      },
   })
}
createHtml()

// window.onload = function () {
//    // document.getElementById('add-card').addEventListener('click', () => {
//    //     alert('asdf')
//    // })z3x
//    alert(document.getElementById("add-card"));
// }