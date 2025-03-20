let currentPage = 0

Object.values( document.querySelectorAll( 'a.next') ).forEach( nBut => {
  nBut.addEventListener( 'click', e => {
    currentPage++
    pageChange()
  })
})

Object.values( document.querySelectorAll( 'a.send') ).forEach( nBut => {
  nBut.addEventListener( 'click', e => {
    
    let content = e.currentTarget.dataset.prefix + ' ' + e.currentTarget.parentNode.querySelector('span[contenteditable=true]').innerHTML
    
    const response = fetch("/", {
      method: "POST",
      body: content
    });
  })
})

Object.values( document.querySelectorAll('span[contenteditable=true]') ).forEach( npt => {
  npt.addEventListener('keydown', e => {
    if( ( npt.innerHTML.split(' ').length >= 6 || npt.innerHTML.length > 40 ) && e.keyCode !== 8 ) e.preventDefault()
  })
})

let pageChange = page => {
  document.querySelector( '.page.active' ).classList.toggle( 'active', false )

  let p = document.querySelectorAll( '.page' )[ currentPage ]
  p.classList.add( 'active' )

  let editable = p.querySelector( 'span[contenteditable=true]' )
  if( editable ) editable.focus()
}

document.addEventListener('contextmenu', e => { e.preventDefault() });