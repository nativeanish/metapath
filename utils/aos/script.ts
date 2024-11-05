import useField from "../../store/useField";
import useHandle from "../../store/useHandle";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { AOS } from "../constant";
import useModal from "../../store/useModal";
const aos = async () => {
  const social = useField.getState().social;
  const _social = social.map((e) => ({ name: e.iconName, uuid: e.uuid }));
  const name = useField.getState().name;
  const handle = useHandle.getState().subdomain;
  const setModal = useModal.getState().onClose;
  useModal.setState({ currentStep: 4 });
  const a1 = await message({
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
  const a2 = await result({
    process: AOS,
    message: a1,
  });
  console.log(a2);
  const a3 = await message({
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
  const a4 = await result({
    process: AOS,
    message: a3,
  });
  console.log(a4);
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
