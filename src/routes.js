import Users from "views/Pages/Security/Users.js";
import Permissions from "views/Pages/Security/Permissions.js";
import Roles from "views/Pages/Security/Roles.js";
import Practices from "views/Pages/Practices/Practices.js";

// @material-ui/icons
import Lock from "@material-ui/icons/Lock";
import LibraryBooks from '@material-ui/icons/LibraryBooks';

let dashRoutes = [
	{
		collapse: true,
		name: "Seguridad",
		icon: Lock,
		state: "securityCollapse",
		views: [
			{
				path: "/permisos",
				name: "Permisos",
				mini: "◦",
				component: Permissions,
				layout: "/admin"
			},
			{
				path: "/roles",
				name: "Roles",
				mini: "◦",
				component: Roles,
				layout: "/admin"
			},
			{
				path: "/usuarios",
				name: "Usuarios",
				mini: "◦",
				component: Users,
				layout: "/admin"
			}
		]
	},
	{
		collapse: true,
		name: "Practicas",
		icon: LibraryBooks,
		state: "praticesCollapse",
		views: [
			{
				path: "/practicas", //Extension URL
				name: "Practicas", //Nombre
				mini: "◦",
				component: Practices, 
				layout: "/admin"
			}
		]
	}
];
export default dashRoutes;
