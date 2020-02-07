import { lazy } from 'react';
import { createRoute } from '../utils/general';
import Home from '../views/Pages/Home';
import { LOGGED, GUEST } from './constants';

//Common
const AsyncAbout = lazy(() => import('../views/Pages/Abaout.js'));

//AUTH
const AsyncLogin = lazy(() => import('../views/Pages/LoginPage.js'));

//Security
const AsyncUsers = lazy(() => import('../views/Pages/Security/Users.js'));
const AsyncPermissions = lazy(() => import('../views/Pages/Security/Permissions.js'));
const AsyncRoles = lazy(() => import('../views/Pages/Security/Roles.js'));

//Practices
const AsyncPractices = lazy(() => import('../views/Pages/Practices/Practices.js'));

export default [
	//AUTH
	createRoute('/login', AsyncLogin, GUEST),
	createRoute('/Usuarios', AsyncUsers, LOGGED),

	//Security
	createRoute('/Roles', AsyncRoles, LOGGED),
	createRoute('/Permisos', AsyncPermissions, LOGGED),

	//Practices
	createRoute('/Practicas', AsyncPractices, LOGGED),

	//Common
	createRoute('/abaout', AsyncAbout),
	createRoute('/', Home, LOGGED, true),
];



// import Users from "views/Pages/Security/Users.js";
// import Permissions from "views/Pages/Security/Permissions.js";
// import Roles from "views/Pages/Security/Roles.js";
// import Practices from "views/Pages/Practices/Practices.js";

// @material-ui/icons
// import Lock from "@material-ui/icons/Lock";
// import LibraryBooks from '@material-ui/icons/LibraryBooks';

// let dashRoutes = [
// 	{
// 		collapse: true,
// 		name: "Seguridad",
// 		icon: Lock,
// 		state: "securityCollapse",
// 		views: [
// 			{
// 				path: "/permisos",
// 				name: "Permisos",
// 				mini: "◦",
// 				component: Permissions,
// 				layout: "/admin"
// 			},
// 			{
// 				path: "/roles",
// 				name: "Roles",
// 				mini: "◦",
// 				component: Roles,
// 				layout: "/admin"
// 			},
// 			{
// 				path: "/usuarios",
// 				name: "Usuarios",
// 				mini: "◦",
// 				component: Users,
// 				layout: "/admin"
// 			}
// 		]
// 	},
// 	{
// 		collapse: true,
// 		name: "Practicas",
// 		icon: LibraryBooks,
// 		state: "praticesCollapse",
// 		views: [
// 			{
// 				path: "/practicas", //Extension URL
// 				name: "Practicas", //Nombre
// 				mini: "◦",
// 				component: Practices, 
// 				layout: "/admin"
// 			}
// 		]
// 	}
// ];
// export default dashRoutes;
