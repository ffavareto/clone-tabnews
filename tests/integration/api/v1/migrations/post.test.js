import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public");
}

async function liveRunMigration() {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  return response;
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await liveRunMigration();
  const responseBody1 = await response1.json();

  expect(response1.status).toBe(201);
  expect(Array.isArray(responseBody1)).toBe(true);
  expect(responseBody1.length).toBeGreaterThan(0);

  const response2 = await liveRunMigration();
  const responseBody2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
});
