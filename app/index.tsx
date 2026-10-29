import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { fetchJobPage, PAGE_SIZE } from "../src/features/jobs/api/jobs";
import { JobCard } from "../src/features/jobs/components/JobCard";
import { Pagination } from "../src/features/jobs/components/Pagination";
import {
  LoadingView,
  MessageView,
} from "../src/features/jobs/components/StatusViews";
import { useLookups } from "../src/features/lookups/hooks/useLookups";
import { useAsync } from "../src/hooks/useAsync";

export default function JobListScreen() {
  const [page, setPage] = useState(0);
  const jobs = useAsync(() => fetchJobPage(page), [page]);
  const { currencies } = useLookups();

  if (jobs.status === "loading") {
    return <LoadingView />;
  }
  if (jobs.status === "error") {
    return (
      <MessageView
        message="Couldn't load jobs. Check your connection and try again."
        actionLabel="Try again"
        onAction={jobs.reload}
      />
    );
  }

  const pageCount = Math.max(1, Math.ceil(jobs.data.total / PAGE_SIZE));
  return (
    <View style={styles.screen}>
      {jobs.data.items.length === 0 ? (
        <MessageView message="No jobs on this page." />
      ) : (
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
      )}
      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f2f2f2" },
  list: { paddingBottom: 12 },
});
