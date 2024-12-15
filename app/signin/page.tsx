"use client"
import SignIn from '@/components/ui/SignIn'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (session!==null) {
        router.push("/v1/discover");
      }
    }, []);
  return (
    <div>
    <SignIn/>
    </div>
  )
}

export default Page