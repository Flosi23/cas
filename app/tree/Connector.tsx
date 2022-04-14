import { Box, useColorModeValue } from "@chakra-ui/react";

function Path({
	d,
	depth,
	width,
	arcRad,
	nodeAnimDuration,
	pathAnimDuration,
}: {
	d: string;
	depth: number;
	width: number;
	arcRad: number;
	nodeAnimDuration: number;
	pathAnimDuration: number;
}) {
	const strokeColor = useColorModeValue("brand-500", "brand-300");

	return (
		<>
			<path
				strokeDashoffset={width + 2 * arcRad}
				strokeWidth={2}
				fill="none"
				stroke={`var(--chakra-colors-${strokeColor})`}
				strokeDasharray={width + 2 * arcRad}
				d={d}
			/>
			<style jsx>
				{`
					path {
						animation: drawPath ${pathAnimDuration}s linear forwards;
						animation-delay: ${depth *
							(nodeAnimDuration + pathAnimDuration) +
						nodeAnimDuration}s;
					}

					@keyframes drawPath {
						to {
							stroke-dashoffset: 0;
						}
					}
				`}
			</style>
		</>
	);
}

export default function TestConnector({
	left,
	top,
	width,
	height,
	depth,
	type,
	nodeAnimDuration,
	pathAnimDuration,
}: {
	top: number;
	left: number;
	width: number;
	depth: number;
	type: number;
	height: number;
	nodeAnimDuration: number;
	pathAnimDuration: number;
}) {
	const arcRad = height / 2;
	const lineWidth = width - 2 * arcRad;

	let svg = (
		<svg width={`${width}`} height={`${height}`}>
			<Path
				arcRad={arcRad}
				width={width}
				pathAnimDuration={pathAnimDuration}
				nodeAnimDuration={nodeAnimDuration}
				depth={depth}
				d={`M 0,0 V ${height}`}
			/>
		</svg>
	);

	if (type < 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<Path
					arcRad={arcRad}
					width={width}
					pathAnimDuration={pathAnimDuration}
					nodeAnimDuration={nodeAnimDuration}
					depth={depth}
					d={`M ${width} 0 A ${arcRad} ${arcRad} 0 0 1 ${
						width - arcRad
					} ${arcRad} h -${lineWidth} a ${arcRad} ${arcRad} 0 0 0 0, ${height}`}
				/>
			</svg>
		);
	}

	if (type > 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<Path
					arcRad={arcRad}
					width={width}
					pathAnimDuration={pathAnimDuration}
					nodeAnimDuration={nodeAnimDuration}
					depth={depth}
					d={`M 0, 0 A ${arcRad},${arcRad} 0 0 0 ${arcRad},${arcRad} h ${lineWidth} A ${arcRad},${arcRad} 0 0 1 ${width},${height}`}
				/>
			</svg>
		);
	}

	return (
		<Box
			top={`${top}px`}
			position="absolute"
			width="max-content"
			left={`${left}px`}>
			{svg}
		</Box>
	);
}
