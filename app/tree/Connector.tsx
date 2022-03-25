import { Box } from "@chakra-ui/react";

function Path({
	d,
	depth,
	nodeAnimDuration,
	pathAnimDuration,
}: {
	d: string;
	depth: number;
	nodeAnimDuration: number;
	pathAnimDuration: number;
}) {
	return (
		<>
			<path
				strokeDashoffset="100"
				strokeWidth={2}
				fill="none"
				stroke="var(--chakra-colors-brand-500)"
				strokeDasharray="100"
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
	nodeWidth,
	spacing,
	height,
	depth,
	type,
	nodeAnimDuration,
	pathAnimDuration,
}: {
	spacing: number;
	nodeWidth: number;
	depth: number;
	type: number;
	height: number;
	nodeAnimDuration: number;
	pathAnimDuration: number;
}) {
	const width = nodeWidth / 2 + spacing;
	const arcRad = height / 2;
	const lineWidth = width - 2 * arcRad;

	let svg = (
		<svg width={`${width}`} height={`${height}`}>
			<Path
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
			position="absolute"
			width="max-content"
			left={type < 0 ? `-${spacing}px` : "50%"}
			marginLeft={type < 0 ? "auto" : "initial"}
			marginRight={type > 0 ? "auto" : "initial"}>
			{svg}
		</Box>
	);
}
