import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, MutableRefObject, useRef, useState } from 'react';
import { cn, FormFieldState, Input } from '@common';

export interface TextareaProps extends Input, Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  /**
   * Specify an optional className to be added to the TextareaContainer
   */
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      isDisabled = false,
      isRequired = false,
      isReadOnly = false,
      fieldState = FormFieldState.default,
      label,
      assistiveText,
      className,
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
      container: cn('w-full', className),
      textareaContainer: cn('relative flex items-center overflow-hidden', 'w-full ', 'border p-2 rounded-md', {
        'border-pBorder': fieldState === FormFieldState.default && !isDisabled,
        'border-rose-600': fieldState === FormFieldState.error && !isDisabled,
        'border-green-500': fieldState === FormFieldState.success && !isDisabled,
        'border-neutral-400': fieldState === FormFieldState.default && isFocused,

        'bg-transparent border-transparent': isDisabled
      }),
      textarea: cn(
        'w-full min-h-[11rem]',
        'transition duration-100 ease-out outline-none bg-transparent',
        'placeholder:text-slate-500 text-base',
        'disabled:cursor-not-allowed disabled:placeholder:text-slate-500',
        'resize-y'
      ),
      assistiveText: cn('mt-2 text-xs font-medium', {
        'text-slate-200': fieldState === FormFieldState.default,
        'text-rose-400': fieldState === FormFieldState.error,
        'text-green-400': fieldState === FormFieldState.success
      })
    };

    const myRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
      if (onChange) onChange(event);
    };

    const handleInputBlur = (event: FocusEvent<HTMLTextAreaElement>): void => {
      setIsFocused(false);
      if (onBlur) onBlur(event);
    };

    const handleInputFocus = (event: FocusEvent<HTMLTextAreaElement>): void => {
      setIsFocused(true);
      if (onFocus) onFocus(event);
    };

    const handleRef = (node: HTMLTextAreaElement | null) => {
      myRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLTextAreaElement | null>).current = node;
    };

    return (
      <div className={classes.container}>
        {label && (
          <label className="mb-2 block text-sm font-semibold leading-4 text-slate-400" htmlFor={id}>
            {label}
            {isRequired && <span className="ml-1 text-rose-400">*</span>}
          </label>
        )}
        <div className={classes.textareaContainer}>
          <textarea
            id={id}
            ref={handleRef}
            name={name}
            className={classes.textarea}
            disabled={isDisabled}
            value={value}
            readOnly={isReadOnly}
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
