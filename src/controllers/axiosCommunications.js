import axios from "axios";

let auth;

const loginAxios = (user, password) => {
	const URL =
		"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/LoginAuth/Authenticate";
	axios
		.post(URL, {
			username: user,
			contrasena: password
		})
		.then(function(response) {
			auth = response.data.data.token;
			console.log(response.data.data.token);

			if (auth === null) {
				return false;
			} else {
				return true;
			}
		})
		.catch(function(error) {
			console.log(error);
			return false;
		});
};

const getPermission = () => {
	const URL =
		"http://ec2-18-189-114-244.us-east-2.compute.amazonaws.com/Sislab/api/Permission";
	axios
		.get(URL, {
			headers: {
				Authorization: "Bearer " + auth
			}
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
};

export {loginAxios, getPermission};
