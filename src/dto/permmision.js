import errorModel from "./error.js";

export default class permmisionModel {
	constructor() {
		this.id = 0;
		this.permmisionName = "string";
		this.description = "string";
		this.controller = "string";
		this.menu = "string";
		this.icon = "string";
		this.isAction = true;
		this.creationDate = "2019-11-05T01:25:14.245Z";
		this.visible = true;
		this.error = new errorModel();
	}
}
