import fs from "fs";
import path from "path";
import express, { Application } from "express";
import Mustache from "mustache";

const renderHtml = (app: Application) => {
  const assetPath = path.join(__dirname, "../../../web/build");

  app.use(express.static(assetPath, { index: false }));

  app.get("/*", (_req, res) => {
    const rawHtml = fs.readFileSync(`${assetPath}/index.html`, "utf8");

    const html = Mustache.render(rawHtml, {
    });

    res.status(200).send(html);
  });
};

export default renderHtml;
