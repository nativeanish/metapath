import useField from "../store/useField";
import generate from "./generateBD";
export default function submit() {
  const name = useField.getState().name;
  const description = useField.getState().description;
  const social = useField.getState().social;
  const img = useField.getState().image;
  generate({
    name,
    description,
    social,
    image: img,
  }).then((html) => {
    console.log(html);
  });
}
