import { SignJWT, jwtVerify } from "jose";
let SecretKey = "dmcbvchvcmvcbgghgjhsmgdgkfsdgfsvbchv";
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(SecretKey);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SecretKey);
    return payload;
  } catch (error) {
    return null;
  }
}
