export function middleware<T>(value: T): T {
  return value;
}

export interface Color<T, TNew> extends NewColor<TNew> {
  original: T;
  opacity: boolean;
}

export interface ColorItem {
  title: string;
  id: number;
}

export interface NewColor<T> {
  info: T;
}

export interface Shape {
  width: number;
  height: number;
}

export class DrawShape implements Shape {
  width: number;

  height: number;

  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  get area() {
    return this.width * this.height;
  }
}

const draw = new DrawShape(100, 10);
