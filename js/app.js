const navElements = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')
navElements.forEach(el => {
    const navlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
    navList.insertAdjacentHTML('beforeend', navlistElement)
  })
  
  // Scroll to section on link click by listenting to the click-event in the navlist
  navList.addEventListener('click', e => {
    e.preventDefault()
    const parent = e.target.hasAttribute('data-link')
      ? e.target
      : e.target.parentElement
    const elementToScrollTo = document.getElementById(parent.dataset.link)
    elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})  //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  })
  
  
  const callback = entries => {
    entries.forEach(entry => {
      const navListElement = document.querySelector(
        `.menu__link[data-link='${entry.target.id}']`,
      )
      const section = document.getElementById(entry.target.id)
  
      if (entry && entry.isIntersecting) {
        navListElement.classList.add('active')
        section.classList.add('active')
      } else {
        if (navListElement.classList.contains('active')) {
          navListElement.classList.remove('active')
        }
  
        if (section.classList.contains('active')) {
          section.classList.remove('active')
        }
      }
    })
  }
  
  //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  }
  
  
  const observer = new IntersectionObserver(callback, options)
  navElements.forEach(el => {
    observer.observe(document.getElementById(el.id))
  })