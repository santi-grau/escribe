let currentPage = 0

Object.values( document.querySelectorAll( 'a.next') ).forEach( nBut => {
  nBut.addEventListener( 'click', e => {
    currentPage++
    pageChange()
  })
})

Object.values( document.querySelectorAll( 'a.send') ).forEach( nBut => {
  nBut.addEventListener( 'click', e => {
    
    let content = e.currentTarget.parentNode.querySelector('span[contenteditable=true]').innerHTML
    const response = fetch("/", {
      method: "POST",
      body: content
    });

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