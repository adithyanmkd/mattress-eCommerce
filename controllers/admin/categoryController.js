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
  let searchValue = req.query.search || '' // accessing search value from url

  const page = parseInt(req.query.page) || 1
  const limit = 1 // Number of products per page
  const skip = (page - 1) * limit

  // Build the search filter
  let filter = {}
  if (searchValue) {
    filter = {
      $or: [{ name: { $regex: searchValue, $options: 'i' } }],
    }
  }

  const totalCategory = await Category.countDocuments({
    isDeleted: false,
  })

  const totalPages = Math.ceil(totalCategory / limit)

  const categories = await Category.find({ ...filter, isDeleted: false })
    .skip(skip)
    .limit(limit)

  res.render('admin/pages/categories/ListCategory', {
    layout: 'layouts/admin-layout.ejs',
    categories,
    page,
    totalPages,
  })
}

// delete category
const deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    category.isDeleted = true
    await category.save()
    res.redirect('/admin/categories')
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'error from delete category controlle',
    })
  }
}

const categoryController = {
  getAddCategory,
  getCategoryList,
  postAddCategory,
  deleteCategory,
}

// export controller
export default categoryController
