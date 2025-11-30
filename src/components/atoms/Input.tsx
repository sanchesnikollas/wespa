'use client'

// ============================================
// WESPA Website - Input Components
// Cmp/Input, Cmp/Select, Cmp/Textarea
// ============================================

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// ============================================
// Base Input Styles
// ============================================
const baseInputStyles = cn(
  'w-full px-4 py-3',
  'bg-wire-white text-wire-900',
  'border border-wire-300 rounded-input',
  'placeholder:text-wire-400',
  'transition-all duration-200',
  'focus:outline-none focus:border-wire-500 focus:ring-1 focus:ring-wire-500',
  'disabled:bg-wire-100 disabled:cursor-not-allowed disabled:opacity-60'
)

const errorStyles = 'border-error focus:border-error focus:ring-error'
const successStyles = 'border-success focus:border-success focus:ring-success'

// ============================================
// Input Component
// ============================================
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      leftAddon,
      rightAddon,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name
    const hasLeftElement = leftAddon || leftIcon
    const hasRightElement = rightAddon || rightIcon

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-wire-700 mb-2"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {hasLeftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-wire-400">
              {leftIcon || leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseInputStyles,
              error && errorStyles,
              success && successStyles,
              hasLeftElement && 'pl-10',
              hasRightElement && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {hasRightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-400">
              {rightIcon || rightAddon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-caption text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-caption text-wire-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ============================================
// Textarea Component
// ============================================
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, helperText, id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-body-sm font-medium text-wire-700 mb-2"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            baseInputStyles,
            'min-h-[120px] resize-y',
            error && errorStyles,
            success && successStyles,
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-caption text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-caption text-wire-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// ============================================
// Select Component
// ============================================
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, success, helperText, options, placeholder, id, ...props },
    ref
  ) => {
    const selectId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-body-sm font-medium text-wire-700 mb-2"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              baseInputStyles,
              'appearance-none cursor-pointer pr-10',
              error && errorStyles,
              success && successStyles,
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-wire-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-caption text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-caption text-wire-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

// ============================================
// Checkbox Component
// ============================================
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || props.name

    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'mt-0.5 w-5 h-5 rounded border-wire-300',
              'text-wire-900 focus:ring-wire-500 focus:ring-2',
              'cursor-pointer',
              error && 'border-error',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
          <span className="text-body-sm text-wire-600 group-hover:text-wire-800">
            {label}
          </span>
        </label>
        {error && (
          <p
            id={`${checkboxId}-error`}
            className="mt-1.5 text-caption text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
