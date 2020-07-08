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
const AsyncReservations = lazy(() => import('../views/Pages/Practices/Reservations.js'));

//Configuration
const AsyncPrograms = lazy(() => import('../views/Pages/Configuration/Programs.js'));
const AsyncSemesters = lazy(() => import('../views/Pages/Configuration/Semester.js'));
const AsyncReservationState = lazy(() => import('../views/Pages/Configuration/ReservationState.js'));

export default [
	//AUTH
	createRoute('/login', AsyncLogin, GUEST),
	createRoute('/Usuarios', AsyncUsers, LOGGED),

	//Security
	createRoute('/Roles', AsyncRoles, LOGGED),
	createRoute('/Permisos', AsyncPermissions, LOGGED),

	//Practices
	createRoute('/Practicas', AsyncPractices, LOGGED),
	createRoute('/Practica', AsyncPractice, LOGGED),	
	createRoute('/asociatePractice', AsyncAsociatePractice, LOGGED),	
	createRoute('/reserva', AsyncReservations, LOGGED),	

	//Common
	createRoute('/abaout', AsyncAbout),
	createRoute('/', Home, LOGGED, true),

	//Configuration
	createRoute('/programs', AsyncPrograms, LOGGED),
	createRoute('/semesters', AsyncSemesters, LOGGED),
	createRoute('/estadoReserva', AsyncReservationState, LOGGED),
];