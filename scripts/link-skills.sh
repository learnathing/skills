#!/usr/bin/env bash
set -euo pipefail

# Local maintainer tool. Requires Node.js 22; scope and safety are documented in .agents/local-linking.md.
exec node "$(cd "$(dirname "$0")" && pwd)/link-skills.mjs" "$@"
