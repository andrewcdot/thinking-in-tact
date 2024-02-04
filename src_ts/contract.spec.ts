import { describe } from "node:test";
import { ContractSystem } from "@tact-lang/emulator";
import { SendMsgContract } from "../src_tact/tact_guides/artifact/TypeSystem_SendMsgContract";
import { toNano } from "@ton/ton";

describe("c", () => {
    it("should deploy correctly", async () => {
        // Init test
        const system = await ContractSystem.create();
        const treasure = system.treasure("my treasure");
        let openedSendMsgContract = system.open(await SendMsgContract.fromInit(treasure.address));
        const tracker = system.track(openedSendMsgContract.address);

        // Send a message
        await openedSendMsgContract.send(treasure, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();

        // Testing output
        expect(tracker.collect()).toMatchInlineSnapshot(`[{
    "$seq": 0,
    "events": [
      {
        "$type": "deploy",
      },
      {
        "$type": "received",
        "message": {
          "body": {
            "type": "known",
            "value": {
              "$$type": "Deploy",
              "queryId": 0n,
            },
          },
          "bounce": true,
          "from": "@treasure(my treasure)",
          "to": "kQAwuijrjIZpaDdfTLD603vzVRglMoo7LLesA2LU-HKW2gAj",
          "type": "internal",
          "value": "1",
        },
      },
      {
        "$type": "processed",
        "gasUsed": 7847n,
      },
      {
        "$type": "sent",
        "messages": [
          {
            "body": {
              "type": "known",
              "value": {
                "$$type": "DeployOk",
                "queryId": 0n,
              },
            },
            "bounce": false,
            "from": "kQAwuijrjIZpaDdfTLD603vzVRglMoo7LLesA2LU-HKW2gAj",
            "to": "@treasure(my treasure)",
            "type": "internal",
            "value": "0.990957",
          },
        ],
      },
    ],
  },
]`);
    });
});
