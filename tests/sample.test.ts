import { expect } from 'chai';
import sinon from 'sinon';

describe('Sample Test', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  });
  
  it('should call function once', () => {
    const spy = sinon.spy();
    spy();
    expect(spy.calledOnce).to.be.true;
  });
});
