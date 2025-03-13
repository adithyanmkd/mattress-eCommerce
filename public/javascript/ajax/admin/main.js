// const toggleForm = document.querySelector('#toggle-form')

// for dropdown
export function toggleDropdown(menuId, arrowId) {
  const menu = document.getElementById(menuId)
  const toggleArrow = document.getElementById(arrowId)

  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden')
    toggleArrow.classList.add('rotate-180')
  } else {
    menu.classList.add('hidden')
    toggleArrow.classList.remove('rotate-180')
  }
}

// ✅ Load dynamic content
async function loadContent(url) {
  try {
    const response = await fetch(url)
    const content = await response.text()
    document.getElementById('content-area').innerHTML = content
  } catch (error) {
    console.error('Failed to load content:', error)
  }
}

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-btn')) {
    event.preventDefault()

    const url = event.target.getAttribute('data-url')
    if (url) {
      await loadContent(url) // ✅ Load the edit page dynamically
    }
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname

  if (pathname.includes('/admin/customer')) customersDropdown()
  else if (pathname.includes('/admin/products')) productDropdown()
  else if (pathname.includes('/admin/categories')) categoryDropdown()

  // customer dropdown
  function customersDropdown() {
    toggleDropdown('customer-menu', 'customer-icon')
  }

  // product dropdown
  function productDropdown() {
    toggleDropdown('products', 'product-icon')
  }

  // category dropdown
  function categoryDropdown() {
    toggleDropdown('products', 'product-icon')
  }
})

window.toggleDropdown = toggleDropdown
