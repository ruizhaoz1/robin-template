const U3Utils = require('u3-utils/dist/es5');
const { createU3, format } = require('u3.js/src');
const config = require('../config');

const chai = require('chai');
require('chai')
  .use(require('chai-as-promised'))
  .should();

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

describe('Contract\'s test cases', function() {

  it('case1', async () => {

    let account = "ben";
    const u3 = createU3(config);
    const contract = await u3.contract(account);
    const tx = contract.hi('ben',30,'It is a test', { authorization: [`ben@active`] });


    let tx_trace = await u3.getTxByTxId(tx.transaction_id);
    while (!tx_trace.irreversible) {
      await U3Utils.wait(1000);
      tx_trace = await u3.getTxByTxId(tx.transaction_id);
      if (tx_trace.irreversible) {
        console.log(tx);
        break;
      }
    }

  });
});
