import { Accounts } from '../../publicapiv2/accounts';
import * as sinon from 'sinon';
import { expect } from 'chai';
import {apiBasicChecker} from './testutils'
describe('Accounts', () => {

  it('.open should propagate given params', () => {
    const spy = sinon.spy();
    new Accounts(spy).open('secret');
    apiBasicChecker(spy, '/accounts/open/', undefined);
    expect(spy.firstCall.args[0].method).is.eq('POST');
    expect(spy.firstCall.args[0].body).is.not.undefined;
    expect(spy.firstCall.args[0].body).is.deep.eq({secret: 'secret'});
  });

  it('.getBalance should propagate given params and construct url correcly', () => {
    const spy = sinon.spy();
    new Accounts(spy).getBalance('address');
    apiBasicChecker(spy, '/accounts/getBalance?address=address', undefined);
  });

  it('.getPublicKey should propagate given params and construct url correcly', () => {
    const spy = sinon.spy();
    new Accounts(spy).getPublicKey('address');
    apiBasicChecker(spy, '/accounts/getPublicKey?address=address', undefined);
  });

  it('.generatePublicKey should propagate given params in POST', () => {
    const spy = sinon.spy();
    new Accounts(spy).generatePublicKey('secret');
    apiBasicChecker(spy, '/accounts/generatePublicKey', undefined);
    expect(spy.firstCall.args[0].method).is.eq('POST');
    expect(spy.firstCall.args[0].body).is.not.undefined;
    expect(spy.firstCall.args[0].body).is.deep.eq({secret: 'secret'});
  });

  it('.getAccount should propagate given params and construct url correctly', () => {
    const spy = sinon.spy();
    new Accounts(spy).getAccount('address');
    apiBasicChecker(spy, '/accounts?address=address', undefined);
  });

  it('.getDelegates should propagate given params and construct url correctly', () => {
    const spy = sinon.spy();
    new Accounts(spy).getDelegates('address');
    apiBasicChecker(spy, '/accounts/delegates?address=address', undefined);
  });

  it('.putDelegates should propagate given params in PUT method', () => {
    const spy = sinon.spy();
    const body = {
      secret: 'theSecret',
      publicKey: 'public',
      delegates: ['+DELEGATE1', '-DELEGATE2']
    };
    new Accounts(spy).putDelegates(body);
    apiBasicChecker(spy, '/accounts/delegates', undefined);
    expect(spy.firstCall.args[0].method).is.eq('PUT');
    expect(spy.firstCall.args[0].body).is.deep.eq(body);
  });
});