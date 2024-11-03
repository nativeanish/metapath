import { ArweaveWebWallet } from "arweave-wallet-connector";
const state = { url: "arweave.app" };
const wallet = new ArweaveWebWallet(
  {
    // optionally provide information about your app that will be displayed in the wallet provider interface
    name: "metapaths",
    logo: "URL of your logo to be displayed to users",
  },
  { state: state }
);
wallet.setUrl("https://arweave.app");
export default wallet;
