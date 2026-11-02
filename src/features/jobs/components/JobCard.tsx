import { Pressable, Text, View } from "react-native";

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
    <Pressable
      className="mx-3 mt-3 flex-row rounded-[10px] bg-card p-4 dark:bg-card-dark"
      onPress={onPress}
      accessibilityRole="link"
    >
      <View className="flex-1 gap-1">
        <Text className="text-base font-semibold dark:text-ink-dark">
          {job.workAssignmentName}
        </Text>
        <Text className="text-muted dark:text-muted-dark">
          {job.jobLocation.zip} {job.jobLocation.city} ·{" "}
          {formatMoney(job.hourlyWage.amount, currency)}/h
        </Text>
        <Text className="text-muted dark:text-muted-dark">
          Starts {formatDateTime(job.periodFrom)}
        </Text>
      </View>
      <FavouriteButton jobId={job.workAssignmentId} />
    </Pressable>
  );
}
