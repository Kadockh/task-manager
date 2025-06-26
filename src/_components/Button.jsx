import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const Button = ({
  children,
  color = "primary",
  size = "sm",
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex items-center justify-center gap-2 rounded-md px-3 transition-opacity duration-200 hover:opacity-80`,
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
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:opacity-50",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  })

  return (
    <button className={button({ color, size, className, disabled: rest.disabled })} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "ghost", "secondary"]),
  size: PropTypes.oneOf(["sm", "md"]),
  className: PropTypes.string,
}

export default Button
