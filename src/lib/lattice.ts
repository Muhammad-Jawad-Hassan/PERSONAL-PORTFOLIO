const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "#EC4899",
  backend: "#00E5FF",
  data: "#5BFAFF",
  "cloud-devops": "#A78BFA",
  tooling: "#34D399",
};

export function categoryColor(id: string): string {
  return CATEGORY_COLORS[id] ?? "#00E5FF";
}
