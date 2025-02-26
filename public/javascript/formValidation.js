const errorBox = document.getElementById('error-box')
const adminLoginForm = document.querySelector('#admin-login-form')

//error box hiding after 3 seconds
setTimeout(() => {
  if (errorBox) {
    errorBox.style.display = 'none'
  }
}, 3000)
