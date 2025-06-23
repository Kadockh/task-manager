import { tv } from "tailwind-variants"

const Button = ({
  children,
  color = "primary",
  size = "sm",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 transition-opacity duration-200 hover:opacity-80",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-gray",
      },
      size: {
        sm: "py-1 text-xs",
        md: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  })

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  )
}

export default Button
