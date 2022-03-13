import { Box } from "@chakra-ui/react";

export default function TestConnector({
	nodeWidth,
	spacing,
	height,
	type,
}: {
	spacing: number;
	nodeWidth: number;
	type: number;
	height: number;
}) {
	const width = nodeWidth / 2 + spacing;
	const arcRad = height / 2;
	const lineWidth = width - arcRad;

	const strokeColor = "var(--chakra-colors-brand-500)";

	let svg = (
		<svg width={`${width}`} height={`${height}`}>
			<path d={`M 0,0 V ${height}`} />
		</svg>
	);

	if (type < 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<path
					d={`M 0, ${height} A ${arcRad} ${arcRad} 0 0 1  ${arcRad}, ${arcRad} H ${lineWidth} A ${arcRad} ${arcRad} 0 0 0 ${width}, 0`}
				/>
			</svg>
		);
	}

	if (type > 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<path
					d={`M 0, 0 A ${arcRad},${arcRad} 0 0 0 ${arcRad},${arcRad} H ${lineWidth} A ${arcRad},${arcRad} 0 0 1 ${width},${height}`}
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
			<style global jsx>
				{`
					path {
						stroke-dasharray: 450;
						stroke-dashoffset: 450;
						animation: draw 2s linear forwards;
						stroke-width: 2;
						fill: none;
						stroke: ${strokeColor};
					}

					@keyframes draw {
						to {
							stroke-dashoffset: 0;
						}
					}
				`}
			</style>
			{svg}
		</Box>
	);
}
