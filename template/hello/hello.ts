
import "allocator/arena";

import { ultrain_assert } from "ultrain-ts-lib/src/utils";
import { Log } from "ultrain-ts-lib/src/log";
import { Contract } from "ultrain-ts-lib/src/contract";
import { Action, ACTION } from "ultrain-ts-lib/src/action";
import { Return } from "ultrain-ts-lib/src/return";
import { ACCOUNT, Account, NAME, RNAME } from "ultrain-ts-lib/src/account";

 export function apply(receiver: u64, code: u64, action1: u64, action2: u64): void {
    Log.s("receiver: ").s(RNAME(receiver)).s(" code: ").s(RNAME(code)).flush();
    let sender: u64 = Action.sender;
    Log.s("current sender = ").s(RNAME(sender)).flush();
    let action = new Action(action1, action2);

    var gol: HelloContract = new HelloContract(receiver);
    gol.apply(code, action);
}


class HelloContract extends Contract {

    dummy: u64;

    on_hi(name: u64): void {
        Log.s("on_hi: name = ").s(RNAME(name)).flush();
        // Return(10086);
        let tester = new Account(NAME("tester"));
        let ass = tester.balance;
        ass.prints("AAA: ");

        Return("call hi() succeed.");
    }

    on_empty_hi(): void {
        Log.s("this is a empyt hi function.").flush();
    }

    apply(code: u64, action: Action): void {
        Log.s("entry").flush();
        if (action == ACTION("hi_it_is_a_long_func")) {
            let ds   = this.getDataStream();
            let name = ds.read<u64>();

            Log.s("aaaaa  ").s(RNAME(name)).flush();
            // let age = ds.read<u32>();
            // let msg = ds.readString();

            // let amount = ds.read<u64>();
            // let symbol = ds.read<u64>();

            // Log.s("amount = ").i(amount, 10).s(" symbol = ").i(symbol, 16).flush();
            this.on_hi(name);
        } else if (action ==  ACTION("hi_empty")) {
            this.on_empty_hi();
        } else {
            ultrain_assert(false, "unknown action");
        }
    }

}