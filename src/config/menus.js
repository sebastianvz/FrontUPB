import { createMenu, groupBy, createGroupMenu } from '../utils/general';
import { LOGGED } from './constants';

export default menus => {
  if (menus.length === 0) {
    return [];
  }

  const items = groupBy(menus, 'menu');
  if (items == null) {
    return [];
  }

  return [
    ...Object.keys(items).map(key => {
      const menu = items[key];
      return createGroupMenu(
        menu[0].icon,
        key,
        menu.map(x =>
          createMenu(x.description, x.permmisionName, '', LOGGED),
        ))
      }),
  ];
};
