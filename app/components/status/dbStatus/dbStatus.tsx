import getDBStatus from "@/app/lib/status";
import StatusCard from "@/app/components/status/status-card";

export default async function DbStatus() {
  const status = await getDBStatus();
  return (
    <>
      <StatusCard title="DB Status" status={status.status} />
    </>
  );
}
