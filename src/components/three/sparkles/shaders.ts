export const SPARKLES_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  uniform float uMouseRadius;

  attribute float aSize;
  attribute float aPhase;

  varying float vAlpha;
  varying float vInfluence;

  void main() {
    vec3 pos = position;

    float angle = uTime * 0.16 + aPhase;
    pos += vec3(
      sin(angle) * 0.012,
      cos(angle * 0.7) * 0.012,
      sin(angle * 0.4) * 0.012
    );

    float dist = distance(pos, uMouse);
    float influence = smoothstep(uMouseRadius, 0.0, dist) * uMouseStrength;

    vec3 outward = normalize(pos);
    pos += outward * influence * 0.18;

    vInfluence = influence;
    vAlpha = 0.55 + influence * 0.45;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (78.0 / -mvPosition.z) * (1.0 + influence * 0.6);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const SPARKLES_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorHot;

  varying float vAlpha;
  varying float vInfluence;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;

    float alpha = (1.0 - d * 2.0) * vAlpha;
    vec3 color = mix(uColorBase, uColorHot, vInfluence);
    gl_FragColor = vec4(color, alpha);
  }
`;
