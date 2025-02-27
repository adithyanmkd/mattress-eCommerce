const errorBox = document.getElementById('error-box') //server error showing box
const successBox = document.getElementById('success-box') // success box
const clientErrorBox = document.getElementById('client-error-box') //client error showing box
const clientErrorBoxP = document.getElementById('client-error-box-p')
const adminLoginForm = document.querySelector('#admin-login-form') //admin login form
const userLoginForm = document.querySelector('#user-login-form') //user login form
const userRegisterForm = document.querySelector('#user-register-form') // user register form

//error box hiding after 5 seconds
setTimeout(() => {
  if (errorBox) {
    errorBox.style.display = 'none'
  }
}, 5000)

//success box hiding after 5 seconds
setTimeout(() => {
  if (successBox) {
    successBox.style.display = 'none'
  }
}, 5000)

//message and box showing if required filed not fill
const errorMsgFunc = (e, message) => {
  e.preventDefault()
  clientErrorBox.classList.remove('hidden')
  clientErrorBox.classList.add('flex')
  clientErrorBoxP.innerHTML = message
}

// user login form validation
if (userLoginForm) {
  const email = userLoginForm.querySelector("[name='email']")
  const password = userLoginForm.querySelector("[name='password']")

  userLoginForm.addEventListener('submit', (e) => {
    if (email.value.trim() == '' && password.value.trim() == '') {
      errorMsgFunc(e, 'All field is required')
    } else if (email.value == '') {
      errorMsgFunc(e, 'Email is required')
    } else if (password.value == '') {
      errorMsgFunc(e, 'Password is required')
    }
  })
}

// User register form validation
if (userRegisterForm) {
  const fullname = userRegisterForm.querySelector("[name='fullname']")
  const email = userRegisterForm.querySelector("[name='email']")
  const password = userRegisterForm.querySelector("[name='password']")
  const confirmPassword = userRegisterForm.querySelector(
    "[name='confirmPassword']",
  )

  userRegisterForm.addEventListener('submit', (e) => {
    // Trim input values
    const fullNameValue = fullname.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirmPasswordValue = confirmPassword.value.trim()

    let errorMessage = ''

    // Show specific messages for each missing field
    if (!fullNameValue) {
      errorMessage = 'Enter your full name'
    } else if (!emailValue) {
      errorMessage = 'Enter your email'
    } else if (!passwordValue) {
      errorMessage = 'Enter your password'
    } else if (!confirmPasswordValue) {
      errorMessage = 'Confirm your password'
    }
    // Validate email format
    else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      errorMessage = 'Enter a valid email address'
    }
    // Check if password length is at least 6 characters
    else if (passwordValue.length < 6) {
      errorMessage = 'Password must be at least 6 characters long'
    }
    // Check if password and confirm password match
    else if (passwordValue !== confirmPasswordValue) {
      errorMessage = 'Passwords do not match'
    }

    // If there's an error, prevent form submission and show message
    if (errorMessage) {
      e.preventDefault()
      errorMsgFunc(e, errorMessage)
    }
  })
}
