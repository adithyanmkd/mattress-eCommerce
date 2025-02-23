# EJS Folder Structure

## views/

This directory contains all the EJS templates for the application.

## layouts/

Common layout templates for different sections of the site.

- `user-layout.ejs` - Layout for user pages
- `admin-layout.ejs` - Layout for admin pages
- `auth-layout.ejs` - Layout for authentication pages (login, register)
- `error.ejs` - Error page layout

## user/

Contains user-related views and components.

### pages/

- `home.ejs` - User homepage
- `profile.ejs` - User profile page
- `contact.ejs` - Contact page
- `cart.ejs` - Shopping cart page

### partials/

Reusable UI components for user pages.

#### atoms/

Basic UI elements.

- `button.ejs` - Button component
- `icon.ejs` - Icon component
- `input.ejs` - Input field
- `text.ejs` - Text component

#### molecules/

Combinations of atoms to form more complex UI elements.

- `card.ejs` - Card component
- `product.ejs` - Product display component
- `rating.ejs` - Rating stars component
- `form-group.ejs` - Form input group

#### organisms/

Larger UI components composed of molecules and atoms.

- `navbar.ejs` - Navigation bar
- `footer.ejs` - Footer section
- `sidebar.ejs` - Sidebar menu
- `hero-section.ejs` - Hero section
- `carousel.ejs` - Image carousel
