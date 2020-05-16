import React from 'react';

import { save as saveAPI, remove as deleteAPI } from '../../services/configuration/program';
import { useMatersList as loadMasterList } from '../Masters';

export default function useCRUD() {
  const save = (data, onSucced) =>
    saveAPI.then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const remove = (dto, onSucced) =>
    deleteAPI.then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const loadList = () =>
    loadMasterList().loadProgramList();
  return { save, remove, loadList };
}