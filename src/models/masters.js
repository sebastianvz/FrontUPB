import instance from '../services/instance';

const masters = {
	state: {
		programs: null,
		supplies: null,
		simulators: null,
		devices: null,
		autors: null,
		objetives: null,
	},
	reducers: {
		setPrograms: (state, payload) => ({
			...state,
			programs: payload.data
		}),
		setSupplies: (state, payload) => ({
			...state,
			supplies: payload.data
		}),
		setSimulators: (state, payload) => ({
			...state,
			simulators: payload.data
		}),
		setDevice:(state, payload) => ({
			...state,
			devices: payload.data
		}),
		setAutors:(state, payload) => ({
			...state,
			autors: payload.data,
		}),
		setObjetives:(state, payload) => ({
			...state,
			objetives: payload.data,
		}),
	},
	effects: dispatch => ({
		getPrograms(onSucced) {
			instance.get('Master/GetPrograms').then(e => {
				if(e.data) {
					this.setPrograms(e.data);
					onSucced && onSucced();
				}
			});
		},
		getDevices(onSucced) {
			instance.get('Master/GetDevices').then(e => {
				if(e.data) {
					this.setDevice(e.data);
					onSucced && onSucced();
				}
			});
		},
		getSimulator(onSucced) {
			instance.get('Master/GetSimulators').then(e => {
				if(e.data) {
					this.setSimulators(e.data);
					onSucced && onSucced();
				}
			});
		},
		getSupplies(onSucced) {
			instance.get('Master/GetSupplies').then(e => {
				if(e.data) {
					this.setSupplies(e.data);
					onSucced && onSucced();
				}
			});
		},
		getAutors(onSucced) {
			instance.get('User').then(e => {
				if(e.data) {
					this.setAutors(e.data);
					onSucced && onSucced();
				}
			});
		},
	}),
};

export default masters;