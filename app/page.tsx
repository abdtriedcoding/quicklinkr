import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
