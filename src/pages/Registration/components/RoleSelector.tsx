import { cn, FormFieldState, Role, Variant } from '@common';
import { Button } from '@components';

interface RoleSelectorProps {
  /**
   * The roles that can be selected.
   */
  roles: Array<Role>;

  /**
   * The currently selected role.
   */
  selectedRole: string;

  /**
   * Callback function invoked when the selected role changes.
   * @param role The newly selected role.
   */
  onRoleChange: (role: Role) => void;

  /**
   * The state of the form field, which includes properties like validity and error messages.
   */
  fieldState: FormFieldState;

  /**
   * Optional text to provide assistance or context for the role selector.
   */
  assistiveText?: string;
}

export const RoleSelector = ({ roles, selectedRole, onRoleChange, fieldState, assistiveText }: RoleSelectorProps) => {
  const classes = {
    assistiveText: cn('mt-2 text-xs font-medium absolute -bottom-6', {
      'text-slate-600': fieldState === FormFieldState.default,
      'text-rose-500': fieldState === FormFieldState.error,
      'text-green-600': fieldState === FormFieldState.success
    })
  };
  return (
    <div className="relative">
      <div className="flex gap-4 flex-wrap">
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? Variant.primary : Variant.secondary}
            hasBorder
            className="whitespace-nowrap capitalize"
            innerClassName="px-2 py-1"
            onClick={() => onRoleChange(role)}
          >
            {role}
          </Button>
        ))}
      </div>
      {assistiveText && <span className={classes.assistiveText}>{assistiveText}</span>}
    </div>
  );
};
