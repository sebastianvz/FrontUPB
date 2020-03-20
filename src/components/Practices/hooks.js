import React from 'react';
import instance from '../../services/instance';

import { save as saveAPI, getById as getByIdAPI, update as updateAPI, removeFile as removeFileAPI } from '../../services/practices/practices';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {    
    const save = (data, onSucced) => {
        debugger;
        let _API;
        if (data.id > 0) {
            _API = updateAPI(data);
        } else {
            _API = saveAPI(data);
        }
        _API.then(e => {
            onSucced();
        }).catch(e => {
        });
    };
    const getById = (id, onSucced = () => { }) => {
        getByIdAPI(id)
            .then(e => {
                onSucced(e.data.data);
            })
            .catch(e => { });
    };
    const remove = () => { };
    const removeFile = (id, type, onSucced) => {
        removeFileAPI(id, type).then(e => {
            onSucced && onSucced();
        });
    };
    const list = () => { };
    const loadList = () => loadMasterList().loadPracticesList();
    return { save, remove, list, loadList, getById, removeFile };
}