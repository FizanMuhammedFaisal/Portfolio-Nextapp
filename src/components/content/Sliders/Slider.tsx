interface SliderProps {
  htmlFor: string
  label: string
  id: string
  min?: number
  max?: number
  step?: number
  value: number
  activeColor?: string
  nonActiveColor?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Slider = ({
  htmlFor,
  label,
  id,
  min = 0,
  max = 1,
  step = 0.01,
  value,
  onChange,
  activeColor = '#FAD658',
  nonActiveColor = '#4B5563',
}: SliderProps) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {label}
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-yellow-400 h-2 rounded-full outline-none opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100"
        style={{
          background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${
            ((value - min) / (max - min)) * 100
          }%, ${nonActiveColor} ${((value - min) / (max - min)) * 100}%,${nonActiveColor} 100%)`,
        }}
      />
    </div>
  )
}

export default Slider
