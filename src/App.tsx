import { useState, useRef } from "react"
import "./App.css"

type CallbackFunction = (...args: any[]) => void

const debounce = (callback: CallbackFunction, delay: number) => {
	let timeoutId: number | undefined

	const debouncedFunction = (...args: any[]) => {
		// Clear the previous timeout if it exists
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId)
		}

		// Set a new timeout to call the function after the delay
		timeoutId = setTimeout(() => {
			callback(...args)
		}, delay)
	}

	return debouncedFunction
}

const App = () => {
	const [value, setValue] = useState("")
	const [finalValue, setFinalValue] = useState("")

	const debouncedSetFinalValue = useRef(debounce(setFinalValue, 2000)).current

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setValue(value)
		debouncedSetFinalValue(value)
	}

	const handleClearClick = () => {
		setValue("")
		setFinalValue("")
	}

	return (
		<div className='flexColumn'>
			<label htmlFor='value'>Type something</label>
			<input
				id='value'
				type='text'
				value={value}
				onChange={handleInputChange}
			/>
			<label htmlFor='debounced'>Debounced value</label>
			<input id='debounced' type='text' value={finalValue} readOnly />
			<button onClick={handleClearClick}>Clear</button>
		</div>
	)
}

export default App
