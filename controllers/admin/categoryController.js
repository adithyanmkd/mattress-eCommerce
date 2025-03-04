// sample categories
const categories = [
  {
    name: 'Travel',
    description:
      'Choose from a wide range of travel accessories from popular brands',
    totalProducts: 4186,
    totalEarnings: 7912.99,
    image: '/images/travel.png',
  },
  {
    name: 'Smart Phone',
    description: 'Choose from a wide range of smartphones from popular brands',
    totalProducts: 1947,
    totalEarnings: 99129,
    image: '/images/smartphone.png',
  },
  {
    name: 'Shoes',
    description: 'Explore the latest shoes from top brands',
    totalProducts: 4940,
    totalEarnings: 3612.98,
    image: '/images/shoes.png',
  },
  {
    name: 'Jewellery',
    description: 'Choose from a wide range of jewellery from popular brands',
    totalProducts: 4186,
    totalEarnings: 7912.99,
    image: '/images/jewellery.png',
  },
]

// get category add page
const getAddCategory = (req, res) => {
  res.render('admin/pages/categories/AddCategory', {
    layout: 'layouts/admin-layout.ejs',
  })
}

const getCategoryList = (req, res) => {
  res.render('admin/pages/categories/ListCategory', {
    layout: 'layouts/admin-layout.ejs',
    categories,
  })
}

const categoryController = {
  getAddCategory,
  getCategoryList,
}

// export controller
export default categoryController
