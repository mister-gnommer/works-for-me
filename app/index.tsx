import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  fetchJobPage,
  type JobPage,
  PAGE_SIZE,
} from "../src/features/jobs/api/jobs";
import { JobCard } from "../src/features/jobs/components/JobCard";
import { Pagination } from "../src/features/jobs/components/Pagination";
import {
  LoadingView,
  MessageView,
} from "../src/features/jobs/components/StatusViews";
import { useLookups } from "../src/features/lookups/hooks/useLookups";
import { type AsyncState, useAsync } from "../src/hooks/useAsync";

export default function JobListScreen() {
  const [page, setPage] = useState(0);
  const jobs = useAsync(() => fetchJobPage(page), [page]);

  // Remember the last known total so the page arrows stay put while the next page loads.
  // Updating state during render is React's recommended way to derive from changing data.
  const [total, setTotal] = useState<number>();
  if (jobs.status === "success" && jobs.data.total !== total) {
    setTotal(jobs.data.total);
  }

  return (
    <View style={styles.screen}>
      <JobListContent jobs={jobs} onRetry={jobs.reload} />
      {total !== undefined && (
        <Pagination
          page={page}
          pageCount={Math.max(1, Math.ceil(total / PAGE_SIZE))}
          onChange={setPage}
        />
      )}
    </View>
  );
}

/** The area above the page arrows: a spinner, an error, an empty message or the jobs. */
function JobListContent({
  jobs,
  onRetry,
}: {
  jobs: AsyncState<JobPage>;
  onRetry: () => void;
}) {
  const { currencies } = useLookups();

  if (jobs.status === "loading") {
    return <LoadingView />;
  }
  if (jobs.status === "error") {
    return (
      <MessageView
        message="Couldn't load jobs. Check your connection and try again."
        actionLabel="Try again"
        onAction={onRetry}
      />
    );
  }
  if (jobs.data.items.length === 0) {
    return <MessageView message="No jobs on this page." />;
  }
  return (
    <FlatList
      data={jobs.data.items}
      keyExtractor={(job) => job.workAssignmentId}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          currency={currencies.get(item.hourlyWage.currencyId)}
          onPress={() =>
            router.push({
              pathname: "/job/[id]",
              params: { id: item.workAssignmentId },
            })
          }
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f2f2f2" },
  list: { paddingBottom: 12 },
});
