import StatusHeader from "../components/status/header/StatusHeader";
import StatusItem from "../components/status/list/StatusItem";
import StatusList from "../components/status/list/StatusList";
import DbStatus from "../components/status/dbStatus/dbStatus";

export default function StatusPage() {
  return (
    <main className="max-w-3xl mx-auto py-8">
      <StatusHeader
        title="About This Site"
        description="Welcome to our status page. Any interruptions to regular service will be posted here. If you need help, please contact us at support@example.com."
      />
      <StatusList>
        <StatusItem>
          <DbStatus />
        </StatusItem>
      </StatusList>
    </main>
  );
}
