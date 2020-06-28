import { setStorageWithExpiry, getStorageWithExpiry } from './index';

describe("index utils", () => {
  it("setStorageWithExpiry should work correctly", () => {
    setStorageWithExpiry("test", 1);
    expect(localStorage.getItem("test")).toEqual("{\"value\":1,\"expiry\":null}")
  })
  it("getStorageWithExpiry should work correctly", () => {
    setStorageWithExpiry("test", 1);
    expect(getStorageWithExpiry("test")).toEqual(null)
  })

})
