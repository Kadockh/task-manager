import PropTypes from "prop-types"

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-brand-border pb-1">
      {icon}
      <p className="text-sm text-brand-text-gray">{title}</p>
    </div>
  )
}

TaskSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default TaskSeparator
