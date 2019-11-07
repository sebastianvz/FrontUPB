import errorModel from "models/error.js";
import permmisionModel from "models/permmision.js";

export default class roleModel {
	constructor(roleName) {
		{
			this.id = 0;
			this.roleName = roleName;
			this.error = new errorModel();
			this.permmisionRole = [new permmisionModel()];
		}
	}
}
