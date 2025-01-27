"use server";

import {
  BASE_FEE,
  Contract,
  Keypair,
  Networks,
  Transaction,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import { Server } from "@stellar/stellar-sdk/rpc";

export async function testPrepare(): Promise<string> {
  try {
    console.log("[server] Prepare transaction");

    const publicKey = "..."; // paste your public key
    const server = new Server("https://soroban-testnet.stellar.org:443"); // testnet
    const account = await server.getAccount(publicKey);
    const TIMEOUT_SEC = 30;

    const contract = new Contract("..."); // paste your contract id
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
    })
      .setNetworkPassphrase(Networks.TESTNET)
      .setTimeout(TIMEOUT_SEC)
      .addOperation(contract.call("increment"))
      .build();

    console.log("[server] Preparing transaction...");
    const preparedTransaction = await server.prepareTransaction(transaction);
    console.log(preparedTransaction);
    return preparedTransaction?.toEnvelope()?.toXDR("base64");
  } catch (e) {
    console.error("[server]", e);
    throw e;
  }
}

export async function testSend(signedTransaction: string) {
  try {
    const transaction = TransactionBuilder.fromXDR(
      signedTransaction,
      Networks.TESTNET
    ) as Transaction;

    console.log("[server] Sending transaction...");

    const server = new Server("https://soroban-testnet.stellar.org:443"); // testnet
    const sent = await server.sendTransaction(transaction);

    console.log("Sent", sent);

    if (sent.status !== "PENDING") {
      throw new Error("Something went Wrong. Status " + sent.status);
    }
  } catch (e) {
    console.error("[server]", e);
    throw e;
  }
}

export async function testFaucet() {
  try {
    const server = new Server("https://soroban-testnet.stellar.org:443");
    const pair = Keypair.random();
    const address: string = pair.publicKey();
    const result = await server.requestAirdrop(address);
    console.log(result);
  } catch (e) {
    console.error("[client]", e);
    throw e;
  }
}
