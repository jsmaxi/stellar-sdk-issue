// Contract code: https://github.com/stellar/soroban-examples/blob/main/events/src/lib.rs

"use client";

import { testPrepare, testSend } from "./serverActions";
import { testSign } from "./clientActions";

async function handleClick() {
  const prep = await testPrepare();
  console.log("[Client] Check server console for details!");
  const sign = await testSign(prep);
  console.log("[Client] Check client console for details!");
  const _ = await testSend(sign);
  console.log("[Client] Check server console for details!");
}

export default function Home() {
  return (
    <div>
      <button
        className="bg-blue-700 text-white bold py-3 px-5"
        onClick={handleClick}
      >
        TEST CALL
      </button>
    </div>
  );
}
