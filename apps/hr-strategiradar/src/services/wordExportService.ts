import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Packer,
} from 'docx'
import type { HrMicroproject, AiUseTask, Scenario } from '../domain/schemas'
import type { DecisionLogText } from '../store/store'
import { ROLE_LABELS, STOP_RULES_MAP } from './mockDiagnosisService'

const BORDER = {
  top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
}

function heading(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]) {
  return new Paragraph({ text, heading: level, spacing: { before: 300, after: 100 } })
}

function para(text: string, bold = false) {
  return new Paragraph({
    children: [new TextRun({ text, bold, size: 22 })],
    spacing: { before: 60, after: 60 },
  })
}

function labelValue(label: string, value: string) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22 }),
      new TextRun({ text: value || 'Ikke utfylt', size: 22, color: value ? '000000' : '888888' }),
    ],
    spacing: { before: 80, after: 40 },
  })
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' } },
    spacing: { before: 160, after: 160 },
    children: [],
  })
}

export async function generateWordDocument(
  project: HrMicroproject,
  task: AiUseTask,
  log: DecisionLogText,
  scenarios: Scenario[],
  makerName: string
): Promise<Blob> {
  const dateStr = new Date().toLocaleDateString('no-NO')
  const roleLabel = ROLE_LABELS[task.expectedAllowedRole] || task.expectedAllowedRole
  const trafficLightText =
    task.expectedTrafficLight === 'green' ? 'Grønt — kan jobbes videre'
    : task.expectedTrafficLight === 'red' ? 'Rødt — stopp og avklar'
    : 'Gult — noen forhold må avklares'
  const riskStopRules = (task.expectedStopRules || []).filter((sr) => sr !== 'SR-05')

  const doc = new Document({
    sections: [
      {
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({ text: 'KI-VURDERING', bold: true, size: 36, color: '1E3A5F' }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [new TextRun({ text: project.title, bold: true, size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `Dato: ${dateStr}  |  Gjennomført av: ${makerName || 'Prosjektgruppe'}`, size: 20, color: '666666' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          divider(),

          // DEL 1: ROS
          heading('DEL 1: RISIKOVURDERING (ROS — Digdir/ISO 31000)', HeadingLevel.HEADING_1),

          heading('1.1 Kontekst og formål', HeadingLevel.HEADING_2),
          labelValue('Hva KI skal hjelpe med', task.title),
          labelValue('Inndatatype', task.inputDataType),
          labelValue('Mennesket bestemmer', task.humanDecisionPoint),
          labelValue('Strategisk område', project.strategyArea),
          labelValue('Beslutningseier', project.decisionOwner),

          heading('1.2 Identifiserte risikoer', HeadingLevel.HEADING_2),
          ...(riskStopRules.length > 0
            ? riskStopRules.map((sr) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${sr}: `, bold: true, size: 22 }),
                    new TextRun({ text: STOP_RULES_MAP[sr] || sr, size: 22 }),
                  ],
                  bullet: { level: 0 },
                  spacing: { before: 40, after: 40 },
                })
              )
            : [para('Ingen risikoforhold avklart som stopper videre bruk.')]),

          heading('1.3 Risikoreduserende tiltak', HeadingLevel.HEADING_2),
          para(log.internkontrollTiltak || 'Ikke utfylt.'),

          heading('1.4 Restrisiko og konklusjon', HeadingLevel.HEADING_2),
          labelValue('Anbefalt KI-rolle', roleLabel),
          labelValue('Overordnet status', trafficLightText),
          para(log.risikovurdering || 'Ikke utfylt.'),

          divider(),

          // DEL 2: DPIA
          heading('DEL 2: PERSONVERNKONSEKVENSVURDERING (DPIA — GDPR art. 35)', HeadingLevel.HEADING_1),

          heading('2.1 Prosjektbeskrivelse', HeadingLevel.HEADING_2),
          para(project.strategicGoal),

          heading('2.2 Formål med behandlingen', HeadingLevel.HEADING_2),
          labelValue('KI-oppgave', task.title),
          labelValue('Output brukes til', task.outputUse),

          heading('2.3 Behandlingsgrunnlag', HeadingLevel.HEADING_2),
          para('Behandlingsgrunnlag må avklares med juridisk kompetanse iht. GDPR art. 6 og 9.'),

          heading('2.4 Kategorier av personopplysninger', HeadingLevel.HEADING_2),
          labelValue('Datagrunnlag', task.inputDataType),
          labelValue('Direkte effekt på enkeltpersoner', task.directEffectOnPeople ? 'Ja' : 'Nei'),
          labelValue('Bruker sensitiv/personlig data', task.usesPersonalOrSensitiveData ? 'Ja' : 'Nei'),

          heading('2.5 Risikovurdering (personvern)', HeadingLevel.HEADING_2),
          ...(task.expectedRiskFlags.personalOrSensitiveData || task.expectedRiskFlags.vulnerableParty
            ? [
                para('Særlige kategorier eller sårbare parter er identifisert. Forsterket tilsyn anbefales.'),
              ]
            : [para('Ingen særlige personvernkategorier identifisert. Standardtiltak gjelder.')]),

          heading('2.6 Tiltak og konklusjon', HeadingLevel.HEADING_2),
          para(log.menneskeligKontroll || 'Ikke utfylt — dokumenter kontrollrutiner her.'),

          divider(),

          // DEL 3: KI-BESLUTNINGSNOTAT
          heading('DEL 3: KI-BESLUTNINGSNOTAT', HeadingLevel.HEADING_1),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [para('Felt', true)], borders: BORDER, width: { size: 35, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [para('Verdi', true)], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Anbefalt KI-rolle', true)], borders: BORDER }),
                  new TableCell({ children: [para(roleLabel)], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Status', true)], borders: BORDER }),
                  new TableCell({ children: [para(trafficLightText)], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Avklarte forhold', true)], borders: BORDER }),
                  new TableCell({ children: [para(riskStopRules.length > 0 ? riskStopRules.join(', ') : 'Ingen')], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Endelig vurdering', true)], borders: BORDER }),
                  new TableCell({ children: [para(log.endeligBeslutning || 'Ikke utfylt')], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Ansvarlig', true)], borders: BORDER }),
                  new TableCell({ children: [para(makerName || 'Ikke angitt')], borders: BORDER }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [para('Dato', true)], borders: BORDER }),
                  new TableCell({ children: [para(dateStr)], borders: BORDER }),
                ],
              }),
            ],
          }),

          ...(scenarios.length > 0
            ? [
                heading('Scenarier og konsekvenser', HeadingLevel.HEADING_2),
                ...scenarios.map((sc) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${sc.temaTittel} [${sc.bekymringsniva.toUpperCase()}]: `, bold: true, size: 22 }),
                      new TextRun({ text: sc.simulertHendelse, size: 22 }),
                    ],
                    bullet: { level: 0 },
                    spacing: { before: 40, after: 40 },
                  })
                ),
              ]
            : []),

          divider(),
          new Paragraph({
            children: [
              new TextRun({ text: 'Generert av KI-Radar — norsk vurderingsverktøy for KI-bruk i offentlig sektor.', size: 18, color: '999999', italics: true }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200 },
          }),
        ],
      },
    ],
  })

  const buffer = await Packer.toBlob(doc)
  return buffer
}
