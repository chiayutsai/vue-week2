const account = document.querySelector('#account')
const userPassword = document.querySelector('#password')
const loginBtn = document.querySelector('#login')
const url = 'https://vue3-course-api.hexschool.io/admin/signin'

function login(e) {
  e.preventDefault()
  //   window.location = 'products.html'
  const username = account.value
  const password = userPassword.value
  if (username === '' || password === '') {
    alert('請輸入帳號密碼')
    if (username === '') {
      account.focus()
    } else {
      password.focus()
    }
    return
  }
  const user = {
    username,
    password,
  }
  axios
    .post(url, user)
    .then(function (res) {
      console.log(res)
      if (res.data.success) {
        const { token, expired } = res.data
        //   console.log(token, expired)
        document.cookie = `chiayuToken=${token}; expires=${new Date(expired)}`
        account.value = ''
        userPassword.value = ''
        window.location = 'backstage.html'
      } else {
        alert(`登入失敗: ${res.data.error.message}`)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

loginBtn.addEventListener('click', login)
