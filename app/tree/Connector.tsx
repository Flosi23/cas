import { Box } from "@chakra-ui/react";

export default function Connector({
	width,
	height,
	type,
}: {
	width: number;
	type: number;
	height: number;
}) {
	const arcRad = height / 2;
	const lineWidth = width - arcRad;

	const strokeColor = "var(--chakra-colors-brand-500)";

	let svg = (
		<svg width={`${width}`} height={`${height}`}>
			<path
				d={`M 0,0 V ${height}`}
				fill="none"
				stroke={strokeColor}
				strokeWidth="2"
			/>
		</svg>
	);

	if (type < 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<path
					d={`M 0, ${height} A ${arcRad} ${arcRad} 0 0 1  ${arcRad}, ${arcRad}`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
				<path
					d={`M ${width}, 0 A ${arcRad} ${arcRad} 0 0 1  ${
						width - arcRad
					}, ${arcRad}`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
				<path
					d={`M ${arcRad}, ${height / 2} H ${lineWidth}`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
			</svg>
		);
	}

	if (type > 0) {
		svg = (
			<svg width={`${width}`} height={`${height}`}>
				<path
					d={`M ${arcRad}, ${height / 2} H ${lineWidth}`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
				<path
					d={`M ${arcRad}, ${arcRad} A ${arcRad},${arcRad} 0 0 1 0,0`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
				<path
					d={`M ${
						width - arcRad
					},${arcRad} A ${arcRad},${arcRad} 0 0 1 ${width},${
						arcRad * 2
					}`}
					fill="none"
					stroke={strokeColor}
					strokeWidth="2"
				/>
			</svg>
		);
	}

	return (
		<Box
			width="max-content"
			marginLeft={type < 0 ? "auto" : "initial"}
			marginRight={type > 0 ? "auto" : "initial"}>
			{svg}
		</Box>
	);
}
