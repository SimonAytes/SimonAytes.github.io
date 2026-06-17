export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-brand">
      {children}
    </h2>
  );
}
