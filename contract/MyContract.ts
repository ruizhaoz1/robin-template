import { Contract } from 'ultrain-ts-lib/src/contract';
import { Log } from 'ultrain-ts-lib/src/log';
import { EventObject, emit } from 'ultrain-ts-lib/src/events';
import { RNAME } from 'ultrain-ts-lib/src/account';
import { Return } from 'ultrain-ts-lib/src/return';

class MyContract extends Contract {

  @action
  hi(name: account_name, age: u32, msg: string): void {
    Log.s('hello, name = ').s(RNAME(name)).s(' age = ').i(age, 10).s(' msg = ').s(msg).flush();
    emit('onHi', EventObject.setString('name', RNAME(name)));
    Return<string>("call hi() succeed.");
  }
}
