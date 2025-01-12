import './ShinyText.scss'
interface ShinyText {
  text: string
  disabled?: Boolean
  speed?: Number
  className?: string
}
const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}: ShinyText) => {
  const animationDuration = `${speed}s`

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </span>
  )
}
export default ShinyText
