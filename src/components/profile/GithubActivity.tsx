"use client";

import React from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () =>
    import("react-github-calendar").then((mod) => ({
      default: mod.GitHubCalendar,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[130px] rounded-2xl bg-muted animate-pulse" />
    ),
  },
);

interface GithubActivityProps {
  username: string;
}

export function GithubActivity({ username }: GithubActivityProps) {
  return (
    <section className="mt-8">
      {/* Card */}
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold mt-1">My Github Contributions</p>
        <div className="github-calendar flex justify-center overflow-x-auto scrollbar-hide">
          <GitHubCalendar
            username={username}
            colorScheme="light"
            showColorLegend={false}
            showTotalCount={false}
            blockSize={9}
            blockMargin={3}
            fontSize={11}
            blockRadius={3}
            theme={{
              light: ["#ECEFF1", "#B7F0CF", "#67DE9C", "#16C86A", "#00994D"],
            }}
            renderBlock={(block) =>
              React.cloneElement(block, {
                rx: 3,
                ry: 3,
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
