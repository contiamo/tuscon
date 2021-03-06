import { Decoder, success, error } from "./types";

/**
 * Create a decoder that always succeeds with a given constant value.
 * See ./examples/flatMap.ts to see why this is useful.
 */
export const succeed = <T>(value: T): Decoder<T> => _ => success(value);

/**
 * Create a decoder that always fails with a given error (this is optional).
 * See ./examples/flatMap.ts to see why this is useful.
 */
export const fail = <T>(errorMsg: string = "Failure"): Decoder<T> => val =>
  error([
    {
      path: [],
      received: val,
      error: errorMsg,
    },
  ]);

/**
 * Create a decoder that always succeeds with value it decodes, leaving it as an `any` type.
 */
export const any: Decoder<any> = val => ({
  type: "success",
  value: val,
});

/**
 * Decodes a type literal (constant value)
 */
export const literal = <T extends string | boolean | number>(literal: T): Decoder<T> => val =>
  val === literal
    ? success(literal)
    : error([
        {
          path: [],
          error: `expected literal ${JSON.stringify(literal)}`,
          received: val,
        },
      ]);
/**
 * Decode a string
 */
export const string: Decoder<string> = val =>
  typeof val === "string"
    ? success(val)
    : error([
        {
          path: [],
          error: "expected string",
          received: val,
        },
      ]);

/**
 * Decode a number.
 * This library doesn't distinguish between integers and floats as primitives,
 * since these types do not exist on TypeScript. Use `flatMap` to add additional
 * validations for floating point numbers.
 */
export const number: Decoder<number> = val =>
  typeof val === "number"
    ? success(val)
    : error([
        {
          path: [],
          error: "expected number",
          received: val,
        },
      ]);

/**
 * Decode a boolean
 */
export const boolean: Decoder<boolean> = val =>
  typeof val === "boolean"
    ? success(val)
    : error([
        {
          path: [],
          error: "expected boolean",
          received: val,
        },
      ]);

/**
 * Decode a null value. This is named `nullDecoder` instead of `null` to not override the global value.
 * Recommended usage outside the library would be `tucson.null`.
 */
export const nullDecoder: Decoder<null> = val =>
  val === null
    ? success(val)
    : error([
        {
          path: [],
          error: "expected null",
          received: val,
        },
      ]);

/**
 * Decode an undefined value. This is named `undefinedDecoder` instead of `null` to not override the global value.
 * Recommended usage outside the library would be `tucson.undefined`.
 */
export const undefinedDecoder: Decoder<undefined> = val =>
  typeof val === "undefined"
    ? success(val)
    : error([
        {
          path: [],
          error: "expected undefined",
          received: val,
        },
      ]);
