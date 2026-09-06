function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white bg-gradient-to-br from-pink-500 to-orange-400
        font-medium rounded-lg text-sm px-4 py-2.5
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;