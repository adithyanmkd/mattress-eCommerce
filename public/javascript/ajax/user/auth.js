document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname

  if (pathname.includes('/auth/login')) login()
  else if (pathname.includes('/auth/register')) register()
  else if (pathname.includes('/auth/otp-verify')) otpVerify()
  else if (pathname.includes('/auth/forget-password')) forgetPassword()
  else if (pathname.includes('/auth/change-password')) changePassword()

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

  // login validation & AJAX
  function login() {
    const loginForm = document.querySelector('#user-login-form')
    let successMessage = sessionStorage.getItem('successMessage')

    if (successMessage) {
      displaySuccess(successMessage)
      sessionStorage.removeItem('successMessage')
    }

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
    let loadingSpinner = document.querySelector('#loading-spinner')
    let submitButton = registerForm.querySelector("[type='submit']")
    let buttonText = document.querySelector('#button-text')

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      let fullname = registerForm
        .querySelector("[name='fullname']")
        .value.trim()
      let email = registerForm.querySelector("[name='email']").value.trim()
      let password = registerForm
        .querySelector("[name='password']")
        .value.trim()
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

      // show spinner
      submitButton.disabled = true
      buttonText.innerHTML = 'Loading...'
      loadingSpinner.classList.remove('hidden')

      try {
        let response = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullname, email, password }),
        })

        let data = await response.json() // converting api json data into javascript object

        if (response.ok) {
          window.location.href = '/auth/otp-verify'
        } else {
          displayError(data.error)
        }
      } catch (error) {
        console.log({
          Error: error,
          DeveloperNote: 'error while registering user ',
        })
      } finally {
        submitButton.disabled = false
        buttonText.innerHTML = `Register`
        loadingSpinner.classList.add('hidden')
      }
    })
  }

  // otp verify
  function otpVerify() {
    const otpForm = document.querySelector('#otp-form')

    otpForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      const email = otpForm.querySelector("[name='email']").value.trim()
      const otp = otpForm.querySelector('#otp').value.trim()

      let converetd = Number(otp) // converting otp

      if (!otp) {
        displayError('Please enter your otp.')
        return
      } else if (isNaN(converetd)) {
        displayError('Please enter a valid number.')
        return
      }

      // hide error box
      hideError()

      try {
        const response = await fetch('/auth/otp-verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: String(otp) }),
        })

        const data = await response.json()
        console.log(data)

        const isChangingPassword = sessionStorage.getItem('isChangingPassword')

        // if (isChangingPassword) {
        //   window.location.href = '/auth/change-password'
        //   return
        // }

        if (response.ok) {
          sessionStorage.setItem('successMessage', 'OTP verified successfully!')
          isChangingPassword
            ? (window.location.href = '/auth/change-password')
            : (window.location.href = '/auth/login')
        } else {
          displayError(data.error)
        }
      } catch (error) {
        console.error({
          Error: error,
          DeveloperNote: 'Error from otpVerifty Ajax function',
        })
      }
    })
  }

  // forget password validation & AJAX
  function forgetPassword() {
    const forgetPassForm = document.querySelector('#forget-password-form')

    forgetPassForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      let email = forgetPassForm.querySelector("[name='email']").value.trim()

      if (!email) {
        displayError('Please enter your Email.')
        return
      }

      try {
        const response = await fetch('/auth/forget-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (response.ok) {
          sessionStorage.setItem('isChangingPassword', true)
          window.location.href = '/auth/otp-verify'
        } else {
          displayError(data.error)
        }
      } catch (error) {}
    })
  }

  // change password validation & AJAX
  function changePassword() {
    const changePassForm = document.querySelector('#change-password-form')
    let successMessage = sessionStorage.getItem('successMessage')

    if (successMessage) {
      displaySuccess(successMessage)
      sessionStorage.removeItem('successMessage')
    }

    changePassForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      const password = changePassForm.querySelector('#password').value.trim()
      const confirmPassword = changePassForm
        .querySelector('#confirm-password')
        .value.trim()

      // client side form validations
      if (!password && !confirmPassword) {
        displayError('Both fields are required!')
        return
      } else if (!password) {
        displayError('Please enter new password')
        return
      } else if (password.length < 6) {
        displayError('Password must be 6 characters.')
        return
      } else if (!confirmPassword) {
        displayError('Please enter confirm password')
        return
      } else if (confirmPassword !== password) {
        displayError('Passwords do not match. Please try again!')
        return
      }

      // hide error
      hideError()

      try {
        const response = await fetch('/auth/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ confirmPassword }),
        })

        let data = await response.json()

        if (response.ok) {
          sessionStorage.setItem(
            'successMessage',
            'Password changed successfully.',
          )
          window.location.href = '/auth/login'
        } else {
          displayError(data.message)
        }
      } catch (error) {
        console.error({
          Error: error,
          DeveloperNote: 'Error from change password ajax',
        })
      }
    })
  }
})
