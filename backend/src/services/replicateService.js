import Replicate from "replicate";

import {
    uploadBufferToR2,
    getR2Url
} from "./storageService.js";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function transformImage(fileBuffer){

    console.log("Replicate transform started");

    // Upload original image temporarily to R2
    const tempKey = `temp/${Date.now()}.png`;

    await uploadBufferToR2(
        fileBuffer,
        tempKey,
        "image/png"
    );

    const inputImageUrl = await getR2Url(tempKey);

    const output = await replicate.run(
        "black-forest-labs/flux-kontext-pro",
        {
            input:{

                input_image: inputImageUrl,

                prompt:
`Transform this image into a traditional Japanese sumi-e ink painting.

Preserve the original composition.

Preserve the subject.

Preserve the pose.

Use elegant Japanese ink brush strokes.

Monochrome.

Rice paper texture.

High quality traditional ink wash painting.`,

                aspect_ratio: "match_input_image"

            }
        }
    );

    const imageUrl = Array.isArray(output)
        ? output[0]
        : output;

    console.log("Replicate output:", imageUrl);

    const response = await fetch(imageUrl);

    if(!response.ok){

        throw new Error("Failed to download Replicate output");

    }

    const buffer = Buffer.from(
        await response.arrayBuffer()
    );

    return {

        buffer,

        filename: "inkpainter-result.png",

        contentType: "image/png"

    };

}