import Int from "../atomic/Int";
import Symbol from "../atomic/Symbol";
import Division from "../binary/Division";
import Fraction from "../binary/Fraction";
import Power from "../binary/Power";
import Difference from "../n-ary/Difference";
import Product from "../n-ary/Product";
import Sum from "../n-ary/Sum";
import {
	isDifference,
	isDivision,
	isFraction,
	isInt,
	isPositiveFraction,
	isPositiveInt,
	isPower,
	isProduct,
	isRationalNumber,
	isSum,
	isSymbol,
} from "../types";

describe("isInt", () => {
	test("undefined --> false", () => {
		expect(isInt(undefined)).toBe(false);
	});
	test("int --> true", () => {
		expect(isInt(new Int(2))).toBe(true);
	});
	test("sum --> false", () => {
		expect(isInt(new Sum([new Int(2)]))).toBe(false);
	});
});
describe("isFraction", () => {
	test("undefined --> false", () => {
		expect(isFraction(undefined)).toBe(false);
	});
	test("fraction --> true", () => {
		expect(isFraction(new Fraction(new Int(2), new Int(5)))).toBe(true);
	});
	test("Power --> false", () => {
		expect(isFraction(new Power(new Int(2), new Int(2)))).toBe(false);
	});
});
describe("isSymbol", () => {
	test("undefined --> false", () => {
		expect(isSymbol(undefined)).toBe(false);
	});
	test("symbol --> true", () => {
		expect(isSymbol(new Symbol("x"))).toBe(true);
	});
	test("int --> false", () => {
		expect(isSymbol(new Int(2))).toBe(false);
	});
});
describe("isDifference", () => {
	test("undefined --> false", () => {
		expect(isSymbol(undefined)).toBe(false);
	});
	test("difference --> true", () => {
		expect(isDifference(new Difference([new Int(2)]))).toBe(true);
	});
	test("int --> false", () => {
		expect(isDifference(new Int(2))).toBe(false);
	});
});
describe("isDivision", () => {
	test("undefined --> false", () => {
		expect(isDivision(undefined)).toBe(false);
	});
	test("division --> true", () => {
		expect(isDivision(new Division(new Int(4), new Int(5)))).toBe(true);
	});
	test("int --> false", () => {
		expect(isDivision(new Int(3))).toBe(false);
	});
});
describe("isPower", () => {
	test("undefined --> false", () => {
		expect(isPower(undefined)).toBe(false);
	});
	test("power --> true", () => {
		expect(isPower(new Power(new Int(3), new Int(1)))).toBe(true);
	});
	test("int --> false", () => {
		expect(isPower(new Int(2))).toBe(false);
	});
});
describe("isProduct", () => {
	test("undefined --> false", () => {
		expect(isProduct(undefined)).toBe(false);
	});
	test("product --> true", () => {
		expect(isProduct(new Product([new Int(2)]))).toBe(true);
	});
	test("int --> false", () => {
		expect(isProduct(new Int(2))).toBe(false);
	});
});
describe("isSum", () => {
	test("undefined --> false", () => {
		expect(isSum(undefined)).toBe(false);
	});
	test("Sum --> true", () => {
		expect(isSum(new Sum([new Int(2)]))).toBe(true);
	});
	test("symbol --> false", () => {
		expect(isSum(new Symbol("x"))).toBe(false);
	});
});
describe("isRationalNumber", () => {
	test("undefined --> false", () => {
		expect(isRationalNumber(undefined)).toBe(false);
	});
	test("fraction --> true", () => {
		expect(isRationalNumber(new Fraction(new Int(2), new Int(3)))).toBe(
			true,
		);
	});
	test("int --> true", () => {
		expect(isRationalNumber(new Int(2))).toBe(true);
	});
	test("symbol --> false", () => {
		expect(isRationalNumber(new Symbol("x"))).toBe(false);
	});
});
describe("isPositiveInt", () => {
	test("undefined --> false", () => {
		expect(isPositiveInt(undefined)).toBe(false);
	});
	test("negative int --> false", () => {
		expect(isPositiveInt(new Int(-2))).toBe(false);
	});
	test("0 --> false", () => {
		expect(isPositiveInt(new Int(0))).toBe(false);
	});
	test("3 --> true", () => {
		expect(isPositiveInt(new Int(3))).toBe(true);
	});
});
describe("isPositiveFraction", () => {
	test("undefined --> false", () => {
		expect(isPositiveFraction(undefined)).toBe(false);
	});
	test("-2/3 --> false", () => {
		expect(isPositiveFraction(new Fraction(new Int(-2), new Int(3)))).toBe(
			false,
		);
	});
	test("2/-3 --> false", () => {
		expect(isPositiveFraction(new Fraction(new Int(2), new Int(-3)))).toBe(
			false,
		);
	});
	test("0/2 --> false", () => {
		expect(isPositiveFraction(new Fraction(new Int(0), new Int(2)))).toBe(
			false,
		);
	});
	test("3/4 --> true", () => {
		expect(isPositiveFraction(new Fraction(new Int(3), new Int(4)))).toBe(
			true,
		);
	});
});
