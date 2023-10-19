import { app, server } from "../../src";
import request from "supertest";

const _app = request(app);

afterAll(async () => {
  server.close();
});

describe("POST /", () => {
  it("should create a shortened URL with a valid original URL", async () => {
    const response = await _app.post("/").send({ originalLink: "https://www.example.com" });
    expect(response.status).toBe(200);
    expect(response.body.seq).toBeDefined();
  });

  it("should handle invalid original URL", async () => {
    const response = await _app.post("/").send({ originalLink: "invalid-url" });
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Oops! You've provided not valid URL, check the input and try again");
  });

  it("should handle duplicate custom URL", async () => {
    const customSeq = "profi";
    await _app.post("/").send({ originalLink: "https://www.example2.com", customSeq });
    const response = await _app.post("/").send({ originalLink: "https://www.example3.com", customSeq });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Oops! This custom URL already exists, pick another one");
  });
});

describe("GET /:code", () => {
  it("should redirect to the original URL when the short URL exists", async () => {
    const response1 = await _app.post("/").send({ originalLink: "https://www.example4.com" });
    const seq = response1.body.seq;
    const response2 = await _app.get(`/${seq}`);
    expect(response2.status).toBe(302);
  });

  it("should handle non-existent short URL", async () => {
    const response = await _app.get("/non-existent-short-url");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Oops! No URL was found");
  });
});
