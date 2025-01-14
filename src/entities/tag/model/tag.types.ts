export enum TagColor {
  ACCENT = 'ACCENT',
  ORANGE = 'ORANGE',
  RED = 'RED',
  PINK = 'PINK',
  BLUE = 'BLUE',
  SKY_BLUE = 'SKY_BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
}

export interface Tag {
  id: string;
  title: string;
  color: TagColor;
}
