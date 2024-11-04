import { WebIrys } from "@irys/sdk";
// const turboDevelopmentConfigurations = {
//   paymentServiceConfig: {
//     url: process.env.PAYMENT_SERVICE_URL ?? "https://payment.ardrive.dev",
//   },
//   uploadServiceConfig: {
//     url: process.env.UPLOAD_SERVICE_URL ?? "https://upload.ardrive.dev",
//   },
// };
const _upload = async (
  data: string | Buffer,
  content_type: string,
  irys: WebIrys
) => {
  const upload = await irys.upload(data, {
    tags: [
      {
        name: "Content-Type",
        value: content_type,
      },
    ],
  });
  return upload;
};
const upload = async (data: string, type: "base64" | "html") => {
  // const turbo = TurboFactory.authenticated({
  //   signer: new ArweaveSigner(publicJWK),
  //   token: "arweave",
  // });
  // await signer.setPublicKey();
  const irys = new WebIrys({
    url: "https://turbo.ardrive.io",
    token: "arweave",
    wallet: { provider: window.arweaveWallet },
  });
  await irys.ready();
  if (type === "base64") {
    const iden = identifyImageType(data);
    if (iden) {
      if (iden === "svg+xml") {
        const svgElement = base64ToSvgElement(data);
        if (svgElement) {
          const svgString = svgElementToString(svgElement);
          if (svgString) {
            const upload = await _upload(svgString, `image/svg+xml`, irys);
            console.log(upload);
            return upload.id;
          }
        }
      }
      if (
        iden === "png" ||
        iden === "jpeg" ||
        iden === "jpg" ||
        iden === "gif"
      ) {
        const img = base64ToBuffer(data);
        if (img) {
          const upload = await _upload(img, `image/${iden}`, irys);
          console.log(upload);
          return upload.id;
        }
      }
    }
  }
  if (type === "html") {
    const uplo = await _upload(data, "text/html", irys);
    console.log(uplo);
    return uplo.id;
  }
};
export default upload;
function svgElementToString(svgElement: SVGSVGElement): string {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgElement);
}
function base64ToSvgElement(base64String: string): SVGSVGElement | null {
  base64String = base64String.replace(
    /^data:image\/(svg\+xml|png|jpeg|jpg|gif|bmp|webp);base64,/,
    ""
  );
  // Decode the Base64 string to get the SVG XML string
  const svgData = atob(base64String);

  // Parse the SVG XML string into an SVG element
  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgData, "image/svg+xml");

  // Cast documentElement to `unknown` first, then to `SVGSVGElement`
  const svgElement = svgDocument.documentElement as unknown as SVGSVGElement;

  // Check for parsing errors
  if (svgElement.nodeName === "parsererror") {
    console.error("Error parsing SVG.");
    return null;
  }

  return svgElement;
}
function identifyImageType(base64String: string): string | null {
  // Define regex to match different image types
  const regex = /^data:image\/(svg\+xml|png|jpeg|jpg);base64,/;

  // Test the base64 string against the regex
  const match = base64String.match(regex);

  // If there's a match, return the corresponding image type
  if (match) {
    return match[1]; // match[1] will contain the image format
  }

  // Check for SVG separately since it has a different format
  if (base64String.startsWith("data:image/svg+xml;base64,")) {
    return "svg+xml";
  }

  // Return null if the format is unknown
  return null;
}
function base64ToBuffer(base64Image: string): Buffer | null {
  // Define a regex to match the data URL prefix for PNG, JPEG, JPG, and GIF
  const regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;

  // Remove the data URL prefix if it exists
  const match = base64Image.match(regex);
  if (match) {
    const base64Data = base64Image.replace(regex, "");

    // Convert base64 string to Buffer
    const buffer = Buffer.from(base64Data, "base64");
    return buffer;
  }

  // Return null if the format is unknown or invalid
  return null;
}
