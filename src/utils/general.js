export const nextNumber = (next = 1) => () => next++;

const nextRouteIndex = nextNumber();
export const createRoute = (url, component, when = null, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  when,
  exact,
});

const nextMenuIndex = nextNumber();
export const createMenu = (url, title, icon, when) => ({
  index: nextMenuIndex(),
  title,
  path: url,
  icon,
  when,
});

export const createComponent = (component, when) => ({
  index: nextMenuIndex(),
  component,
  when,
});

export const createGroupMenu = (icon, name, subMenus) => ({
  index: nextMenuIndex(),
  icon,
  name,
  subMenus,
});

export const sortString = key => (a, b) =>
  a[key] ? a[key].localeCompare(b[key]) : true;
export const sortNumber = key => (a, b) => a[key] - b[key];
export const sortBool = key => (a, b) => b[key] - a[key];

export const groupBy = (array, prop) =>
  array.reduce((groups, item) => {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});