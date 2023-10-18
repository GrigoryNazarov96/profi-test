import { app, server } from "../../src";
import request from "supertest";

const _app = request(app);
afterAll(async () => {
  server.close();
});

describe("POST /", () => {
  it("should create a shortened URL with a valid original URL", async () => {
    const response = await _app.post("/").send({ originalUrl: "https://www.example.com" });
    expect(response.status).toBe(200);
    expect(response.body.shortUrl).toBeDefined();
  });

  it("should handle invalid original URL", async () => {
    const response = await _app.post("/").send({ originalUrl: "invalid-url" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Oops! You've provided not valid URL, check the input and try again");
  });

  it("should handle duplicate custom URL", async () => {
    const customUrl = "profi";
    await _app.post("/").send({ originalUrl: "https://www.example2.com", customUrl });
    const response = await _app.post("/").send({ originalUrl: "https://www.example3.com", customUrl });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Oops! This custom URL already exists, pick another one");
  });
});

describe("GET /:code", () => {
  it("should redirect to the original URL when the short URL exists", async () => {
    const response1 = await _app.post("/").send({ originalUrl: "https://www.example4.com" });
    const shortUrl = response1.body.shortUrl;
    const response2 = await _app.get(`/${shortUrl}`);
    expect(response2.status).toBe(302);
  });

  it("should handle non-existent short URL", async () => {
    const response = await _app.get("/non-existent-short-url");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Oops! No URL was found");
  });
});
