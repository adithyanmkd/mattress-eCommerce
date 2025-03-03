let tempPath = ''

const adminSidebar = (req, res, next) => {
  res.locals.adminSidebar = [
    {
      id: 'customer-menu',
      toggleId: 'customer-icon',
      name: 'Customers',
      nestedItems: [
        {
          name: 'All Customers',
          href: '/admin/customers',
          active: req.path === '/customers',
        },
        {
          name: 'Customer Details',
          href: '#',
          active: req.path === '/customers/details',
        },
      ],
    },
  ]
  next()
}

export default adminSidebar
