const app = {
  data: {
    url: 'https://vue3-course-api.hexschool.io/',
    path: 'chiayu',
    productsData: [],
  },
  getData() {
    axios.get(`${this.data.url}api/${this.data.path}/admin/products`).then((res) => {
      if (res.data.success) {
        this.data.productsData = res.data.products
        console.log(res)
        this.render()
      } else {
        alert('驗證錯誤, 請重新登入')
        window.location = 'login.html'
      }
    })
  },

  changeStatus(e) {
    const obj = {}
    const productId = e.target.dataset.id
    this.data.productsData.forEach((item) => {
      if (item.id == productId) {
        item.is_enabled = !item.is_enabled
        obj.data = item
      }
    })
    axios.put(`${this.data.url}api/${this.data.path}/admin/product/${productId}`, obj).then((res) => {
      alert(res.data.message)
      this.getData()
    })
  },
  removeProduct(e) {
    const productId = e.target.dataset.id
    axios.delete(`${this.data.url}api/${this.data.path}/admin/product/${productId}`).then((res) => {
      this.getData()
      alert(res.data.message)
    })
  },

  render() {
    let template = ''
    this.data.productsData.forEach((item, index) => {
      template += `<tr>
      <td class="w-20">
               <img class="w-100" src=" ${item.imageUrl}">
              </td>
              <td class="w-40">${item.title}</td>
              <td >
                ${item.origin_price}
              </td>
              <td >
                 ${item.price}
              </td>
              <td >
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="enabled${index}" data-event="status" data-id="${item.id}" ${item.is_enabled ? 'checked' : ''}>
            <label class="form-check-label" for="enabled${index}">${item.is_enabled ? '啟用' : '未啟用'}</label>
  </div>
              </td>
              <td>
                 <button type="button" class="btn btn-sm btn-primary" data-event="remove" data-id="${item.id}"> 刪除 </button>
              </td>
            </tr>`
    })
    const productList = document.querySelector('#productList')
    productList.innerHTML = template

    const productAmount = document.querySelector('#totalAmount')
    productAmount.textContent = `目前有 ${this.data.productsData.length} 樣產品`

    const deleteBtn = document.querySelectorAll("[data-event='remove']")
    deleteBtn.forEach((item) => {
      item.addEventListener('click', this.removeProduct.bind(this))
    })

    const statusSwitch = document.querySelectorAll("[data-event='status']")
    statusSwitch.forEach((item) => {
      item.addEventListener('click', this.changeStatus.bind(this))
    })
  },
  init() {
    const cookitToken = document.cookie.replace(/(?:(?:^|.*;\s*)chiayuToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    // console.log(cookitToken)
    axios.defaults.headers.common['Authorization'] = cookitToken
    this.getData()
  },
}
app.init()
