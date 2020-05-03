export class Tuple<T,U> {
  private _left: T;
  private _right: U;

  constructor(left: T, right: U) {
    this._left = left;
    this._right = right;
  }

  public get left(): T {
    return this._left;
  }

  public set left(value: T) {
    this._left = value;
  }

  public get right(): U {
    return this._right;
  }

  public set right(value: U) {
    this._right = value;
  }

  public mapLeft<V>(map: (left: T) => V): Tuple<V,U> {
    return new Tuple<V,U>(map(this._left), this._right);
  }

  public mapRight<W>(map: (right: U) => W): Tuple<T,W> {
    return new Tuple<T,W>(this._left, map(this._right));
  }

  public map<V,W>(map: (left: T, right: U) => { left: V, right: W }): Tuple<V,W> {
    const { left, right } = map(this._left, this._right);
    return new Tuple<V,W>(left, right);
  }

}
