import {useState, useEffect} from 'react'

export function useAnimatedCounter(end, duration = 1000, start = 0) {
	const [count, setCount] = useState(start)

	useEffect(() => {
		let startTime
		const animateCount = (timestamp) => {
			if (!startTime) startTime = timestamp
			const progress = timestamp - startTime
			const increment = Math.min(progress / duration, 1)
			setCount(Math.floor(start + (end - start) * increment))

			if (progress < duration) {
				requestAnimationFrame(animateCount)
			}
		}

		requestAnimationFrame(animateCount)
	}, [end, duration, start])

	return count
}
