class Helper {
  static populateComponentsInRoutes(routes: RouteConfig[], components: any) {
    routes &&
      routes.forEach((route) => {
        const Component: JSX.ElementType =
          components[route.element as keyof object]
        route.element = <Component />
        if (route.children) {
          Helper.populateComponentsInRoutes(route.children, components)
        }
      })
  }

  static groupBy(array: Task[], key: keyof Task): TaskGroup[] {
    if (!array) return [];
    const groups: Record<string | number, Task[]> = {};
    array.forEach((item) => {
      const groupKey = item[key] as string | number;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    return Object.entries(groups).map(([groupId, tasks]) => ({ groupId, tasks }));
  }
}

export default Helper
