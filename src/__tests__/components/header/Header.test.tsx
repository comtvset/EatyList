import { xdescribe, expect, it } from '@jest/globals';

xdescribe('Skip test', () => {
  it('should skip this test', () => {
    expect(true).toBe(false);
  });
});
