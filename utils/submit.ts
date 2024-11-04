import useField from "../store/useField";
import useTheme from "../store/useTheme";
import generateCL from "./theme/generateCL";
import generateCD from "./theme/generateCD";
import generateCB from "./theme/generateCB";
import generateWL from "./theme/generateWL";
import generateWD from "./theme/generateWD";
import generateBL from "./theme/generateBL";
import generateBD from "./theme/generateBD";
export default async function submit(img: string) {
  const name = useField.getState().name;
  const description = useField.getState().description;
  const social = useField.getState().social;
  const theme = useTheme.getState().theme;
  if (theme === "classicLight") {
    return await generateCL({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "classicDark") {
    return await generateCD({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "classicBrut") {
    return await generateCB({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "windowLight") {
    return await generateWL({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "windowDark") {
    return await generateWD({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "bentoLight") {
    return await generateBL({
      name,
      description,
      social,
      image: img,
    });
  }
  if (theme === "bentoDark") {
    return await generateBD({
      name,
      description,
      social,
      image: img,
    });
  }
}
