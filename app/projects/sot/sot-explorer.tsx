'use client';

import { useEffect, useMemo, useState } from 'react';

type Entry = {
  question_id: string;
  question: string;
  task_type: string;
  paradigm_id: string;
  paradigm_label: string;
  family: string;
  output: string;
  num_tokens: number;
  latency_ms: number;
};

const TASK_ORDER = ['Science', 'Math', 'Commonsense', 'Medical'];

const PARADIGM_DESCRIPTIONS: Record<string, string> = {
  'conceptual-chaining': 'Sketches reasoning as a linear sequence of anchored concepts and causal links.',
  'chunked-symbolism': 'Condenses inference into symbolic chunks that capture the core cognitive steps.',
  'expert-lexicons': 'Uses domain-specific lexicons to express expert heuristics in terse shorthand.',
  'chain-of-thought': 'Traditional Chain-of-Thought reasoning.',
};

function parseSketchOutput(raw: string) {
  const match = raw.match(/<think>([\s\S]*?)(<\/think>|$)/i);
  let reasoning = '';
  let answer = '';
  if (match) {
    reasoning = match[1].trim();
    const trailing = raw.slice((match.index ?? 0) + match[0].length).trim();
    const answerMatch = trailing.match(/Answer\s*[:=]\s*(.*)/i);
    if (answerMatch) answer = answerMatch[1].trim();
  }
  return { reasoning, answer };
}

function formatTokens(entry: Entry | null, baseline: Entry | null) {
  if (!entry) {
    return {
      headline: '—',
      detail: '— tokens',
      width: '0%',
      footnote: 'Select a paradigm to compare against the Chain-of-Thought baseline.',
    };
  }
  if (entry.family === 'CoT') {
    return {
      headline: 'Baseline reference',
      detail: `${entry.num_tokens} tokens`,
      width: '100%',
      footnote: 'Chain-of-Thought acts as the baseline comparison.',
    };
  }
  const baselineTokens = baseline?.num_tokens ?? null;
  if (!baselineTokens) {
    return {
      headline: `${entry.num_tokens} tokens`,
      detail: `${entry.num_tokens} tokens`,
      width: '100%',
      footnote: 'No baseline recorded for this prompt.',
    };
  }
  const savings = ((baselineTokens - entry.num_tokens) / baselineTokens) * 100;
  const clipped = Math.round(savings);
  const width = Math.min(100, Math.max(14, (entry.num_tokens / baselineTokens) * 100));
  return {
    headline: clipped >= 0 ? `${clipped}% fewer tokens` : `${Math.abs(clipped)}% more tokens`,
    detail: `${entry.num_tokens} tokens (baseline ${baselineTokens})`,
    width: `${width}%`,
    footnote: `Baseline = Chain-of-Thought (${baselineTokens} tokens). Token delta reflects cached outputs.`,
  };
}

function formatLatency(entry: Entry | null, baseline: Entry | null) {
  if (!entry) {
    return { headline: '—', detail: '— ms', footnote: 'Estimated rate at a decoding speed of 35 tkn/s.' };
  }
  if (entry.family === 'CoT') {
    return {
      headline: 'Baseline reference',
      detail: `${entry.latency_ms} ms`,
      footnote: 'Chain-of-Thought acts as the baseline comparison.',
    };
  }
  if (!baseline) {
    return {
      headline: `${entry.latency_ms} ms`,
      detail: `${entry.latency_ms} ms`,
      footnote: 'Estimated rate at a decoding speed of 35 tkn/s.',
    };
  }
  const delta = entry.latency_ms - baseline.latency_ms;
  const sign = delta <= 0 ? 'faster' : 'slower';
  return {
    headline: delta === 0 ? 'Matches baseline latency' : `${Math.abs(Math.round(delta))} ms ${sign} than CoT`,
    detail: `${entry.latency_ms} ms (baseline ${baseline.latency_ms} ms)`,
    footnote: 'Estimated rate at a decoding speed of 35 tkn/s.',
  };
}

export function SotExplorer() {
  const [payload, setPayload] = useState<Entry[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [activeParadigmId, setActiveParadigmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/files/projects/sot/sot-examples.json')
      .then((r) => r.json())
      .then((data: Entry[]) => setPayload(data))
      .catch((err) => setLoadError(String(err)));
  }, []);

  const { groupedByQuestion, questionsByTask, tasks } = useMemo(() => {
    const groupedByQuestion = new Map<string, Entry[]>();
    const questionsByTask = new Map<string, string[]>();

    for (const item of payload) {
      if (!groupedByQuestion.has(item.question_id)) groupedByQuestion.set(item.question_id, []);
      groupedByQuestion.get(item.question_id)!.push(item);

      const list = questionsByTask.get(item.task_type) ?? [];
      if (!list.includes(item.question_id)) list.push(item.question_id);
      questionsByTask.set(item.task_type, list);
    }

    const tasks = Array.from(questionsByTask.keys()).sort((a, b) => {
      const ai = TASK_ORDER.indexOf(a);
      const bi = TASK_ORDER.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });

    return { groupedByQuestion, questionsByTask, tasks };
  }, [payload]);

  useEffect(() => {
    if (tasks.length > 0 && !activeTask) setActiveTask(tasks[0]);
  }, [tasks, activeTask]);

  const activeQuestionId = useMemo(() => {
    if (!activeTask) return null;
    return (questionsByTask.get(activeTask) ?? [])[0] ?? null;
  }, [activeTask, questionsByTask]);

  const paradigmEntries = useMemo(() => {
    if (!activeQuestionId) return [];
    const FAMILY_PRIORITY: Record<string, number> = { CoT: 0, SoT: 1 };
    return [...(groupedByQuestion.get(activeQuestionId) ?? [])].sort((a, b) => {
      const fd = (FAMILY_PRIORITY[a.family] ?? 99) - (FAMILY_PRIORITY[b.family] ?? 99);
      return fd !== 0 ? fd : a.paradigm_label.localeCompare(b.paradigm_label);
    });
  }, [activeQuestionId, groupedByQuestion]);

  // When the question changes (task switch), keep paradigm if it exists, else default to first
  useEffect(() => {
    if (!paradigmEntries.length) return;
    const exists = paradigmEntries.some((e) => e.paradigm_id === activeParadigmId);
    if (!exists) setActiveParadigmId(paradigmEntries[0].paradigm_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paradigmEntries]);

  const selected = useMemo(
    () => paradigmEntries.find((e) => e.paradigm_id === activeParadigmId) ?? paradigmEntries[0] ?? null,
    [paradigmEntries, activeParadigmId],
  );

  const baseline = useMemo(
    () => paradigmEntries.find((e) => e.family === 'CoT') ?? null,
    [paradigmEntries],
  );

  const { reasoning, answer } = selected ? parseSketchOutput(selected.output ?? '') : { reasoning: '', answer: '' };
  const tokenData = formatTokens(selected, baseline);
  const latencyData = formatLatency(selected, baseline);
  const paradigmDescription =
    (selected && PARADIGM_DESCRIPTIONS[selected.paradigm_id]) ||
    'Pick a reasoning mode to see how the sketch operates.';
  const questionText = loadError
    ? 'Unable to load cached examples.'
    : (selected?.question ?? 'Select a task to explore.');
  const badges = selected
    ? [selected.task_type, selected.paradigm_label, selected.family]
    : ['—'];

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
      {/* Controls */}
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 rounded-xl border border-hairline bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-brand">
              Task Type
            </span>
            <span className="text-xs text-dim">Choose a reasoning domain</span>
          </div>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Reasoning tasks">
            {tasks.map((task) => (
              <button
                key={task}
                type="button"
                onClick={() => setActiveTask(task)}
                className={`rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  activeTask === task
                    ? 'border-brand bg-brand text-bg'
                    : 'border-hairline bg-transparent text-dim hover:border-brand hover:text-text'
                }`}
              >
                {task}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-hairline bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-brand">
              Reasoning Modes
            </span>
            <span className="text-xs text-dim">SoT paradigms vs. CoT baseline</span>
          </div>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Reasoning paradigms">
            {paradigmEntries.map((entry) => (
              <button
                key={entry.paradigm_id}
                type="button"
                onClick={() => setActiveParadigmId(entry.paradigm_id)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 transition-colors ${
                  selected?.paradigm_id === entry.paradigm_id
                    ? 'border-brand bg-brand text-bg'
                    : 'border-hairline bg-transparent text-dim hover:border-brand hover:text-text'
                }`}
              >
                <span className="text-[13px] font-semibold">{entry.paradigm_label}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-75">
                  {entry.family}
                </span>
              </button>
            ))}
          </div>
          <p className="max-w-[26rem] text-sm leading-relaxed text-dim">{paradigmDescription}</p>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-xl border border-hairline bg-surface p-6">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-dim">
              Token Usage
            </span>
            <span className="text-[1.75rem] font-semibold text-text">{tokenData.headline}</span>
            <div>
              <div className="flex justify-between text-sm text-dim">
                <span>Current output</span>
                <span>{tokenData.detail}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-text/[0.08]">
                <div
                  className="h-full bg-brand transition-[width] duration-300"
                  style={{ width: tokenData.width }}
                />
              </div>
            </div>
            <p className="text-xs leading-snug text-dim/75">{tokenData.footnote}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-hairline bg-surface p-6">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-dim">
              Latency
            </span>
            <span className="text-[1.75rem] font-semibold text-text">{latencyData.headline}</span>
            <div className="flex justify-between text-sm text-dim">
              <span>Measured latency</span>
              <span>{latencyData.detail}</span>
            </div>
            <p className="text-xs leading-snug text-dim/75">{latencyData.footnote}</p>
          </div>
        </div>
      </div>

      {/* Output */}
      <article className="flex min-h-[35rem] flex-col gap-7 rounded-xl border border-hairline bg-surface p-10">
        <div className="flex flex-wrap items-center gap-3">
          {badges.map((label, i) => (
            <span
              key={i}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-dim"
            >
              {label}
            </span>
          ))}
        </div>
        <h2 className="font-serif text-[1.875rem] font-medium leading-snug text-text">
          {questionText}
        </h2>
        <div className="flex min-h-[13.75rem] flex-col gap-3 rounded-lg border border-hairline bg-text/[0.04] p-5">
          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dim">
            Reasoning Trace
          </span>
          <pre
            className={`m-0 whitespace-pre-wrap font-mono text-[0.9375rem] leading-relaxed text-text transition-opacity ${
              reasoning ? 'opacity-90' : 'opacity-50'
            }`}
          >
            {reasoning || 'No <think> section captured yet.'}
          </pre>
        </div>
        <div className="flex min-h-[5.5rem] flex-col gap-3">
          <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dim">
            Final Answer
          </span>
          <p className="text-xl font-medium text-text">{answer || '—'}</p>
        </div>
      </article>
    </div>
  );
}
