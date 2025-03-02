function toggleDropdown(menuId, arrowId) {
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
