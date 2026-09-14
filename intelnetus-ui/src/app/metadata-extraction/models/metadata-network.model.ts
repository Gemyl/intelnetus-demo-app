export interface Node {
  id: string;
  label?: string;
  size?: number;
  color?: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  weight?: number;
}
