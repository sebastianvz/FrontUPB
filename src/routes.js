import Users from "views/Tables/Users.js";
import Permissions from "views/Tables/Permissions.js";
import Roles from "views/Tables/Roles.js";

// @material-ui/icons
import Lock from "@material-ui/icons/Lock";

let dashRoutes = [
	{
		collapse: true,
		name: "Seguridad",
		icon: Lock,
		state: "pageCollapse",
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
	}
];
export default dashRoutes;
