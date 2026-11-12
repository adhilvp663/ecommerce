import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="font-label-md text-label-md uppercase tracking-[0.24em] text-tertiary">
        Archive error · 404
      </p>
      <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-on-surface">
        Out of
        <br />
        <span className="text-on-surface-variant">allocation.</span>
      </h1>
      <p className="mt-6 max-w-md font-body-md text-body-md text-on-surface-variant">
        This silhouette has either been retired into the private archive or
        never existed. Return to the current release to continue.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/catalog"
          className="bg-on-surface px-6 py-3.5 font-label-md text-[10px] uppercase tracking-[0.16em] text-background transition-colors hover:bg-tertiary hover:text-on-tertiary"
        >
          Browse the archive
        </Link>
        <Link
          href="/"
          className="border border-outline-variant/60 px-6 py-3.5 font-label-md text-[10px] uppercase tracking-[0.16em] text-on-surface transition-colors hover:border-on-surface"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
