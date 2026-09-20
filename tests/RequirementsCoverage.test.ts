import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const requirementsPath = join(repoRoot, 'REQUIREMENTS.md');

interface Mapping {
    id: string;
    short: string;
    file: string | null;
    testSubstring: string | null;
}

function parseTraceability(content: string): Mapping[] {
    const mappings: Mapping[] = [];
    for (const line of content.split('\n')) {
        if (!/^\|\s*R-\d+\s*\|/.test(line)) continue;
        const cols = line.split('|').map(c => c.trim());
        // cols[0]='', cols[1]=ID, cols[2]=Kurzbeschreibung, cols[3]=Test-Datei, cols[4]=Test-Name-Teilstring
        const id = cols[1];
        const short = cols[2];
        const file = cols[3];
        const testSubstring = cols[4];
        if (!id || !/^R-\d+$/.test(id)) continue;
        if (!short || !file || !testSubstring) continue;
        if (file === '—' || testSubstring === '—') {
            mappings.push({ id, short, file: null, testSubstring: null });
        } else {
            mappings.push({ id, short, file, testSubstring });
        }
    }
    return mappings;
}

describe('Requirements Coverage (Traceability REQUIREMENTS.md)', () => {
    const content = readFileSync(requirementsPath, 'utf8');
    const mappings = parseTraceability(content);
    const uniqueIds = [...new Set(mappings.map(m => m.id))];
    const gaps = uniqueIds.filter(id => mappings.filter(m => m.id === id).every(m => m.file === null));

    it('REQUIREMENTS.md exists and contains a traceability table', () => {
        expect(existsSync(requirementsPath), `REQUIREMENTS.md fehlt unter ${requirementsPath}`).toBe(true);
        expect(mappings.length, 'Keine Traceability-Zeilen (R-IDs) in REQUIREMENTS.md gefunden').toBeGreaterThan(0);
    });

    it('documents at least 40 requirements', () => {
        expect(
            uniqueIds.length,
            `Nur ${uniqueIds.length} Requirements gefunden (mind. 40 erwartet)`
        ).toBeGreaterThanOrEqual(40);
    });

    it('all requirement IDs are unique in the requirement sections', () => {
        const idDefinitions = content.match(/^- \*\*R-\d+\*\*/gm) || [];
        const ids = idDefinitions.map(d => d.replace(/[^R0-9]/g, ''));
        const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
        expect(
            duplicates,
            `Doppelte Anforderungs-IDs: ${[...new Set(duplicates)].join(', ')}`
        ).toHaveLength(0);
        expect(
            new Set(ids).size,
            `Anforderungs-Abschnitte (${ids.length}) und eindeutige IDs (${new Set(ids).size}) weichen ab`
        ).toBe(ids.length);
    });

    it('every mapped test file exists', () => {
        const missing = mappings
            .filter(m => m.file !== null)
            .filter(m => !existsSync(join(repoRoot, m.file!)));
        expect(
            missing.map(m => `${m.id}: ${m.file}`),
            'Folgende Mapping-Test-Dateien existieren nicht'
        ).toHaveLength(0);
    });

    it('every mapped test-name substring is found in its test file', () => {
        const failures: string[] = [];
        for (const m of mappings) {
            if (m.file === null || m.testSubstring === null) continue;
            let fileContent: string;
            try {
                fileContent = readFileSync(join(repoRoot, m.file), 'utf8');
            } catch {
                failures.push(`${m.id}: Datei ${m.file} nicht lesbar`);
                continue;
            }
            const needle = m.testSubstring.toLowerCase();
            if (!fileContent.toLowerCase().includes(needle)) {
                failures.push(
                    `${m.id} ("${m.short}"): Teilstring "${m.testSubstring}" nicht in ${m.file} gefunden`
                );
            }
        }
        expect(
            failures,
            `Traceability gebrochen:\n${failures.join('\n')}`
        ).toHaveLength(0);
    });

    it('has at most 8 documented gaps', () => {
        expect(
            gaps.length,
            `Zu viele dokumentierte Lücken (${gaps.length}): ${gaps.join(', ')}`
        ).toBeLessThanOrEqual(8);
    });

    it('every requirement ID in the table has at least one mapping row', () => {
        const sectionIds = (content.match(/^- \*\*(R-\d+)\*\*/gm) || [])
            .map(d => (d.match(/R-\d+/) || [''])[0])
            .filter(Boolean);
        const tableIds = new Set(uniqueIds);
        const unmapped = sectionIds.filter(id => !tableIds.has(id));
        expect(
            unmapped,
            `Folgende Requirements haben keine Mapping-Zeile in der Traceability-Tabelle: ${unmapped.join(', ')}`
        ).toHaveLength(0);
    });
});
