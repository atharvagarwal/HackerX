import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"

async function ServerSession() {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    return session;
  }

export default ServerSession;