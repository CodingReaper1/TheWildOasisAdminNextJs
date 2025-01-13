import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import Spinner from "../../_components/Spinner";
import TodayItem from "./TodayItem";
import { getStaysTodayActivity } from "@/app/_lib/reservationActions";

async function TodayActivity() {
  const activities = await getStaysTodayActivity();

  return (
    <div className="col-span-4 col-start-1 min-h-[34rem] w-full overflow-x-auto rounded-[7px] border border-gray-100 bg-white p-[3.2rem] dark:border-gray-800 dark:bg-gray-0 xl:col-span-2">
      <div className="flex min-w-[40rem] flex-col gap-[2.4rem]">
        <Row type="horizontal">
          <Heading as="h2">Today</Heading>
        </Row>

        {activities ? (
          activities.length > 0 ? (
            <ul
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="overflow-scroll overflow-x-hidden"
            >
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </ul>
          ) : (
            <p className="mt-[0.8rem] text-center text-[1.8rem] font-medium">
              No activity today...
            </p>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default TodayActivity;
