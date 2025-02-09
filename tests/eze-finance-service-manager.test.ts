import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { Debug } from "../generated/schema"
import { Debug as DebugEvent } from "../generated/EzeFinanceServiceManager/EzeFinanceServiceManager"
import { handleDebug } from "../src/eze-finance-service-manager"
import { createDebugEvent } from "./eze-finance-service-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let storedHash = Bytes.fromI32(1234567890)
    let suppliedHash = Bytes.fromI32(1234567890)
    let newDebugEvent = createDebugEvent(storedHash, suppliedHash)
    handleDebug(newDebugEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Debug created and stored", () => {
    assert.entityCount("Debug", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Debug",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "storedHash",
      "1234567890"
    )
    assert.fieldEquals(
      "Debug",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "suppliedHash",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
