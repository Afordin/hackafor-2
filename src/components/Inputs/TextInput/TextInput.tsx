import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useState } from 'react';
import { cn, FormFieldState, Input } from '@common';

export interface TextInputProps extends Input, Omit<InputHTMLAttributes<HTMLInputElement>, 'required'> {
  /**
   * Specify an optional className to be added to the InputContainer
   */
  inputContainerClassName?: string;

  /**
   * The callback to get notified when the end icon was clicked.
   */
  onEndIconClick?: () => void;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      isDisabled = false,
      isFullWidth = false,
      isReadOnly = false,
      isRequired = false,
      fieldState = FormFieldState.default,
      label,
      assistiveText,
      autoComplete = 'off',
      className,
      inputContainerClassName,
      value = '',
      name,
      onChange,
      onBlur,
      onFocus,
      ...restOfProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const classes = {
      container: cn({ 'w-full': isFullWidth }, className),
      inputContainer: cn(
        'relative flex items-center overflow-hidden',
        'group',
        'border-1',
        'h-10',
        'transition-colors duration-300',
        'rounded-lg px-4 py-8',
        {
          'w-full': isFullWidth,
          ['bg-pBorder/50 border-transparent']: isDisabled,
          'border-pBorder': fieldState === FormFieldState.default,
          'border-rose-600': fieldState === FormFieldState.error && !isDisabled,
          'border-green-500': fieldState === FormFieldState.success && !isDisabled,
          'border-neutral-400': fieldState === FormFieldState.default && isFocused
        },
        inputContainerClassName
      ),
      input: cn(
        'w-full',
        'outline-none bg-transparent',
        'placeholder:text-slate-500',
        'text-2xl border-pBorder',
        'disabled:cursor-not-allowed disabled:placeholder:text-slate-600'
      ),
      assistiveText: cn('mt-2 text-xs font-medium', {
        'text-slate-600': fieldState === FormFieldState.default,
        'text-rose-500': fieldState === FormFieldState.error,
        'text-green-600': fieldState === FormFieldState.success
      })
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (onChange) onChange(event);
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
      setIsFocused(false);
      if (onBlur) onBlur(event);
    };

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>): void => {
      setIsFocused(true);
      if (onFocus) onFocus(event);
    };

    return (
      <div className={classes.container}>
        {label && (
          <label className="mb-2 block text-xl font-semibold leading-4 text-slate-100" htmlFor={id}>
            {label}
            {isRequired && <span className="ml-1 text-rose-500">*</span>}
          </label>
        )}
        <div className={classes.inputContainer}>
          <input
            id={id}
            ref={ref}
            name={name}
            className={classes.input}
            disabled={isDisabled}
            value={value}
            readOnly={isReadOnly}
            required={isRequired}
            autoComplete={autoComplete}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            {...restOfProps}
          />
        </div>
        {assistiveText && <span className={classes.assistiveText}>{assistiveText}</span>}
      </div>
    );
  }
);
