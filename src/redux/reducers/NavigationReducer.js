import Navigator from '../../navigation/StackNavigator'

const recentlyVisitedRoutes = new Set();//防止重复跳转相同页面

export function navReducer(state, action)  {
  if (action.type === 'Navigation/NAVIGATE') {
    if (recentlyVisitedRoutes.has(action.routeName)) {
      return state;
    }
    recentlyVisitedRoutes.add(action.routeName);
    setTimeout(() => {
      recentlyVisitedRoutes.delete(action.routeName);
    }, 400);
  }
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
}