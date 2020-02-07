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
    ...Object.keys(items).map((key, i) => {
      const menu = items[key];
      return {
        collapse: true,
        name: key,
        state: `collapse${i}`,
        views: menu.map(x => ({
          path: x.description,
          name: x.permmisionName,
          layout: "",
          when: LOGGED,
        })
        )
      }
    }),
  ];
};
