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
const AsyncPractice = lazy(() => import('../views/Pages/Practices/Practice.js'));
const AsyncAsociatePractice = lazy(() => import('../views/Pages/Practices/AsociatePractice.js'));

export default [
	//AUTH
	createRoute('/login', AsyncLogin, GUEST),
	createRoute('/Usuarios', AsyncUsers, LOGGED),

	//Security
	createRoute('/Roles', AsyncRoles, LOGGED),
	createRoute('/Permisos', AsyncPermissions, LOGGED),

	//Practices
	createRoute('/Practicas', AsyncPractices, LOGGED),
	createRoute('/Practica/:id?', AsyncPractice, LOGGED),	
	createRoute('/asociatePractice', AsyncAsociatePractice, GUEST),	

	//Common
	createRoute('/abaout', AsyncAbout),
	createRoute('/', Home, LOGGED, true),
];