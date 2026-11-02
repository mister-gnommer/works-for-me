import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

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

export default function JobListScreen() {
  const [page, setPage] = useState(0);
  const jobs = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => fetchJobPage(page),
    placeholderData: keepPreviousData,
  });

  // Remember the last known total so the page arrows stay put when a page fails to load.
  // Updating state during render is React's recommended way to derive from changing data.
  const [total, setTotal] = useState<number>();
  if (jobs.data && jobs.data.total !== total) {
    setTotal(jobs.data.total);
  }

  return (
    <View className="flex-1 bg-screen dark:bg-screen-dark">
      <JobListContent jobs={jobs} page={page} />
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

/** The area above the page arrows: the jobs (the previous page's while the next one loads), an empty message, an error or a spinner. */
function JobListContent({
  jobs,
  page,
}: {
  jobs: UseQueryResult<JobPage>;
  page: number;
}) {
  const { currencies } = useLookups();

  if (jobs.data) {
    if (jobs.data.items.length === 0) {
      return <MessageView message="No jobs on this page." />;
    }
    return (
      <FlatList
        // A new list per page starts it at the top instead of the old page's scroll position.
        key={page}
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
        className={jobs.isPlaceholderData ? "opacity-50" : undefined}
        contentContainerClassName="pb-3"
      />
    );
  }
  if (jobs.isError && !jobs.isFetching) {
    return (
      <MessageView
        message="Couldn't load jobs. Check your connection and try again."
        actionLabel="Try again"
        onAction={() => jobs.refetch()}
      />
    );
  }
  return <LoadingView />;
}
