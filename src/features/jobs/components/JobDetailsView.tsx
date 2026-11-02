import { ScrollView, Text, View } from "react-native";

import { FavouriteButton } from "../../favourites/FavouriteButton";
import type { Lookups } from "../../lookups/api/lookups";
import type { JobDetails } from "../api/jobs";
import { formatDateTime, formatMoney } from "../format";

interface Props {
  job: JobDetails;
  lookups: Lookups;
}

export function JobDetailsView({ job, lookups }: Props) {
  const { addressStreet, extraAddress, zip, city, countryId } = job.jobLocation;
  const location = [
    addressStreet,
    extraAddress,
    `${zip} ${city}`,
    lookups.countries.get(countryId),
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <ScrollView contentContainerClassName="p-4 gap-4">
      <View className="flex-row items-start gap-3">
        <Text className="flex-1 text-[22px] font-bold dark:text-ink-dark">
          {job.workAssignmentName}
        </Text>
        <FavouriteButton jobId={job.workAssignmentId} />
      </View>

      <View className="gap-2 rounded-[10px] bg-card p-4 dark:bg-card-dark">
        <Row
          label="Role"
          value={lookups.jobProfiles.get(job.jobSkill.jobProfileId)}
        />
        <Row
          label="Experience"
          value={
            job.jobSkill.educationalLevelId === undefined
              ? undefined
              : lookups.educationalLevels.get(job.jobSkill.educationalLevelId)
          }
        />
        <Row label="Location" value={location} />
      </View>

      <View className="gap-2 rounded-[10px] bg-card p-4 dark:bg-card-dark">
        <Row
          label="Hourly wage"
          value={`${formatMoney(job.hourlyWage.amount, lookups.currencies.get(job.hourlyWage.currencyId))}/h`}
        />
        <Row
          label="Total pay"
          value={formatMoney(
            job.salary.amount,
            lookups.currencies.get(job.salary.currencyId),
          )}
        />
        {/* workDuration is in minutes: established from examples (salary / hourlyWage × 60), not from
            official API docs. See docs/DEV_NOTES.md. */}
        <Row
          label="Total work time"
          value={`${Number((job.workDuration / 60).toFixed(2))} h`}
        />
        <Row label="Shifts" value={String(job.shiftsCount)} />
        <Row label="Starts" value={formatDateTime(job.periodFrom)} />
        <Row label="Ends" value={formatDateTime(job.periodTo)} />
      </View>

      <Section title="Requirements" text={job.requirements} />
      <Section title="Clothing" text={job.clothingRequirements} />
    </ScrollView>
  );
}

/** One labelled value; hidden when the value is unknown. */
function Row({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }
  return (
    <View className="flex-row gap-3">
      <Text className="w-[110px] text-muted dark:text-muted-dark">{label}</Text>
      <Text className="flex-1 dark:text-ink-dark">{value}</Text>
    </View>
  );
}

/** A titled block of free text; hidden when there is no text. */
function Section({ title, text }: { title: string; text?: string }) {
  if (!text?.trim()) {
    return null;
  }
  return (
    <View className="gap-2 rounded-[10px] bg-card p-4 dark:bg-card-dark">
      <Text className="text-base font-semibold dark:text-ink-dark">
        {title}
      </Text>
      <Text className="dark:text-ink-dark">{text.trim()}</Text>
    </View>
  );
}
