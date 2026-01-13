"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const convexUser = useQuery(api.users.current);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for Clerk to load
    if (!isLoaded) return;

    // If not signed in, we generally rely on Clerk middleware protecting specific routes, 
    // or let them view public pages. But if they ARE signed in...
    if (isSignedIn) {
        // If user is loaded from Convex
        if (convexUser !== undefined && convexUser !== null) {
            // Case 1: Trying to access onboarding pages but already done
            if (pathname?.startsWith("/onboarding")) {
                if (convexUser.onboardingCompleted === true) {
                    router.push("/");
                }
                return;
            }

            // Case 2: Not on onboarding pages, but onboarding NOT done
            if (convexUser.onboardingCompleted === false) {
                router.push("/onboarding");
            }
        }
    }
  }, [isLoaded, isSignedIn, convexUser, pathname, router]);

  return <>{children}</>;
}
