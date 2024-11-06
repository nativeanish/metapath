import aos from "aos";
import fs from "fs";
import path from "node:path";
import assert from "node:assert";
import { describe, test, before } from "node:test";
describe("AOS Tests", () => {
  let env: aos;

  before(async () => {
    const source = fs.readFileSync(
      path.join(__dirname, "./../src/main.lua"),
      "utf-8"
    );

    env = new aos(source);
    await env.init();
  });

  test("should add link", async () => {
    const response = await env.send({
      Action: "add_link",
      Data: JSON.stringify([
        { name: "facebook", uuid: "12345" },
        { name: "twitter", uuid: "67890" },
        { name: "instagram", uuid: "4324534" },
      ]),
    });
    assert.equal(response.Messages[0].Data, "Link Added");
  });

  test("should get link", async () => {
    const response = await env.send({
      Action: "get_link",
      Tags: [{ uuid: "12345" }],
    });
    assert.equal(
      response.Messages[0].Data,
      JSON.stringify({
        name: "facebook",
      })
    );
  });
  test("should add post", async () => {
    const response = await env.send({
      Action: "add_post",
      Tags: [{ handler: "anish" }],
      Data: JSON.stringify({ name: "12345", name2: "67890", name3: "4324534" }),
    });
    assert.equal(response.Messages[0].Data, "Post Added");
  });

  test("should get post", async () => {
    const response = await env.send({
      Action: "get_post",
      Tags: [{ handler: "anish" }],
    });
    assert.equal(JSON.parse(response.Messages[0].Data).social.length, 3);
  });

  test("should get user", async () => {
    const response = await env.send({
      Action: "get_user",
    });
    assert.equal(response.Messages[0].Data, '["anish"]');
  });

  test("should add post", async () => {
    const response = await env.send({
      Action: "add_post",
      Tags: [{ name: "Anish Next App" }, { handler: "anish1" }],
      Data: JSON.stringify({ name: "12345", name2: "67890", name3: "4324534" }),
    });
    assert.equal(response.Messages[0].Data, "Post Added");
  });

  test("should get user", async () => {
    const response = await env.send({
      Action: "get_user",
    });
    assert.equal(response.Messages[0].Data, '["anish","anish1"]');
  });

  test("should add visti", async () => {
    const response = await env.send({
      Action: "add_visit",
      Tags: [{ url: "https://www.google.com" }],
    });
    assert.equal(response.Messages[0].Data, "Visit Added");
  });

  test("should get visit", async () => {
    const response = await env.send({
      Action: "get_visit",
      Tags: [{ url: "https://www.google.com" }],
    });
    assert.equal(JSON.parse(response.Messages[0].Data).visit, 1);
  });

  test("should add click", async () => {
    const response = await env.send({
      Action: "add_click",
      Tags: [{ time: "2022-01-01T00:00:00Z" }, { uuid: "12345" }],
    });
    console.log(response);
    assert.equal(response.Messages[0].Data, "Click Added");
  });

  test("should get click", async () => {
    const response = await env.send({
      Action: "get_click",
      Tags: [{ uuid: "12345" }],
    });
    console.log(response);
    assert.equal(
      JSON.parse(response.Messages[0].Data)[0].time,
      "2022-01-01T00:00:00Z"
    );
  });

  test("should remove the post", async () => {
    const response = await env.send({
      Action: "remove_post",
      Tags: [{ handler: "anish" }],
    });
    assert.equal(response.Messages[0].Data, "Post Removed");
  });
});
