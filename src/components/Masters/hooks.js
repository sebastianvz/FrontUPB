import React from 'react';

import store from '../../config/store';
import { save as programSaveAPI, remove as programDeleteAPI } from '../../services/configuration/program';
import { save as semesterSaveAPI, remove as semesterDeleteAPI } from '../../services/configuration/semester';
import {
  save as parameterSaveAPI,
  remove as parameterDeleteAPI,
  list as parameterListAPI
} from '../../services/configuration/parameter';

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

  const loadProgramList = (callback) => {
    store.dispatch.masters.getPrograms(() => {
      callback && callback();
    });
  };

  const loadSemesterList = () => {
    store.dispatch.masters.getPrograms(() => {

    });
  };

  const loadSemestersByProgram = () => store.dispatch.masters.getSemestersByProgram(() => { });

  const loadPractices = (programSemesterId) => store.dispatch.masters.getPractices({ programSemesterId });

  const loadSemestersList = () => {
    store.dispatch.masters.getPrograms(() => {
      store.dispatch.masters.getSemesters(() => {

      });
    });
  };

  const loadRoleList = (callback) => {
    store.dispatch.masters.getPermissions(() => {
      store.dispatch.masters.getMenues(() => {
        callback && callback();
      });
    });
  };

  return {
    loadPracticesList,
    loadProgramList,
    loadSemestersByProgram,
    loadSemestersList,
    loadSemesterList,
    loadPractices,
    loadRoleList,
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

export function useParameter() {
  const save = (data, onSucced) =>
    parameterSaveAPI(data).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const remove = (dto, onSucced) =>
    parameterDeleteAPI(dto).then(e => {
      onSucced(e);
    }).catch(e => {
      // onError(e)
    });
  const list = (onSucced) =>
    parameterListAPI().then(e => {
      onSucced(e.data.data);
    }).catch(e => {
      // onError(e)
    });
  return { save, remove, list };
}