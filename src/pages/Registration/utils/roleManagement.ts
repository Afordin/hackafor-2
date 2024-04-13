export type RoleState = { [key: string]: number };
export type SetRoleState = React.Dispatch<React.SetStateAction<RoleState>>;

export const addWantedRole = (role: string, currentNumberOfMembers: number, setWantedRoles: SetRoleState) => {
  setWantedRoles((prev) => {
    if (currentNumberOfMembers < 3) {
      const newCount = (prev[role] || 0) < 3 ? prev[role] + 1 : prev[role];
      return { ...prev, [role]: newCount };
    }
    return prev;
  });
};

export const removeWantedRole = (role: string, setWantedRoles: SetRoleState) => {
  setWantedRoles((prev) => {
    const newCount = (prev[role] || 0) > 0 ? prev[role] - 1 : prev[role];
    return { ...prev, [role]: newCount };
  });
};
