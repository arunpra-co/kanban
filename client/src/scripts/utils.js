export function getNextSiblings(elem, filter) {
   var sibs = []
   while ((elem = elem.nextSibling)) {
      if (elem.nodeType === 3) continue // text node
      if (!filter || filter(elem)) sibs.push(elem)
   }
   return sibs
}

export function getPrevSiblings(elem, filter) {
   var sibs = []
   while ((elem = elem.previousSibling)) {
      if (elem.nodeType === 3) continue // text node
      if (!filter || filter(elem)) sibs.push(elem)
   }
   return sibs
}
