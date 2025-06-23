import InputLabel from "./InputLabel"

const TimeSelect = ({ ...props }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00aDB5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.errorMessage && (
        <p className="text-sm text-red-500">{props.errorMessage}</p>
      )}
    </div>
  )
}

export default TimeSelect
