let canvas = $state(null);

export function getCanvas() {
	
	function updateCanvas(c) {
		canvas = c
	}

	return {
		get canvas() {
			return canvas;
		},
		updateCanvas,
	};
}