import useField from "../../store/useField";
import useHandle from "../../store/useHandle";
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { AOS } from "../constant";
import useModal from "../../store/useModal";
const aos = async () => {
  const social = useField.getState().social;
  const _social = social.map((e) => ({ name: e.iconName, uuid: e.uuid }));
  const name = useField.getState().name;
  const handle = useHandle.getState().subdomain;
  const setModal = useModal.getState().onClose;
  useModal.setState({ currentStep: 4 });
  await message({
    signer: createDataItemSigner(window.arweaveWallet),
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "add_link",
      },
    ],
    data: JSON.stringify(_social),
  });
  await message({
    signer: createDataItemSigner(window.arweaveWallet),
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "add_post",
      },
      {
        name: "name",
        value: name,
      },
      {
        name: "handler",
        value: handle,
      },
    ],
    data: JSON.stringify(_social.map((e) => e.uuid)),
  });
  setModal();
};

const runAO = () => {
  aos()
    .then(() => {
      console.log("done");
    })
    .catch(console.log);
};

export default runAO;
