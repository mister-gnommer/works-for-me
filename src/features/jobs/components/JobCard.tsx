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
      className="mx-3 mt-3 flex-row rounded-[10px] bg-white p-4"
      onPress={onPress}
      accessibilityRole="link"
    >
      <View className="flex-1 gap-1">
        <Text className="text-base font-semibold">
          {job.workAssignmentName}
        </Text>
        <Text className="text-muted">
          {job.jobLocation.zip} {job.jobLocation.city} ·{" "}
          {formatMoney(job.hourlyWage.amount, currency)}/h
        </Text>
        <Text className="text-muted">
          Starts {formatDateTime(job.periodFrom)}
        </Text>
      </View>
      <FavouriteButton jobId={job.workAssignmentId} />
    </Pressable>
  );
}
