import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import { isNotFound } from "../../src/api/coople";
import { fetchJob } from "../../src/features/jobs/api/jobs";
import { JobDetailsView } from "../../src/features/jobs/components/JobDetailsView";
import {
  LoadingView,
  MessageView,
} from "../../src/features/jobs/components/StatusViews";
import { useLookups } from "../../src/features/lookups/hooks/useLookups";
import { useAsync } from "../../src/hooks/useAsync";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = useAsync(() => fetchJob(id), [id]);
  const lookups = useLookups();

  if (job.status === "loading") {
    return <LoadingView />;
  }
  if (job.status === "error") {
    return isNotFound(job.error) ? (
      // A deep link may have no screen behind it, so offer a way to the list instead of "back".
      <MessageView
        message="This job doesn't exist or is no longer published."
        actionLabel="Go to jobs"
        onAction={() => router.replace("/")}
      />
    ) : (
      <MessageView
        message="Couldn't load this job. Check your connection and try again."
        actionLabel="Try again"
        onAction={job.reload}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <JobDetailsView job={job.data} lookups={lookups} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f2f2f2" },
});
