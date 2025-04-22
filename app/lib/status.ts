import { prisma } from "./prisma";

type StatusType = "Operational" | "Outage" | "Degraded";

export default async function getDBStatus(): Promise<{
  status: StatusType;
  message: string;
  error?: unknown;
}> {
  try {
    const status = (await prisma.$runCommandRaw({
      serverStatus: 1,
    })) as unknown as { ok: number };

    return {
      status: status.ok === 1 ? "Operational" : "Outage",
      message:
        status.ok === 1
          ? "Server is operational"
          : "Server is not responding properly",
    };
  } catch (error) {
    return {
      status: "Outage",
      message: "Server is not responding properly",
      error: error,
    };
  }
}
