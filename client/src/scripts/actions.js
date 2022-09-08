import { addColumn } from './api.js'
import { createHtml } from './dragndrop.js'

//add new column
document.getElementById('add-column-button').addEventListener('click', async () => {
   let title = prompt(`Enter a title for new column`)
   let data
   if (title?.length > 0 || body != ' ') {
      data = await addColumn(title)
      const html = `
    <div class="container-wrapper" id=${data.id}>  
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
                ${data.title}
             </div>
             </div>

             <div data-id=${data.id} class='flex  pointer gap-2'>
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
                <div id='button-${data.id}' class="container-wrapper--icon pointer ">
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
             <ul id="column-${data.index}" data-id="column-${data.id}" index=${data.index} class="container-column"></ul>
       </div>
    </div>
    `
      const list = document.getElementById('container')
      while (list.hasChildNodes()) {
         list.removeChild(list.firstChild)
      }
      createHtml()
   }
})
