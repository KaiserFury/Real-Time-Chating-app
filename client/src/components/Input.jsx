function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2.5 text-sm font-medium text-fg-success-strong"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`bg-success-soft border border-success-subtle text-fg-success-strong text-sm rounded-base focus:ring-success focus:border-success block w-full px-3 py-2.5 shadow-xs placeholder:text-fg-success-strong ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-2.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;