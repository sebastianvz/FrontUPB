import React from 'react';

import { save as saveAPI, list as listAPI } from '../../services/practices/asociatePractice';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {
    const save = (data, onSucced) => saveAPI(data)
        .then(e => {
            onSucced();
        }).catch(e => {
        });
    const list = (data, onSucced) => listAPI(data)
        .then(e => {
            onSucced(e.data);
        }).catch(e => {
        });
    const loadList = () => loadMasterList().loadProgramList();
    
    return { loadList, save, list };
}