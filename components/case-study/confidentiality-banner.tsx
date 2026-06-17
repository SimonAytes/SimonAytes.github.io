import { ShieldCheck } from 'lucide-react';

export function ConfidentialityBanner() {
  return (
    <aside
      role="note"
      className="flex gap-3 rounded-xl border border-hairline bg-surface px-5 py-4"
    >
      <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-dim">
        This case study is based on proprietary or confidential work. Figures, names, and
        identifying details have been anonymized or scrubbed; the results shown are representative
        of the project&rsquo;s real scope and impact without disclosing confidential information.
      </p>
    </aside>
  );
}
