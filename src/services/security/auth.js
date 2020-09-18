import instance from '../instance';
import { auth } from '../../config/services';

export const authenticationService = (username, contrasena) =>
    instance.post(auth.login, { username, contrasena });
    // instance.get('./auth.json');