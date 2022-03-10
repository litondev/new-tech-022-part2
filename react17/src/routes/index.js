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
	}
];

export default myRoutes;