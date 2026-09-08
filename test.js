/**
 * @fileoverview Automated Unit Test Suite for Country & Capital Application.
 * Executable directly via `node test.js`.
 */

"use strict";

const assert = require("assert");
const { COUNTRY_CAPITAL_MAP, CountryCapitalService } = require("./script.js");

console.log("==================================================");
console.log("🚀 Running Country & Capital Test Suite");
console.log("==================================================\n");

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passedTests++;
  } catch (error) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    Error: ${error.message}\n`);
  }
}

// 1. Data Store Immutability
test("COUNTRY_CAPITAL_MAP is frozen (immutable)", () => {
  assert.strictEqual(Object.isFrozen(COUNTRY_CAPITAL_MAP), true, "Data store must be frozen via Object.freeze()");
  assert.throws(
    () => {
      // In strict mode, mutating a frozen object throws a TypeError
      COUNTRY_CAPITAL_MAP.Nepal = "Pokhara";
    },
    TypeError,
    "Attempting to mutate COUNTRY_CAPITAL_MAP must throw TypeError"
  );
});

// 2. Verified Country-Capital Lookups
const expectedPairs = [
  { country: "Nepal", capital: "Kathmandu" },
  { country: "India", capital: "New Delhi" },
  { country: "Japan", capital: "Tokyo" },
  { country: "France", capital: "Paris" },
  { country: "Australia", capital: "Canberra" }
];

expectedPairs.forEach(({ country, capital }) => {
  test(`CountryCapitalService.getCapital('${country}') returns '${capital}'`, () => {
    const result = CountryCapitalService.getCapital(country);
    assert.strictEqual(result, capital, `Expected '${capital}', received '${result}'`);
  });
});

// 3. Edge Cases & Defensive Validation
test("Empty string returns empty string (Default 'Select a Country')", () => {
  const result = CountryCapitalService.getCapital("");
  assert.strictEqual(result, "", "Default option must return empty string");
});

test("Non-existent country returns empty string", () => {
  const result = CountryCapitalService.getCapital("Atlantis");
  assert.strictEqual(result, "", "Unknown country must return empty string");
});

test("Handles whitespace padding gracefully", () => {
  const result = CountryCapitalService.getCapital("  Japan  ");
  assert.strictEqual(result, "Tokyo", "Service should trim surrounding whitespace");
});

test("Non-string parameter returns empty string safely without throwing", () => {
  assert.strictEqual(CountryCapitalService.getCapital(null), "");
  assert.strictEqual(CountryCapitalService.getCapital(undefined), "");
  assert.strictEqual(CountryCapitalService.getCapital(12345), "");
});

// 4. Helper Methods
test("CountryCapitalService.hasCountry correctly identifies members", () => {
  assert.strictEqual(CountryCapitalService.hasCountry("Nepal"), true);
  assert.strictEqual(CountryCapitalService.hasCountry("Canada"), false);
  assert.strictEqual(CountryCapitalService.hasCountry(""), false);
});

test("CountryCapitalService.getSupportedCountries returns exactly the 5 target countries", () => {
  const list = CountryCapitalService.getSupportedCountries();
  assert.strictEqual(list.length, 5);
  assert.deepStrictEqual(list, ["Nepal", "India", "Japan", "France", "Australia"]);
});

console.log("\n--------------------------------------------------");
console.log(`Results: ${passedTests}/${totalTests} tests passed.`);
console.log("--------------------------------------------------\n");

if (passedTests !== totalTests) {
  process.exit(1);
}
