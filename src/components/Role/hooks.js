import React from 'react';
import {
    save as saveAPI,
    list as listAPI,
    remove as deleteAPI,
} from '../../services/security/role';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {
    const { loadRoleList } = loadMasterList();
    const save = (data, onSucced) => saveAPI(data)
        .then(e => {
            onSucced();
        }).catch(e => {
        });
    const remove = (id, onSucced) => deleteAPI(id)
        .then(e => {
            onSucced();
        }).catch(e => {
        });
    const list = (onSucced) => listAPI()
        .then(e => {
            onSucced(e.data);
        }).catch(e => {
        });
    const loadList = (callback) => loadRoleList(callback);

    return { loadList, save, list, remove };
}