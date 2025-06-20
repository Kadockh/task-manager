const Button = ({
  children,
  variant = "primary",
  size = "sm",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00adb5] text-white"
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
    }
    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]"
    }
  }

  const getSizeClasses = () => {
    if (size === "sm") {
      return "py-1 text-xs"
    }
    if (size === "md") {
      return "py-2 text-sm"
    }
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 transition-opacity duration-200 hover:opacity-80 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
