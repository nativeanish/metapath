import useField from "../store/useField";
import useModal from "../store/useModal";
import submit from "./submit";
import upload from "./turbo/upload";
import useID from "../store/useID";

const startUpload = () => {
  _startUpload()
    .then(() => {
      console.log("Upload started");
    })
    .catch((error) => {
      console.error("Error starting upload:", error);
    });
};
export default startUpload;

const _startUpload = async () => {
  const image = useField.getState().image;
  useModal.setState({ isOpen: true });
  const img_id = await upload(image.length ? image : "", "base64");
  useModal.setState({ currentStep: 1 });
  const content = await submit(img_id ? img_id : "");
  useModal.setState({ currentStep: 2 });
  const content_id = await upload(content ? content : "", "html");
  console.log("Uploaded Content id: ", content_id);
  useID.setState({ id: content_id ? content_id : "" });
  useModal.setState({ currentStep: 3 });
};
