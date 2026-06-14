// Lives outside the React component so the Math.random() calls don't trip
// React 19's purity-during-render lint.
export function generateSparkleAttributes(count: number, planetRadius: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  const innerR = planetRadius * 1.005;
  const outerR = planetRadius * 1.18;

  for (let i = 0; i < count; i++) {
    // Uniform sphere distribution via inverse-CDF sampling.
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2 * Math.PI;
    const phi = Math.acos(2 * v - 1);
    const r = innerR + Math.random() * (outerR - innerR);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    sizes[i] = 0.22 + Math.random() * 0.38;
    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, sizes, phases };
}
