import { BehaviorSubject, Observable } from 'rxjs';

export class ImperativeObservable<T> {
  private _subject: BehaviorSubject<T>;
  private _change$: Observable<T>;

  constructor(initialValue: T) {
    this._subject = new BehaviorSubject<T>(initialValue);
    this._change$ = this._subject.asObservable();
  }

  get value(): T {
    return this._subject.value;
  }
  set value(value: T) {
    this._subject.next(value);
  }

  get change$() {
    return this._change$;
  }
}
