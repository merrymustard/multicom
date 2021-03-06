import axios from "axios"

const baseURL = "https://guarded-plateau-32903.herokuapp.com"

// const baseURL = "http://localhost:3000"

const service = axios.create({ withCredentials: true, baseURL })

const MY_SERVICE = {
  signup: async user => {
    return await service.post("/signup", user)
  },
  login: async user => {
    return await service.post("/login", user)
  },
  logout: async () => {
    return await service.post("/logout")
  },
  getUser: async () => {
    return await service.get("/loggedin")
  },
  edit: async () => {
    return await service.post("/edit")
  },
  addproduct: async product => {
    return await service.post("/addproduct", product)
  },
  deleteProductFromWishlist: async productId => {
    return await service.post("/delete-product-from-wishlist", productId)
  },
  deleteProduct: async productId => {
    return await service.post("/delete-product", productId)
  },
  getProducts: async query => {
    return await service.get("/products", query)
  },
  productDetail: async productId => {
    return await service.post("/product-detail", { productId: productId })
  },
  createOrder: async order => {
    return await service.post("/new-order", order)
  },
  addProductToWishlist: async article => {
    return await service.post("/add-product-to-wishlist", { article })
  },
  upload: async image => {
    return await service.post("/upload", image)
  },
  getWomanProducts: async() => {
    return await service.get("/woman")
  },
  getManProducts: async() => {
    return await service.get("/man")
  }
}

export default MY_SERVICE
