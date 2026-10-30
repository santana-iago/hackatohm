export type RoleId = "manager" | "specialist";
export type EvidenceState =
  | "missing"
  | "received"
  | "reviewing"
  | "verified"
  | "rejected";
export type InformationState =
  | "detected"
  | "declared"
  | "confirmed"
  | "contested";
export type RuleDecision = "unknown" | "accepted" | "rejected";
export type EvaluationStatus =
  | "not_calculated"
  | "current"
  | "stale"
  | "no_confirmed_team";
export type SceneId =
  | "overview"
  | "base-viva"
  | "criteria-review"
  | "team-comparison"
  | "availability"
  | "recovery-start"
  | "recovery-received"
  | "recovery-verified"
  | "recovery-one"
  | "recovery-complete"
  | "dossier-review"
  | "dossier-approved"
  | "discovery"
  | "connect"
  | "recognition"
  | "second-rejected"
  | "duplicate-proof"
  | "expired-credential"
  | "availability-unknown"
  | "tender-amended"
  | "export-blocked"
  | "connect-external";
export interface Actor {
  id: string;
  name: string;
  role: "bids" | "hr" | "pmo" | "collaborator";
  personId?: string;
  label: string;
}
export interface Person {
  id: string;
  name: string;
  initials: string;
  area: string;
  competencies: string[];
  profileVersion: number;
  updateStatus: "pending" | "confirmed" | "verified";
  lastReview: string;
  external?: boolean;
}
export interface Evidence {
  id: string;
  personId: string;
  title: string;
  filename: string;
  kind: "pmp" | "postgraduate" | "security" | "project" | "cloud";
  roleId?: RoleId;
  unitId: string;
  project?: string;
  information: InformationState;
  document: EvidenceState;
  validity: "valid" | "expired" | "na" | "unknown";
  validUntil?: string;
  exportAllowed: boolean;
  version: number;
  ruleId?: string;
  documentFixtureId: string;
  verifiedBy?: string;
  verifiedAt?: string;
  reason?: string;
}
export interface Rule {
  id: string;
  roleId: RoleId | "team";
  title: string;
  description: string;
  points: number;
  cap: number;
  mandatory: boolean;
  page: number;
  clause: string;
  reviewed: boolean;
}
export interface Acceptance {
  evidenceId: string;
  personId: string;
  roleId: RoleId;
  ruleId: string;
  ruleVersion: string;
  decision: RuleDecision;
  reviewerId: string;
  decidedAt: string;
  reason: string;
}
export interface ScoreComponent {
  ruleId: string;
  personId: string;
  roleId: RoleId;
  points: number;
  unitIds: string[];
  evidenceIds: string[];
}
export interface TeamResult {
  inputRevision: number;
  ruleVersion: string;
  status: EvaluationStatus;
  managerId: string | null;
  specialistId: string | null;
  score: number | null;
  components: ScoreComponent[];
  blockers: string[];
  mode: "simulated";
}
export interface EvaluationSnapshot {
  inputRevision: number;
  ruleVersion: string;
  status: EvaluationStatus;
  teams: TeamResult[];
  blocked: TeamResult[];
  selected: TeamResult | null;
  lastScore: number | null;
  history: TeamResult[];
}
export interface Availability {
  personId: string;
  capacity: number | null;
  confirmed: boolean;
  revision: number;
  from: string;
  to: string;
  validUntil: string;
  confirmedAt: string;
  responsible: string;
}
export interface RecoveryTask {
  id: string;
  evidenceId: string;
  projectId: string;
  title: string;
  personId: string;
  responsible: string;
  deadline: string;
  status:
    | "open"
    | "requested"
    | "received"
    | "verified"
    | "accepted"
    | "rejected";
}
export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  object: string;
  at: string;
  version: string;
}
export interface RecognitionEntry {
  id: string;
  eventKey: string;
  personId: string;
  kind: string;
  points: number;
  at: string;
  description: string;
}
export interface Campaign {
  id: string;
  title: string;
  personId: string;
  status: "open" | "declared" | "received" | "verified";
}
export interface Referral {
  id: string;
  fromPersonId: string;
  personId: string;
  status: "pending" | "accepted" | "received" | "validated";
  external?: boolean;
}
export interface DossierSnapshot {
  id: string;
  version: number;
  scope: "KEY_TEAM";
  mode: "simulated";
  inputRevision: number;
  ruleVersion: string;
  universeVersion: string;
  score: number;
  managerId: string;
  specialistId: string;
  team: { manager: string; specialist: string };
  window: string;
  approvedAt: string | null;
  approvers: string[];
  components: ScoreComponent[];
  evidence: {
    id: string;
    title: string;
    filename: string;
    person: string;
    version: number;
    unitId: string;
    exportAllowed: boolean;
  }[];
  texts: { scope: string; managerCv: string; specialistCv: string };
  pmoKey: string;
}
export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  status: boolean;
  reason: string;
}
export interface PotentialResult {
  currentScore: number | null;
  potentialScore: number | null;
  remainingGain: number | null;
  assumptions: string[];
  status: string;
}
export interface DemoState {
  schemaVersion: 1;
  demo: {
    sceneId: SceneId;
    actorId: string;
    route: string;
    inspector: {
      type: "evidence" | "person" | "availability";
      id: string;
    } | null;
    clockMinutes: number;
    capture: boolean;
    motion: "normal" | "reduced";
  };
  actors: Record<string, Actor>;
  people: Record<string, Person>;
  claims: Record<string, string>;
  evidence: Record<string, Evidence>;
  acceptances: Acceptance[];
  rules: Rule[];
  tender: {
    id: string;
    version: string;
    ruleVersion: string;
    universeVersion: string;
    rulesApproved: boolean;
    initialEvidenceAccepted: boolean;
    amended: boolean;
  };
  availability: Record<string, Availability>;
  availabilityRevision: number;
  inputRevision: number;
  selectedTeam: { managerId: string; specialistId: string };
  pmo: {
    key: string;
    availabilityRevision: number;
    by: string;
    at: string;
  } | null;
  recoveryTasks: Record<string, RecoveryTask>;
  evaluation: EvaluationSnapshot;
  dossier: {
    preview: DossierSnapshot | null;
    approved: DossierSnapshot | null;
    history: DossierSnapshot[];
    reviewed: boolean;
    exports: { snapshotId: string; filename: string; at: string }[];
  };
  campaigns: Record<string, Campaign>;
  referrals: Record<string, Referral>;
  engagement: RecognitionEntry[];
  audit: AuditEvent[];
  appliedCommandIds: string[];
  message: string;
  error: boolean;
}
export type DemoCommand =
  | { type: "CONFIRM_PROFILE_UPDATE"; personId: string }
  | { type: "VERIFY_PROFILE_UPDATE"; personId: string }
  | { type: "REVIEW_RULE"; ruleId: string; decision: boolean }
  | { type: "APPROVE_RULES"; ruleVersion: string }
  | {
      type: "ACCEPT_INITIAL_EVIDENCE";
      ruleVersion: string;
      evidenceIds: string[];
    }
  | { type: "EVALUATE_TEAMS" }
  | { type: "SELECT_TEAM"; managerId: string; specialistId: string }
  | { type: "CONFIRM_TEAM_PMO"; key?: string; availabilityRevision?: number }
  | { type: "REQUEST_PROOF"; taskId: string }
  | { type: "RECEIVE_EVIDENCE"; evidenceId: string; documentFixtureId: string }
  | {
      type: "VERIFY_EVIDENCE";
      evidenceId: string;
      result: boolean;
      reason: string;
    }
  | {
      type: "ACCEPT_EVIDENCE_FOR_RULE";
      evidenceId: string;
      ruleId: string;
      ruleVersion: string;
    }
  | {
      type: "REJECT_EVIDENCE_FOR_RULE";
      evidenceId: string;
      ruleId: string;
      reason: string;
    }
  | { type: "PREPARE_DOSSIER" }
  | { type: "REVIEW_DOSSIER" }
  | { type: "APPROVE_DOSSIER"; version: number }
  | { type: "RECORD_DOSSIER_EXPORT"; snapshotId: string; filename: string }
  | {
      type: "RESPOND_TO_CAMPAIGN";
      campaignId: string;
      personId: string;
      documentFixtureId?: string;
    }
  | { type: "ACCEPT_REFERRAL"; referralId: string; personId: string }
  | { type: "VALIDATE_REFERRAL"; referralId: string }
  | { type: "ACCEPT_EXTERNAL_INVITE"; inviteId: string }
  | {
      type: "VALIDATE_CONTRIBUTION";
      eventKey: string;
      personId: string;
      kind: string;
    }
  | {
      type: "SET_AVAILABILITY";
      personId: string;
      capacity: number | null;
      confirmed: boolean;
    }
  | { type: "AMEND_TENDER" }
  | { type: "SET_EXPORT_PERMISSION"; evidenceId: string; allowed: boolean };
export interface CommandEnvelope {
  commandId: string;
  actorId: string;
  command: DemoCommand;
}
export interface DemoApi {
  loadScene: (scene: SceneId) => Promise<void>;
  reset: () => Promise<void>;
  setCaptureMode: (enabled: boolean) => void;
  setMotion: (mode: "normal" | "reduced") => void;
  waitUntilIdle: () => Promise<void>;
  getSceneState: () => {
    sceneId: string;
    busy: boolean;
    evaluationStatus: string;
    currentScore: number | null;
    lastScore: number | null;
    potentialScore: number | null;
    ruleVersion: string;
    dossierStatus: string;
  };
}
declare global {
  interface Window {
    aptusDemo: DemoApi;
  }
}
