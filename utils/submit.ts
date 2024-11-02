import useField from "../store/useField";
import useTheme from "../store/useTheme";
import generateCL from "./generateCL";
import generateCD from "./generateCD";
import generateCB from "./generateCB";
import generateWL from "./generateWL";
import generateWD from "./generateWD";
import generateBL from "./generateBL";
import generateBD from "./generateBD";
export default function submit() {
  const name = useField.getState().name;
  const description = useField.getState().description;
  const social = useField.getState().social;
  const img = useField.getState().image;
  const theme = useTheme.getState().theme;
  if (theme === "classicLight") {
    console.log(
      generateCL({
        name,
        description,
        social,
        image: img,
      })
    );
  }
  if (theme === "classicDark") {
    console.log(
      generateCD({
        name,
        description,
        social,
        image: img,
      })
    );
  }
  if (theme === "classicBrut") {
    generateCB({
      name,
      description,
      social,
      image: img,
    }).then((e) => console.log(e));
  }
  if (theme === "windowLight") {
    generateWL({
      name,
      description,
      social,
      image: img,
    }).then((e) => console.log(e));
  }
  if (theme === "windowDark") {
    generateWD({
      name,
      description,
      social,
      image: img,
    }).then((e) => console.log(e));
  }
  if (theme === "bentoLight") {
    generateBL({
      name,
      description,
      social,
      image: img,
    }).then((e) => console.log(e));
  }
  if (theme === "bentoDark") {
    generateBD({
      name,
      description,
      social,
      image: img,
    }).then((e) => console.log(e));
  }
}
