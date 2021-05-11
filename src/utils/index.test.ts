import { toDecimalOdds, toBackStack } from '@/utils';

describe('Utils Logic Tests', (): void => {
  it('Tests To Decimal Odds', (): void => {
    const reuslt = toDecimalOdds(5000);
    expect(reuslt).toEqual('2.00');
  });
  it('Tests To Back Stack', (): void => {
    const reuslt = toBackStack(100000, 5000);
    expect(reuslt).toEqual('5');
  });
});
