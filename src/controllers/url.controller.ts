import { Request, Response } from "express";
import UrlShorten, { IUrlShorten } from "../schema/url.schema";
import { ERROR } from "../constants";
import generateRandomSequence from "../utils/random_url_generator";
import isValidURL from "../utils/url_validator";

const findRecordByOriginalUrl = async (originalUrl: string): Promise<IUrlShorten | null> => {
  return await UrlShorten.findOne({ originalUrl });
};

const findRecordByShortUrl = async (shortUrl: string): Promise<IUrlShorten | null> => {
  return await UrlShorten.findOne({ shortUrl });
};

const createRecord = async (originalUrl: string, shortUrl: string): Promise<IUrlShorten> => {
  return await UrlShorten.create({ originalUrl, shortUrl });
};

export const createShortenedURL = async (req: Request, res: Response): Promise<void> => {
  //retrieve the original url and the custom url (if exists) from the request
  const customUrl: string | undefined = req.body?.customUrl;
  const originalUrl: string = req.body.originalUrl;

  const shortUrl: string = customUrl ?? generateRandomSequence();
  let record: IUrlShorten | null;
  try {
    if (!isValidURL(originalUrl)) {
      throw new Error("Oops! You've provided not valid URL, check the input and try again");
    }
    //check existence
    record = await findRecordByOriginalUrl(originalUrl);
    //if doesn'f exists create one
    if (!record) {
      record = await createRecord(originalUrl, shortUrl);
    }
    res.status(200).send({ shortUrl: record.shortUrl });
  } catch (e: any) {
    if (e.code === ERROR.duplicate && customUrl) {
      res.status(400).send({ error: "Oops! This custom URL already exists, pick another one" });
    } else if (e.code === ERROR.duplicate && !customUrl) {
      res.status(400).send({ error: "Oops! Eternal error, try again" });
    } else {
      res.status(400).send({ error: e.message });
    }
  }
};

export const redirectToOriginal = async (req: Request, res: Response): Promise<void> => {
  //retrieve the url from the request
  const shortUrl = req.params?.code;

  const record = await findRecordByShortUrl(shortUrl);
  if (record) {
    res.status(302).redirect(record.originalUrl);
  } else {
    res.status(404).send({ error: "Oops! No URL was found" });
  }
};
