//Security
export const auth = {
    login: 'LoginAuth/Authenticate',
    logout: '/',
    validateAuth: '/',
    changePassword: '/',
};

export const attachment = {
    saveTemp: '/Attachments/saveTemp',
    remove: '/Attachments/Remove',
}

export const practices = {
    save: 'Practics',
    remove: 'Practices/Remove',
    list: 'Practices/List',
    getById: 'Practics/',
}

export const asociatePractices = {
    list: 'SemestersPratice/',
    save: 'SemestersPratice'
};

export const reservation = {
    list: 'Reserva/GetByProgramSemester/',
    save: 'Reserva',
    changeState: 'Reserva/ChangeState',
};

export const program = {
    save: 'Program',
    delete: 'Program',
};

export const semester = {
    save: 'Semester',
    delete: 'Semester',
};