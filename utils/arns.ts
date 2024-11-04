import { ANT, ArconnectSigner } from "@ar.io/sdk";
import useID from "../store/useID";
export default async function Register(process_id: string, arns_name: string) {
  try {
    const id = useID.getState().id;
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet),
      processId: process_id,
    });
    const txn = await ant.setRecord({
      undername: arns_name,
      transactionId: id,
      ttlSeconds: 3600,
    });
    console.log(txn.id);
    return txn.id;
  } catch (err) {
    console.log(err);
    return false;
  }
}
