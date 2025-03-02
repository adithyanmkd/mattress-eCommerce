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
          active: req.path === '/admin/customers',
        },
        {
          name: 'Customer Details',
          href: '#',
          active: req.path === '/admin/customers/details',
        },
      ],
    },
  ]
  next()
}

export default adminSidebar
