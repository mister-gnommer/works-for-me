import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { type JobDetails, PAGE_SIZE } from "../features/jobs/api/jobs";

/**
 * Builds a job as the API returns it; list items are the same objects with extra fields.
 * @param id the job's workAssignmentId
 * @param name the job title
 */
function makeJob(id: string, name: string): JobDetails {
  return {
    workAssignmentId: id,
    workAssignmentName: name,
    hourlyWage: { amount: 25, currencyId: 1 },
    salary: { amount: 200, currencyId: 1 },
    jobSkill: { jobProfileId: 1 },
    jobLocation: {
      addressStreet: "Bahnhofstrasse 1",
      extraAddress: "",
      zip: "8001",
      city: "Zürich",
      countryId: 1,
    },
    periodFrom: Date.UTC(2026, 10, 5, 8, 0),
    periodTo: Date.UTC(2026, 10, 5, 16, 0),
    datePublished: Date.UTC(2026, 10, 1),
    branchLink: "",
    shiftsCount: 1,
    workDuration: 480,
  };
}

export const waiter = makeJob("job-1", "Waiter");
export const barista = makeJob("job-2", "Barista");

/** Two pages: the waiter on the first, the barista on the second. */
const pages = [[waiter], [barista]];
const jobs = [waiter, barista];

const labels: Record<string, { id: number; name: string }[]> = {
  Currency: [{ id: 1, name: "CHF" }],
  Country: [{ id: 1, name: "Switzerland" }],
  "job-profiles": [{ id: 1, name: "Service staff" }],
  EducationalLevel: [],
};

/**
 * Wraps data in Coople's response envelope.
 * @param data the payload
 */
export const ok = (data: unknown) => HttpResponse.json({ data, error: false });

/** Coople's error envelope with the given HTTP status. */
export const apiError = (status: number) =>
  HttpResponse.json({ status, error: true }, { status });

// The list handler must come before the `:id` one, which would also match `/list`.
export const server = setupServer(
  http.get("*/work-assignments/public-jobs/list", ({ request }) => {
    const pageNum = Number(new URL(request.url).searchParams.get("pageNum"));
    return ok({ items: pages[pageNum] ?? [], total: PAGE_SIZE + 1 });
  }),
  http.get("*/work-assignments/public-jobs/:id", ({ params }) => {
    const job = jobs.find((j) => j.workAssignmentId === params.id);
    return job ? ok(job) : apiError(404);
  }),
  http.get("*/common/*", ({ request }) => {
    const list = labels[new URL(request.url).pathname.split("/").at(-1) ?? ""];
    return list ? ok(list) : apiError(404);
  }),
);
