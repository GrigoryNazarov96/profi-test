import Url, { IUrlShorten } from "../schema/url.schema";

export const findRecord = async (originalLink: string, seq: string): Promise<IUrlShorten | null> => {
  return await Url.findOne({ originalLink, seq });
};

export const findRecordBySeq = async (seq: string): Promise<IUrlShorten | null> => {
  return await Url.findOne({ seq });
};

export const createRecord = async (originalLink: string, seq: string): Promise<IUrlShorten> => {
  return await Url.create({ originalLink, seq });
};
