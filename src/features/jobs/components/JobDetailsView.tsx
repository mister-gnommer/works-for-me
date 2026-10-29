import { ScrollView, StyleSheet, Text, View } from "react-native";

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
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{job.workAssignmentName}</Text>
        <FavouriteButton jobId={job.workAssignmentId} />
      </View>

      <View style={styles.section}>
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

      <View style={styles.section}>
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
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/** A titled block of free text; hidden when there is no text. */
function Section({ title, text }: { title: string; text?: string }) {
  if (!text?.trim()) {
    return null;
  }
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>{text.trim()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  title: { flex: 1, fontSize: 22, fontWeight: "700" },
  section: { backgroundColor: "#fff", borderRadius: 10, padding: 16, gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", gap: 12 },
  label: { width: 110, color: "#555" },
  value: { flex: 1 },
});
