# Sienna-Charles demo app

Preview the app on:
https://sienna-charles-demo.vercel.app

### Features

Vendors features:
- listing vendors
- creating vendors
- deleting vendors
- editing vendors

Categories features:
- listing categories
- creating categories
- deleting categories
- editing categories

### Tech stack
- `React` + `Vite` - as project base
- `TanStack Query` - for server-state management
- `Supabase SDK` - for connecting to Supabase platform
- `Drizzle Kit` - for managing database schema and running migrations
- `ShadCn` - for UI components
- `KiboUI` - for advanced UI components
- `React Router` - for simple routing
- `Tailwind CSS` - for styling
- `React Hook Form` - for creating forms
- `Zod` - for validation
  
### How to run locally
- Clone the repo
- Run `yarn install`
- Create `.env` file in root folder
- Paste env variables I shared in the report to `.env` file
- Run `yarn dev`

### Known issues
- Multiselect component from KiboUI used for selecting categories in the form for creating/editing vendor has an issues and does not pick up default values every time. This is known issue and I was not intending to fix it as part of this project

### What I wanted to showcase
- ability to implement things quickly
- ability to think on my own and provide needed features
- ability to split and organize code in maintainable and scalable structure. PS. this project is small and not enough to show all techniques I use to keep code nicely organized and ready to scale
- ability to write reusable and sharable code by creating reusable forms for creating/editing vendors and categories to mimic real case of reusability
 