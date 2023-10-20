import ejs from "ejs";
import path from "path";
import { Request, Response } from "express";

export const getMainPage = (_req: Request, res: Response): void => {
  ejs.renderFile(path.join(__dirname, "../../views/main.ejs"), {}, {}, (err: Error | null, html: string) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.status(200).send(html);
  });
};
