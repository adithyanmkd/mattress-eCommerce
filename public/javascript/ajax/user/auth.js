document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname

  if (pathname.includes('auth/login')) login()
  else if (pathname.includes('auth/register')) register()

  let errorTimeout // Store timeout reference

  // show error message
  let displayError = (message) => {
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

  // hide error message
  let hideError = () => {
    let errorBox = document.querySelector('#error-box')
    errorBox.classList.add('hidden')
  }

  // login validation & AJAX
  function login() {
    const loginForm = document.querySelector('#user-login-form')

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      let email = loginForm.querySelector("[name='email']").value.trim()
      let password = loginForm.querySelector("[name='password']").value.trim()

      // client validations
      if (!email && !password) {
        displayError('Email and password are required.')
        return
      } else if (!email) {
        displayError('Please enter your email address.')
        return
      } else if (!password) {
        displayError('Please enter your password.')
        return
      }

      try {
        // post login form into backend
        let response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        let data = await response.json()

        if (response.ok) {
          window.location.href = '/'
        } else {
          displayError(data.error) // passing error message into display error function
        }
      } catch (error) {
        console.error({
          Error: error,
          DeveloperNote: 'Error from login post ajax',
        })
      }
    })
  }

  // register validation && AJAX
  function register() {
    let registerForm = document.querySelector('#user-register-form')

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      let fullname = registerForm
        .querySelector("[name='fullname']")
        .value.trim()
      let email = registerForm.querySelector("[name='email']").value.trim()
      let password = registerForm.querySelector("[name='password'").value.trim()
      let confirmPassword = registerForm
        .querySelector('#confirmPassword')
        .value.trim()

      // client side validations
      if (!fullname && !email && !password && !confirmPassword) {
        displayError('All fields are required!')
        return
      } else if (!fullname) {
        displayError('Please enter fullname.')
        return
      } else if (!email) {
        displayError('Please enter your email address.')
        return
      } else if (!password) {
        displayError('Please enter your password.')
        return
      } else if (password.length < 6) {
        displayError('password must be 6 characters')
        return
      } else if (!confirmPassword) {
        displayError('Please enter confim password.')
        return
      } else if (confirmPassword !== password) {
        displayError('Passwords do not match. Please try again!')
        return
      }

      // hide error box
      hideError()

      try {
        let response = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullname, email, password }),
        })

        let data = await response.json() // converting api json data into javascript object

        if (response.ok) {
          window.location.href = '/auth/login'
        } else {
          console.log(data.error)
        }
      } catch (error) {
        console.log({
          Error: error,
          DeveloperNote: 'error while registering user ',
        })
      }
    })
  }
})
