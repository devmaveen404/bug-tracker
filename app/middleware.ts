//securing the application
//prevent unauthorized users from accessing issues
export { default } from 'next-auth/middleware'

//configuration objects to specify the routes to be protected
export const config = {
    matcher: [
        '/issues/new',
        // adding a modifier, (+) to protect all edit related pages
        '/issues/edit/:id+'
    ]
}