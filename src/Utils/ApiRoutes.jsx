const ApiRoutes = {
    Register: {
        path: "/user/register",
        authenticate: false
    },

    Login: {
        path: "/user/login",
        authenticate: false
    },

    getAllBlogs: {
        path: "/blog/get-all-blogs",
        authenticate: true
    },

    getMyBlogs: {
        path: "/blog/get",
        authenticate: true
    },

    createBlog: {
        path: "/blog/create",
        authenticate: true
    },

    getBlogById: {
        path: "/blog/getblog-by-id",
        authenticate: true
    },

    deleteBlog: {
        path: "/blog/delete",
        authenticate: true
    },

    updateBlog: {
        path: "/blog/update-blog",
        authenticate: true
    },

    getUserDetails: {
        path: "/user/get",
        authenticate: true
    },

    forgotPassword: {
        path: "/user/forgot-password",
        authenticate: false
    },

    resetPassword: {
        path: "/user/reset-password",
        authenticate: false
    }
}

export default ApiRoutes;