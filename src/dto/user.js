export default class userModel {
	constructor(
		username,
		contrasena,
		idTipoIdentificacion,
		numeroIdentificacion,
		nombreCompleto,
		apellidos,
		emailUpb,
		arrayRoles,
		arrayProgramas,
		celular = null,
		otrosTrabajos = null,
		idUpb = null,
		emailPersonal = null,
		profesion = null,
		idUserSender = null
	) {
		{
			this.username = username;
			this.contrasena = contrasena;
			this.activo = true;
			this.idTipoIdentificacion = idTipoIdentificacion;
			this.numeroIdentificacion = numeroIdentificacion;
			this.nombreCompleto = nombreCompleto;
			this.apellidos = apellidos;
			this.idUpb = idUpb;
			this.celular = celular;
			this.emailPersonal = emailPersonal;
			this.emailUpb = emailUpb;
			this.profesion = profesion;
			this.otrosTrabajos = otrosTrabajos;
			this.idUserSender = idUserSender;
			this.role = arrayRoles;
			this.programa = arrayProgramas;
		}
	}
}
