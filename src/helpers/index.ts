import CryptoJS from "crypto-js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import pkg from "mongoose";
import { addMinutes } from "@src/helpers/date";
const { Types } = pkg;

// cryptr encrypt
export function encrypt(data) {
  data = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(data, process.env.CRYPTR_CODE);
  return encrypted.toString();
}

//cryptr encrypt
export function decrypt(data) {
  const decryptedData = CryptoJS.AES.decrypt(data, process.env.CRYPTR_CODE);
  let res = "";
  try {
    res = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    res = decryptedData.toString(CryptoJS.enc.Utf8);
  }

  return res;
}

//hash
export async function hash(param) {
  return await bcrypt.hash(param, 12);
}

export function cryptoHash(data, secret_key) {
  return crypto
    .createHmac("sha512", secret_key)
    .update(JSON.stringify(data))
    .digest("hex");
}

//verify hash
export async function verifyHash(hashedPram, param) {
  return await bcrypt.compare(param, hashedPram);
}

export const generateToken = async (length = 6, minutes = 5) => {
  if (length <= 0) {
    length = 6;
  }

  if (minutes <= 0) {
    minutes = 5;
  }

  let token = Math.floor(
    10 ** (length - 1) + Math.random() * (10 ** (length - 1) * 9)
  );
  const hashToken = await hash(token.toString());
  const tokenExpiry = addMinutes(new Date(), minutes);

  return {
    token,
    hashToken,
    tokenExpiry,
  };
};

export const convertToObjectId = (id: string) => {
  try {
    // @ts-ignore
    // todo: fix this
    return new Types.ObjectId(id);
  } catch (error) {
    return id;
  }
};

export const nilObjectId = () => {
  // @ts-ignore
  // todo: fix this
  return new Types.ObjectId("000000000000000000000000");
};

export const processData = (data, fields) => {};

export const generateUniqueString = (prefix = "") => {
  const timestamp = Date.now().toString(36); // convert current timestamp to base-36 string
  const random = Math.random().toString(36).slice(2); // generate random number and convert to base-36 string
  if (prefix) {
    return `${prefix}|${timestamp}${random}`; // concatenate timestamp and random number with a hyphen separator
  }
  return `${timestamp}${random}`; // concatenate timestamp and random number with a hyphen separator
};

export const deleteFields = (data, fields) => {
  fields.forEach((field) => {
    Reflect.deleteProperty(data, field);
  });
};

export const makeQuery = (query) => {
  let response = "";
  const entries = Object.entries(query);

  entries.map((arr) => {
    response += `${arr[0]}=${arr[1]}&`;
  });

  if (response.length === 0) {
    return response;
  }

  return response.slice(0, response.length - 1);
};
