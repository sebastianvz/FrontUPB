import { createMenu, groupBy, createGroupMenu } from '../utils/general';
import { LOGGED } from './constants';

// export default menus => {
//   if (menus.length === 0) {
//     return [];
//   }

//   const items = groupBy(menus, 'menu');
//   if (items == null) {
//     return [];
//   }

//   return [
//     ...Object.keys(items).map((key, i) => {
//       const menu = items[key];
//       return {
//         collapse: true,
//         name: key,
//         state: `collapse${i}`,
//         views: menu.map(x => ({
//           path: x.description,
//           name: x.permmisionName,
//           layout: "",
//           when: LOGGED,
//         })
//         )
//       }
//     }),
//   ];
// };



export default menus => {
  const buildMenuObject = filter => {
    if (menus.length === 0) {
      return [];
    }
    return [
      ...menus.filter(e => e.visible).map((menu, i) => {
        if (menu.route) {
          return {
            collapse: false,
            path: menu.route,
            name: menu.name,
            layout: "",
            state: `collapse${i}`,
            when: LOGGED,
          }
        } else {
          return {
            collapse: true,
            name: menu.name,
            state: `collapse${i}`,
            views: menu.submenus.filter(e => e.visible).map(x => ({
              path: x.route,
              name: x.name,
              layout: "",
              when: LOGGED,
            })
            )
          }
        }
      }),
    ];
  };
  return buildMenuObject('primary')
};
