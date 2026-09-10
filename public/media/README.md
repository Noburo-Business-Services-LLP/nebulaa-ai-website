# Asset drop folder

Drop a file here using the exact filename from a slot in `lib/mediaSlots.ts`
and it appears everywhere that slot is used — no code change needed.

Run `npm run media:scan` afterwards (or just build; it runs automatically).
Until a file exists, the slot renders a labelled placeholder with its spec,
so nothing ships as a blank box.

Every slot, what it needs and where it appears is listed at /admin → Media.
