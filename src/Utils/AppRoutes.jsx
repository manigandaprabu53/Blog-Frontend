import Home from "../Pages/Home";
import MyBlogs from "../Pages/MyBlogs";
import Profile from "../Pages/Profile";
import CreateBlog from "../Pages/CreateBlog";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import View from "../Pages/View";
import EditBlog from "../Pages/EditBlog";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";

const AppRoutes = [
    {
        path: "/",
        element: <Home/>
    },

    {
        path: "/login",
        element: <Login/>
    },

    {
        path: "/register",
        element: <Register/>
    },

    {
        path: "/myblogs",
        element: <MyBlogs/>
    },

    {
        path: "profile",
        element: <Profile/>
    },

    {
        path: "/create",
        element: <CreateBlog/>
    },

    {
        path: "/viewblog/:id",
        element: <View/>
    },

    {
        path: "/editblog/:id",
        element: <EditBlog/>
    },

    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },

    {
        path: "/reset-password/:id",
        element: <ResetPassword/>
    }
]

export default AppRoutes;