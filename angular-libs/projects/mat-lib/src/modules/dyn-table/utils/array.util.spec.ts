import { ArrayUtils } from './array.util';

describe('ArrayUtils', () => {
  it('should not find next in empty', () => {
    const inputArr: string[] = [];
    const foundIdx = ArrayUtils.findNextIndex(inputArr, () => true, -1);
    expect(foundIdx).toBe(-1);
  });

  it('should find next in one-length array', () => {
    const inputArr: number[] = [2];
    const foundIdx = ArrayUtils.findNextIndex(inputArr, (val) => val === 2, -1);
    expect(foundIdx).toBe(0);
  });

  it('should find next in multi-element array', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findNextIndex(inputArr, (val) => val === 2, 1);
    expect(foundIdx).toBe(3);
  });

  it('find next should return -1 when no more results', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findNextIndex(inputArr, (val) => val === 2, 3);
    expect(foundIdx).toBe(-1);
  });

  it('should find next by value in multi-element array', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findNextIndexByValue(inputArr, 2, 1);
    expect(foundIdx).toBe(3);
  });

  it('find next by value should return -1 when no more results', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findNextIndexByValue(inputArr, 2, 3);
    expect(foundIdx).toBe(-1);
  });

  it('should not find prev in empty', () => {
    const inputArr: string[] = [];
    const foundIdx = ArrayUtils.findPrevIndex(inputArr, () => true, -1);
    expect(foundIdx).toBe(-1);
  });

  it('should find prev in one-length array', () => {
    const inputArr: number[] = [2];
    const foundIdx = ArrayUtils.findPrevIndex(inputArr, (val) => val === 2, 1);
    expect(foundIdx).toBe(0);
  });

  it('should find prev in multi-element array', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findPrevIndex(inputArr, (val) => val === 2, 1);
    expect(foundIdx).toBe(0);
  });

  it('find prev should return -1 when no more results', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findPrevIndex(inputArr, (val) => val === 2, 0);
    expect(foundIdx).toBe(-1);
  });

  it('should find prev by value in multi-element array', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findPrevIndexByValue(inputArr, 2, 1);
    expect(foundIdx).toBe(0);
  });

  it('find prev by value should return -1 when no more results', () => {
    const inputArr: number[] = [2, 3, 4, 2, 6];
    const foundIdx = ArrayUtils.findPrevIndexByValue(inputArr, 2, 0);
    expect(foundIdx).toBe(-1);
  });
});
