"""Record explicitly automated empty commits without changing portfolio files."""

import datetime
import os
import secrets
import subprocess
from zoneinfo import ZoneInfo


def git(*args):
    return subprocess.check_output(["git", *args], text=True).strip()


def main():
    if os.environ.get("GITHUB_ACTIONS") != "true":
        raise SystemExit("Run this script through its GitHub Actions workflow.")
    if os.environ.get("GITHUB_REPOSITORY") != "ClydeQue/personal-portfolio":
        raise SystemExit("Unexpected repository.")
    if git("status", "--porcelain"):
        raise SystemExit("Refusing to commit with modified files.")

    git("fetch", "origin", "main")
    git("merge", "--ff-only", "origin/main")
    if git("rev-parse", "HEAD") != git("rev-parse", "origin/main"):
        raise SystemExit("Local branch contains unpublished changes.")

    today = datetime.datetime.now(ZoneInfo("Asia/Manila")).date().isoformat()
    marker = f"Automated-Activity-Day: {today}"
    if git("log", "--fixed-strings", f"--grep={marker}", "-1", "--format=%H"):
        print(f"Already recorded automated activity for {today}; no changes.")
        return

    count = 10 + secrets.randbelow(6)
    git("config", "user.name", "Clydefois")
    git("config", "user.email", "kennethque101@gmail.com")
    original_tree = git("rev-parse", "HEAD^{tree}")
    for index in range(1, count + 1):
        git(
            "commit", "--allow-empty",
            "-m", f"chore: automated activity {today} ({index}/{count})",
            "-m", f"Scheduled automation only; no source changes or manual work claimed.\n\n{marker}",
        )

    if git("rev-parse", "HEAD^{tree}") != original_tree:
        raise SystemExit("Unexpected file changes; refusing to push.")
    # A concurrent remote update rejects this normal push. Never force or backdate.
    git("push", "origin", "HEAD:main")
    summary = f"Recorded {count} explicitly automated empty commits for {today}. Portfolio files unchanged.\n"
    print(summary)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as output:
            output.write(summary)


if __name__ == "__main__":
    main()
