import { cn, FormFieldState, Variant } from '@common';
import { Button } from '@components';

export const RoleSelector = ({ roles, selectedRole, onRoleChange, fieldState, assistiveText }) => {
  const classes = {
    assistiveText: cn('mt-2 text-xs font-medium absolute -bottom-6', {
      'text-slate-600': fieldState === FormFieldState.default,
      'text-rose-500': fieldState === FormFieldState.error,
      'text-green-600': fieldState === FormFieldState.success
    })
  };
  return (
    <div className="relative">
      <div className="flex gap-4 flex-wrap justify-center">
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? Variant.primary : Variant.secondary}
            hasBorder
            className={'whitespace-nowrap'}
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
