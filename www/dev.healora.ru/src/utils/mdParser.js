export function parseInline(text) {
  const segments = [];
  const re = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0, match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex)
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    if (match[2]) segments.push({ type: 'bold', content: match[2] });
    else if (match[3]) segments.push({ type: 'code', content: match[3] });
    else if (match[4]) segments.push({ type: 'link', content: match[4], href: match[5] });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) segments.push({ type: 'text', content: text.slice(lastIndex) });
  return segments.length ? segments : [{ type: 'text', content: text }];
}

export function parseMd(raw) {
  const lines = raw.split('\n');
  const tokens = [];
  let title = 'Healora — Backlog';
  let version = '';
  let summary = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      const t = line.slice(2).trim();
      title = 'Healora — ' + (t.startsWith('Healora ') ? t.slice(8) : t);
      continue;
    }
    if (line.startsWith('> ver ')) {
      version = line.slice(2).replace(/, \d{2}:\d{2}$/, '').replace(' | ', ' · ');
      continue;
    }
    if (line.startsWith('> **')) {
      summary = parseInline(line.slice(2).replace('задач ', ''));
      continue;
    }
    if (line.startsWith('> ')) continue;

    if (line.startsWith('## ') && !line.startsWith('### ')) {
      tokens.push({ type: 'h2', content: line.slice(3) });
      continue;
    }
    if (line.startsWith('### ')) {
      tokens.push({ type: 'h3', content: line.slice(4) });
      continue;
    }
    if (line.trim() === '---') { tokens.push({ type: 'hr' }); continue; }

    const checked = line.match(/^\s*-\s+\[x\]\s+(.*)/i);
    const unchecked = line.match(/^\s*-\s+\[\s*\]\s+(.*)/);
    if (checked) { tokens.push({ type: 'li', checked: true, content: checked[1] }); continue; }
    if (unchecked) { tokens.push({ type: 'li', checked: false, content: unchecked[1] }); continue; }

    const listMatch = line.match(/^\s*-\s+(.*)/);
    if (listMatch) { tokens.push({ type: 'li', checked: null, content: listMatch[1] }); continue; }

    const italicMatch = line.match(/^\*(.+)\*$/);
    if (italicMatch) { tokens.push({ type: 'footer', content: italicMatch[1] }); continue; }
  }

  return { header: { title, version, summary: summary || [{ type: 'text', content: '' }] }, tokens };
}
