document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname

  if (pathname.includes('/admin/login')) login()

  let errorTimeout // Store timeout reference

  // show error message
  function displayError(message) {
    let errorBox = document.querySelector('#error-box') // accessing error box

    errorBox.innerHTML = message
    errorBox.classList.remove('hidden')

    // Clear any existing timeout to prevent multiple timers
    clearTimeout(errorTimeout)

    // after 5 seconds message will be hide
    errorTimeout = setTimeout(() => {
      errorBox.classList.add('hidden')
    }, 5000)
  }

  // show error message
  function displaySuccess(message) {
    let successBox = document.querySelector('#success-box') // accessing success box

    successBox.innerHTML = message
    successBox.classList.remove('hidden')

    // Clear any existing timeout to prevent multiple timers
    clearTimeout(successBox)

    // after 5 seconds message will be hide
    successTimeout = setTimeout(() => {
      successBox.classList.add('hidden')
    }, 5000)
  }

  // hide error message
  function hideError() {
    let errorBox = document.querySelector('#error-box')
    errorBox.classList.add('hidden')
  }

  function login() {
    const loginForm = document.querySelector('#admin-login-form')

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      const username = loginForm.querySelector("[name='username']").value.trim()
      const password = loginForm.querySelector("[name='password']").value.trim()

      if (!username && !password) {
        displayError('All field required')
        return
      } else if (!username) {
        displayError('Please enter your username')
        return
      } else if (!password) {
        displayError('Please enter password')
        return
      }

      // hide error box
      hideError()

      try {
        const response = await fetch('/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (response.ok) {
          window.location.href = '/admin'
        } else {
          displayError(data.message)
        }
      } catch (error) {}
    })
  }
})
