export function transformCoordinates(coords: number[][][], x0 = 0, y0 = 0, theta: number, sx: number, sy: number) {
	const transformedCoords = []
	for (let i = 0; i < coords.length; i++) {
		const ring = coords[i]
		const transformedRing = []
		for (let j = 0; j < ring.length; j++) {
			const point = ring[j]
			const x = point[0]
			const y = point[1]
			const x1 = (x - x0) * Math.cos(theta) - (y - y0) * Math.sin(theta) + x0
			const y1 = (x - x0) * Math.sin(theta) + (y - y0) * Math.cos(theta) + y0
			const x2 = x1 * sx
			const y2 = y1 * sy
			transformedRing.push([x2, y2])
		}
		transformedCoords.push(transformedRing)
	}
	return transformedCoords
}
