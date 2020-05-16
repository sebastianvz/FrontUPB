import React from 'react';
import store from '../../config/store';

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

  const loadSemestersByProgram = (id) => store.dispatch.masters.getSemestersByProgram(() => {});

  return {
    loadPracticesList,
    loadProgramList,
    loadSemestersByProgram,
  };
}