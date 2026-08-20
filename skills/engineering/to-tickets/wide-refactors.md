# Wide refactor exception

Use this only when one required mechanical change fans across the codebase and no bounded vertical slice can land green.

1. **Expand**: add the new form beside the old while preserving behaviour.
2. **Migrate**: move callers in batches with an explicit blast-radius boundary. Each batch is independently verifiable and blocked by expand.
3. **Contract**: remove the old form only after every migration is complete and a repository search shows no remaining caller.

If a migration batch cannot stay green alone, use a temporary integration branch and make all batches block one integrate-and-verify ticket. State exactly where green is expected. A hypothetical future refactor does not qualify for this exception.
