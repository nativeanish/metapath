import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { AOS } from "./constant";
import useDashboard from "../store/useDashboard";
export const readUser = async () => {
  const data = await message({
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "get_user",
      },
    ],
    signer: createDataItemSigner(window.arweaveWallet),
  });
  const res = await result({
    process: AOS,
    message: data,
  });
  if (JSON.parse(res.Messages[0].Data).status === 1) {
    useDashboard.setState({
      post: removeDuplicates(JSON.parse(JSON.parse(res.Messages[0].Data).data)),
    });
  }
  if (useDashboard.getState().post.length) {
    useDashboard.getState().post.map(async (e) => {
      const data = await message({
        process: AOS,
        tags: [
          {
            name: "Action",
            value: "get_visit",
          },
          {
            name: "url",
            value: e,
          },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
      });
      const res = await result({
        process: AOS,
        message: data,
      });
      useDashboard.setState((state) => {
        const newView = {
          handler: e,
          view: JSON.parse(JSON.parse(res.Messages[0].Data).visit),
        };
        const isDuplicate = state.view.some(
          (v) => v.handler === newView.handler && v.view === newView.view
        );
        if (isDuplicate) {
          return state;
        }
        return {
          view: [...state.view, newView],
        };
      });
    });
  }
};

export const read_post = async (handler: string) => {
  const data = await message({
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "get_post",
      },
      {
        name: "handler",
        value: handler,
      },
    ],
    signer: createDataItemSigner(window.arweaveWallet),
  });
  const res = await result({
    process: AOS,
    message: data,
  });
  console.log(JSON.parse(res.Messages[0].Data));
  if (JSON.parse(res.Messages[0].Data).status === 1) {
    const social: Array<string> = JSON.parse(
      JSON.parse(res.Messages[0].Data).data
    ).social;
    if (social.length) {
      social.map(async (e) => {
        const data = await message({
          process: AOS,
          tags: [
            {
              name: "Action",
              value: "get_click",
            },
            {
              name: "uuid",
              value: e,
            },
          ],
          signer: createDataItemSigner(window.arweaveWallet),
        });
        const res = await result({
          process: AOS,
          message: data,
        });
        const dats = JSON.parse(res.Messages[0].Data);
        if (dats.length) {
          await make({ time: dats, uuid: e });
        }
      });
    }
  }
  return true;
};
interface Props {
  time: Array<{ time: string }>;
  uuid: string;
}
const make = async (props: Props) => {
  const data = await message({
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "get_link",
      },
      {
        name: "uuid",
        value: props.uuid,
      },
    ],
    signer: createDataItemSigner(window.arweaveWallet),
  });
  const res = await result({
    process: AOS,
    message: data,
  });
  if (JSON.parse(res.Messages[0].Data).status === 1) {
    const icon = JSON.parse(JSON.parse(res.Messages[0].Data).data).name;
    props.time.map((e) => {
      useDashboard.setState((state) => {
        const newClick = { name: icon, time: e.time };

        // Check if there's an existing click with the same name and time
        const isDuplicate = state.click.some(
          (click) =>
            click.name === newClick.name && click.time === newClick.time
        );

        if (isDuplicate) {
          return state; // If it's a duplicate, return the current state without changes
        }

        // If it's not a duplicate, add the new click entry
        return {
          click: [...state.click, newClick],
        };
      });
    });
  }
  return true;
};
function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export const delet = async (handler: string) => {
  const data = await message({
    process: AOS,
    tags: [
      {
        name: "Action",
        value: "remove_post",
      },
      {
        name: "handler",
        value: handler,
      },
    ],
    signer: createDataItemSigner(window.arweaveWallet),
  });
  await result({
    process: AOS,
    message: data,
  });
  window.location.reload();
  await readUser();
};

export const del = (handler: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this page?"
  );
  if (!confirmDelete) {
    return;
  }
  delet(handler)
    .then(() => {})
    .catch(console.log);
};
