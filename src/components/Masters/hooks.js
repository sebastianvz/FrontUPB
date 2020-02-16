import React from 'react';
import store from '../../config/store';

export default function useMatersList() {
    const loadPracticesList = () => {
        store.dispatch.masters.getDevices();
        store.dispatch.masters.getSimulator();
        store.dispatch.masters.getSupplies();
        store.dispatch.masters.getAutors();
    };
    return { loadPracticesList };
}