const errorBox = document.getElementById('error-box') //server error showing box
const clientErrorBox = document.getElementById('client-error-box') //client error showing box
const clientErrorBoxP = document.getElementById('client-error-box-p')
const adminLoginForm = document.querySelector('#admin-login-form') //admin login form
const userLoginForm = document.querySelector('#user-login-form') //user login form
const userRegisterForm = document.querySelector('#user-register-form') // user register form

//server error box hiding after 3 seconds
setTimeout(() => {
  if (errorBox) {
    errorBox.style.display = 'none'
  }
}, 3000)

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

// user register form validation
if (userRegisterForm) {
  const fullname = userRegisterForm.querySelector("[name='fullname']")
  const email = userRegisterForm.querySelector("[name='email']")
  const password = userRegisterForm.querySelector("[name='password']")
  const confirmPassword = userRegisterForm.querySelector(
    "[name='confirmPassword]",
  )

  userRegisterForm.addEventListener('submit', (e) => {
    if (
      fullname.value.trim() === '' ||
      email.value.trim() === '' ||
      password.value.trim() === '' ||
      confirmPassword.value == ''
    ) {
      errorMsgFunc(e, 'All field is required')
    }
  })
}
