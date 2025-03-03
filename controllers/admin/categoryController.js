// get category add page
const getCategoryAdd = (req, res) => {
  res.render('/admin/pages/AddCategory', {
    layout: 'layouts/admin-layout.ejs',
  })
}

const categoryController = {
  getCategoryAdd,
}

// export controller
export default categoryController
