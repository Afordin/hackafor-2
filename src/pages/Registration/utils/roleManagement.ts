import { RequiredRoles } from '@common';

type SetRoleState = React.Dispatch<React.SetStateAction<RequiredRoles>>;

/**
 * The function `addWantedRole` increments the count of a specific role in a set state if the current
 * number of members is less than 3.
 * @param {string} role - The `role` parameter in the `addWantedRole` function represents the role that
 * you want to add to the set of wanted roles. It is a string value that specifies the role you are
 * interested in adding.
 * @param {number} currentNumberOfMembers - The `currentNumberOfMembers` parameter represents the
 * current number of members in a group or team. This value is used in the `addWantedRole` function to
 * determine whether a new role can be added based on a condition (in this case, if the current number
 * of members is less than
 * @param {SetRoleState} setWantedRoles - `setWantedRoles` is a function that is used to update the
 * state of wanted roles in a component. It takes a new state value as an argument and updates the
 * state accordingly.
 */
export const addWantedRole = (role: string, currentNumberOfMembers: number, setWantedRoles: SetRoleState) => {
  setWantedRoles((prev) => {
    if (currentNumberOfMembers < 3) {
      const newCount = (prev[role] || 0) < 3 ? prev[role] + 1 : prev[role];
      return { ...prev, [role]: newCount };
    }
    return prev;
  });
};

/**
 * The function `removeWantedRole` decreases the count of a specific role in a set of roles.
 * @param {string} role - The `role` parameter is a string that represents the role that you want to
 * remove from the set of wanted roles.
 * @param {SetRoleState} setWantedRoles - The `setWantedRoles` parameter is a function that allows you
 * to update the state of wanted roles in your application. It takes a new state value as an argument
 * and updates the state accordingly. In the provided function `removeWantedRole`, it is used to update
 * the count of a specific
 */
export const removeWantedRole = (role: string, setWantedRoles: SetRoleState) => {
  setWantedRoles((prev) => {
    const newCount = (prev[role] || 0) > 0 ? prev[role] - 1 : prev[role];
    return { ...prev, [role]: newCount };
  });
};
