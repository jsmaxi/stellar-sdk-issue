"use client";

import { signTransaction } from "@stellar/freighter-api";
import { Networks } from "@stellar/stellar-sdk";

export async function testSign(preparedTransaction: string): Promise<string> {
  try {
    if (!preparedTransaction) return preparedTransaction;
    console.log("[client] Signing transaction...");
    const signedTransaction = await signTransaction(preparedTransaction, {
      networkPassphrase: Networks.TESTNET,
    });
    console.log(signedTransaction);
    if (!signedTransaction || signedTransaction.error)
      throw signedTransaction?.error;
    return signedTransaction.signedTxXdr;
  } catch (e) {
    console.error("[client]", e);
    throw e;
  }
}
