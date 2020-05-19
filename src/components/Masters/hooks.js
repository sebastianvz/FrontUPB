import React from 'react';

import store from '../../config/store';
import { save as programSaveAPI, remove as programDeleteAPI } from '../../services/configuration/program';
import { save as semesterSaveAPI, remove as semesterDeleteAPI } from '../../services/configuration/semester';

export default function useMatersList() {
  const loadPracticesList = () => {
    store.dispatch.masters.getDevices(() => {
      store.dispatch.masters.getSimulator(() => {
        store.dispatch.masters.getSupplies(() => {
          store.dispatch.masters.getAutors();
        });
      });
    });
  };

  const loadProgramList = () => {
    store.dispatch.masters.getPrograms(() => {

    });
  };

  const loadSemesterList = () => {
    store.dispatch.masters.getPrograms(() => {

    });
  };

  const loadSemestersByProgram = () => store.dispatch.masters.getSemestersByProgram(() => { });

  const loadSemestersList = () => {
    store.dispatch.masters.getPrograms(() => {
      store.dispatch.masters.getSemesters(() => {
     
      });
    });
  };

  return {
    loadPracticesList,
    loadProgramList,
    loadSemestersByProgram,
    loadSemestersList,
    loadSemesterList,
  };
};

export function useProgram() {
  const { loadProgramList } = useMatersList();
  const save = (data, onSucced) =>
    programSaveAPI(data).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const remove = (dto, onSucced) =>
    programDeleteAPI(dto).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const loadList = () =>
    loadProgramList();
  return { save, remove, loadList };
}

export function useSemester() {
  const { loadSemestersList } = useMatersList();
  const save = (data, onSucced) =>
    semesterSaveAPI(data).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const remove = (dto, onSucced) =>
    semesterDeleteAPI(dto).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const loadList = () => loadSemestersList();
  return { save, remove, loadList };
}