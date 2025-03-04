// // sample categories
// const categories = [
//   {
//     name: 'Travel',
//     description:
//       'Choose from a wide range of travel accessories from popular brands',
//     totalProducts: 4186,
//     totalEarnings: 7912.99,
//     image: '/images/travel.png',
//   },
//   {
//     name: 'Smart Phone',
//     description: 'Choose from a wide range of smartphones from popular brands',
//     totalProducts: 1947,
//     totalEarnings: 99129,
//     image: '/images/smartphone.png',
//   },
//   {
//     name: 'Shoes',
//     description: 'Explore the latest shoes from top brands',
//     totalProducts: 4940,
//     totalEarnings: 3612.98,
//     image: '/images/shoes.png',
//   },
//   {
//     name: 'Jewellery',
//     description: 'Choose from a wide range of jewellery from popular brands',
//     totalProducts: 4186,
//     totalEarnings: 7912.99,
//     image: '/images/jewellery.png',
//   },
// ]

import Category from '../../models/catagoryModel.js'

// get category add page
const getAddCategory = (req, res) => {
  res.render('admin/pages/categories/AddCategory', {
    layout: 'layouts/admin-layout.ejs',
  })
}

// saving category into database
const postAddCategory = async (req, res) => {
  const { categoryName, description } = req.body
  const imgPath = req.files.categoryImage[0].path.replace(/.*\/public\//, '/')
  const category = await Category.find({ name: categoryName })

  if (category.length > 0) {
    return res.json({ Error: 'category already exits' })
  }

  try {
    const newCategory = new Category({
      name: categoryName,
      description,
      image: {
        path: imgPath,
        alt: `${categoryName} image`,
      },
    })

    await newCategory.save() // saving new category
    res.redirect('/admin/categories')
  } catch (error) {
    res.json({ Error: error, DeveloperNote: 'error from post add category' })
  }
}

// list all categories
const getCategoryList = async (req, res) => {
  const categories = await Category.find({})
  console.log(categories)

  res.render('admin/pages/categories/ListCategory', {
    layout: 'layouts/admin-layout.ejs',
    categories,
  })
}

const categoryController = {
  getAddCategory,
  getCategoryList,
  postAddCategory,
}

// export controller
export default categoryController
