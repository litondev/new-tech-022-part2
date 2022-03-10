import React from "react";

const myRoutes = [
	{
		path : "/signin",
		component : React.lazy(() =>  import('../views/Signin'))
	},
	{
		path : "/signup",
		component : React.lazy(() =>  import('../views/Signup'))
	},
	{
		path : '/reset-password',
		component : React.lazy(() => import("../views/ResetPassword"))
	},
	{
		path : "/forgot-password",
		component : React.lazy(() =>  import('../views/ForgotPassword'))
	},
	{
		path : "/product",
		component : React.lazy(() => import('../views/Product'))
	},
	{
		path : '/profil',
		component : React.lazy(() => import('../views/Profil'))
	},
	{
		path : "/example-redux",
		component : React.lazy(() => import("../views/ExampleRedux"))
	},
	{
		path : "/example-redux/user",
		component : React.lazy(() => import("../views/ExampleRedux/user.js"))
	},
	{
		path : "/example-redux/see-user",
		component : React.lazy(() => import("../views/ExampleRedux/see-user.js"))
	}
];

export default myRoutes;