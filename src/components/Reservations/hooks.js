import React from 'react';
import {
    save as saveAPI,
    list as listAPI,
    changeState as changeStateAPI
} from '../../services/practices/reservation';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {
    const { loadProgramList, loadPractices } = loadMasterList();
    const save = (data, onSucced) => saveAPI(data)
        .then(e => {
            onSucced();
        }).catch(e => {
        });
    const changeState = (data, onSucced) => changeState(data)
        .then(e => {
            onSucced();
        }).catch(e => {
        });
    const list = (data, onSucced) => listAPI(data)
        .then(e => {
            onSucced(e.data);
        }).catch(e => {
        });
    const loadList = (callback) => loadProgramList(callback);
    const loadPracticesList = (programSemesterId) => loadPractices(programSemesterId);

    return { loadList, save, list, changeState, loadPracticesList };
}