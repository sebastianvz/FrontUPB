import { useState, useEffect } from 'react';
import { useAuthenticated } from '../Auth';
import { GUEST, LOGGED } from '../../config/constants';
import store from '../../config/store';

export function useMenu() {
    const { isAuthenticated } = useAuthenticated();
    const [menus, setMenu] = useState(store.getState().config.menu);
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const _menu = store.getState().config.menu;
        if (_menu && menus !== _menu) {
          setMenu(
            _menu.filter(menu => {
              return (
                menu.when === undefined ||
                (isAuthenticated === false && menu.when === GUEST) ||
                (isAuthenticated === true && menu.when === LOGGED)
              );
            }),
          );
        }
      });
      return unsubscribe;
    }, [isAuthenticated, menus]);
  
    return menus || [];
  }