import { initEdgeStore } from "@edgestore/server";
import {
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";


const es = initEdgeStore.context().create();

const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1,
    })
    .input(
      z.object({
        type: z.enum(["product", "profile"]),
      })
    )
    .path(({ input }) => [{ type: input.type }]),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };