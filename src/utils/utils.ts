import crypto from "crypto";
import { userRepo } from "../repository/userRepository";
import { logger } from "./logger";

/**
 * Generate a short human-friendly referral code.
 * Excludes ambiguous characters.
 */
function generateReferralCode(length = 8): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // exclude I, L, O, 0, 1
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    const b = bytes[i]!;
    out += chars[b % chars.length];
  }
  return out;
}

/**
 * Try to generate a unique referral code (checks DB). Throws after max attempts.
 */
export async function generateUniqueReferralCode(
  maxAttempts = 5,
  length = 8
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // increase entropy after a few attempts
    const currentLength = length + Math.floor(attempt / 2);
    const code = generateReferralCode(currentLength);
    try {
      const exists = await userRepo.findByReferralCode(code);
      if (!exists) return code;
    } catch (dbErr) {
      // Log DB errors but continue trying; we don't want to leak to user
      logger.warn(
        { dbErr, attempt },
        "DB check for referral code failed; retrying"
      );
    }
  }

  const fallback = `RC-${Date.now().toString(36)}-${crypto
    .randomBytes(8)
    .toString("hex")}`;

  logger.error(
    { maxAttempts, requestedLength: length, fallback },
    "Referral code generation exhausted attempts — returning fallback code"
  );

  return fallback;
}
