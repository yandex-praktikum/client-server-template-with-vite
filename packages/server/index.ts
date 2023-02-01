import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import * as fs from "fs";
import * as path from "path";
import { createServer as createViteServer } from "vite";
import type { ViteDevServer } from "vite";
import { sequelize } from "./db";
import { Forum, ForumComments, Ladder } from "./tables";
dotenv.config();

const isDev = () => process.env.NODE_ENV === "development";

const startServer = async () => {
    const app = express();
    const port = Number(process.env.SERVER_PORT) || 5000;

    let vite: ViteDevServer | undefined;
    let distPath = "";
    let srcPath = "";
    let ssrClientPath = "";

    app.use(cors());

    if (isDev()) {
        srcPath = path.dirname(require.resolve("client"));
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: "custom",
        });

        app.use(vite.middlewares);
    } else {
        distPath = path.dirname(
            require.resolve("../../client/dist/index.html")
        );
        ssrClientPath = require.resolve("../../client/dist-ssr/ssr.cjs");
    }

    app.use(express.json());

    await sequelize.sync();

    //Ладдер хендлеры
    app.get("/api/v1/ladder", async (_, res) => {
        const ladder = await Ladder.findAll();
        res.send(ladder);
    });

    app.post("/api/v1/ladder", async (req, res) => {
        const ladder = await Ladder.create(req.body);
        res.json(ladder.dataValues);
    });
    //Форум хендлеры
    app.get("/api/v1/forum", async (_, res) => {
        const ladder = await Forum.findAll();
        res.send(ladder);
    });

    app.post("/api/v1/forum", async (req, res) => {
        const forum = await Forum.create(req.body);
        res.json(forum.dataValues);
    });

    app.put("/api/v1/forum/:id", async (req, res) => {
        const [themeCount] = await Forum.update(req.body, {
            where: { theme_id: req.params.id },
        });
        let status = "error";
        let payload;
        if (themeCount) {
            payload = await Forum.findOne({
                where: { theme_id: req.params.id },
            });
            status = "ok";
        }
        res.json({ status, payload });
    });
    //Комменты форума хендлеры
    app.get("/api/v1/forum-comments/:id", async (req, res) => {
        const comments = await ForumComments.findAll({
            where: { theme_id: req.params.id },
        });
        res.send(comments);
    });

    app.post("/api/v1/forum-comments/:id", async (req, res) => {
        const comment = await ForumComments.create({
            theme_id: req.params.id,
            ...req.body,
        });
        res.json(comment);
    });

    if (!isDev()) {
        app.use("/assets", express.static(path.resolve(distPath, "assets")));
    }

    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string;
            let render: (store: any, url: string) => Promise<string>;
            let createStore: (
                preloadedState: Record<string, unknown> | undefined
            ) => any;

            if (isDev() && vite) {
                template = fs.readFileSync(
                    path.resolve(srcPath, "index.html"),
                    "utf-8"
                );

                template = await vite.transformIndexHtml(url, template);

                render = (
                    await vite.ssrLoadModule(path.resolve(srcPath, "ssr.tsx"))
                ).render;

                createStore = (
                    await vite.ssrLoadModule(path.resolve(srcPath, "ssr.tsx"))
                ).createStore;
            } else {
                template = fs.readFileSync(
                    path.resolve(distPath, "index.html"),
                    "utf-8"
                );

                render = (await import(ssrClientPath)).render;

                createStore = (await import(ssrClientPath)).createStore;
            }

            const store = createStore(undefined);
            const state = store.getState();

            const appHtml = await render(store, req.url);
            const stateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
                state
            ).replace(/</g, "\\u003c")}</script>`;

            const html = template.replace(
                `<!--ssr-insertion-->`,
                appHtml + stateHtml
            );
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (error) {
            if (isDev()) {
                vite!.ssrFixStacktrace(error as Error);
            }

            next(error);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
};

startServer();
