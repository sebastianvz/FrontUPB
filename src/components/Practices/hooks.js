import React from 'react';
import instance from '../../services/instance';

import { save as saveAPI } from '../../services/practices/practices';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {
    const save = (data, onSucced) => {
        saveAPI(data).then(e => {
            onSucced();
        }).catch(e => {
        });
    };
    const remove = () => { };
    const list = () => { };
    const loadList = () => loadMasterList().loadPracticesList();
    return { save, remove, list, loadList };
}