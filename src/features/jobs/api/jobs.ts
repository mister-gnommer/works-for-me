import { getData } from "../../../api/coople";

export const PAGE_SIZE = 30;

export interface Money {
  amount: number;
  currencyId: number;
}

export interface JobSummary {
  workAssignmentId: string;
  workAssignmentName: string;
  hourlyWage: Money;
  salary: Money;
  jobSkill: { jobProfileId: number; educationalLevelId?: number };
  jobLocation: {
    addressStreet: string;
    extraAddress: string;
    zip: string;
    city: string;
    countryId: number;
  };
  /** Unix ms */
  periodFrom: number;
  /** Unix ms */
  datePublished: number;
  branchLink: string;
}

export interface JobDetails extends JobSummary {
  requirements?: string;
  clothingRequirements?: string;
  /** Unix ms */
  periodTo: number;
  shiftsCount: number;
  /** Total across all shifts, in minutes (see docs/DEV_NOTES.md). */
  workDuration: number;
}

export interface JobPage {
  items: JobSummary[];
  total: number;
}

/**
 * Loads one page of public jobs.
 * @param pageNum zero-based page index
 */
export function fetchJobPage(pageNum: number): Promise<JobPage> {
  return getData<JobPage>(
    `/work-assignments/public-jobs/list?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`,
  );
}

/**
 * Loads the full details of one job.
 * @param workAssignmentId the job's id, as used in `/job/:id` links
 */
export function fetchJob(workAssignmentId: string): Promise<JobDetails> {
  return getData<JobDetails>(
    `/work-assignments/public-jobs/${encodeURIComponent(workAssignmentId)}`,
  );
}
