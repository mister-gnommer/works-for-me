import { Pressable, StyleSheet, Text, View } from "react-native";

import { FavouriteButton } from "../../favourites/FavouriteButton";
import type { JobSummary } from "../api/jobs";
import { formatDateTime, formatMoney } from "../format";

interface Props {
  job: JobSummary;
  /** Currency label for the job's wage, if known. */
  currency?: string;
  onPress: () => void;
}

export function JobCard({ job, currency, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="link">
      <View style={styles.body}>
        <Text style={styles.title}>{job.workAssignmentName}</Text>
        <Text style={styles.meta}>
          {job.jobLocation.zip} {job.jobLocation.city} ·{" "}
          {formatMoney(job.hourlyWage.amount, currency)}/h
        </Text>
        <Text style={styles.meta}>Starts {formatDateTime(job.periodFrom)}</Text>
      </View>
      <FavouriteButton jobId={job.workAssignmentId} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  body: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: "600" },
  meta: { color: "#555" },
});
