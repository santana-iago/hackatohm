import type {
  CommandEnvelope,
  DemoState,
  Evidence,
  RecognitionEntry,
} from "./types";
import { evaluateDemoTeams, isEvidenceAccepted } from "./evaluate";
import {
  canExportDossier,
  createDossierSnapshot,
  demoTime,
  getCurrentScore,
  getDossierChecklist,
  getInitialEvidenceIds,
  recognitionTotal,
  snapshotDependenciesCurrent,
  teamKey,
} from "./selectors";
import { CENTRAL_PEOPLE } from "./seed";

class CommandError extends Error {}
function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new CommandError(message);
}
function invalidate(state: DemoState) {
  state.inputRevision += 1;
  if (state.evaluation.selected) {
    state.evaluation.status = "stale";
    state.evaluation.lastScore = state.evaluation.selected.score;
  }
  state.dossier.reviewed = false;
}
function addRecognition(
  state: DemoState,
  eventKey: string,
  personId: string,
  kind: string,
  points: number,
  description: string,
) {
  if (state.engagement.some((e) => e.eventKey === eventKey)) return;
  const remaining = Math.max(0, 30 - recognitionTotal(state, personId));
  const entry: RecognitionEntry = {
    id: `recognition-${state.engagement.length + 1}`,
    eventKey,
    personId,
    kind,
    points: Math.min(points, remaining),
    at: demoTime(state),
    description,
  };
  state.engagement.push(entry);
}
function awardCredential(state: DemoState, e: Evidence) {
  if (e.id === "ev-lia-sec") {
    state.campaigns["campaign-security"].status = "verified";
    state.people["p-lia"].competencies = ["Security+", "Segurança"];
    state.people["p-lia"].profileVersion = 2;
    state.people["p-lia"].lastReview = demoTime(state);
    addRecognition(
      state,
      "credential:ev-lia-sec",
      "p-lia",
      "certification",
      10,
      "Nova credencial Security+ comprovada e verificada por RH.",
    );
  }
  if (e.id === "ev-marina-cloud") {
    state.people["p-marina"].competencies = [
      "Arquitetura de soluções em nuvem",
      "Tecnologia",
    ];
    state.people["p-marina"].profileVersion = 2;
    state.people["p-marina"].lastReview = demoTime(state);
    addRecognition(
      state,
      "credential:ev-marina-cloud",
      "p-marina",
      "certification",
      10,
      "Nova credencial de nuvem comprovada e verificada por RH.",
    );
  }
}
export function applyDemoCommand(
  original: DemoState,
  envelope: CommandEnvelope,
): DemoState {
  if (original.appliedCommandIds.includes(envelope.commandId)) return original;
  const state = structuredClone(original);
  const { actorId, command } = envelope;
  const actor = state.actors[actorId];
  try {
    check(actor, "Selecione uma visão demonstrativa válida.");
    const role = (expected: "bids" | "hr" | "pmo" | "collaborator") =>
      check(
        actor.role === expected,
        `Esta ação exige a visão ${expected === "bids" ? "Licitações" : expected === "hr" ? "RH" : expected === "pmo" ? "PMO" : "Colaborador"}. Use o seletor de visão.`,
      );
    const own = (personId: string) => {
      role("collaborator");
      check(
        actor.personId === personId,
        "Esta confirmação deve ser feita pela própria pessoa na visão demonstrativa.",
      );
    };
    const evidence = (id: string) => {
      const e = state.evidence[id];
      check(e, "Documento de exemplo não encontrado.");
      return e;
    };
    let action = "";
    let object = "";
    let message = "";
    let changed = true;
    const noChange = (text: string) => {
      changed = false;
      message = text;
    };
    switch (command.type) {
      case "CONFIRM_PROFILE_UPDATE": {
        own(command.personId);
        const p = state.people[command.personId];
        check(p, "Perfil não encontrado.");
        if (p.updateStatus !== "pending") {
          noChange("A titular já confirmou esta atualização.");
          break;
        }
        p.updateStatus = "confirmed";
        action = "Titular confirmou atualização do currículo";
        object = p.name;
        message =
          "Identidade confirmada pela titular. O RH ainda precisa conferir a atualização. Nenhuma prova ou ponto foi acrescentado.";
        break;
      }
      case "VERIFY_PROFILE_UPDATE": {
        role("hr");
        const p = state.people[command.personId];
        check(p, "Perfil não encontrado.");
        if (p.updateStatus === "verified") {
          noChange("Atualização já revisada pelo RH.");
          break;
        }
        check(
          p.updateStatus === "confirmed",
          "A confirmação da titular é uma etapa separada e ainda está pendente.",
        );
        p.updateStatus = "verified";
        p.profileVersion = 2;
        p.lastReview = demoTime(state);
        if (CENTRAL_PEOPLE.includes(p.id)) invalidate(state);
        action = "RH aprovou currículo v2";
        object = p.name;
        message =
          "Currículo v2 aprovado. Perfil único preservado; Aurora e Vale do Sol continuam pendentes de atestados aceitos. A pontuação não aumentou.";
        break;
      }
      case "REVIEW_RULE": {
        role("bids");
        check(
          !state.tender.amended,
          "A retificação v2 exige nova revisão fora do roteiro principal. Restaure o cenário principal.",
        );
        check(
          !state.tender.rulesApproved,
          "A matriz já está fixada nesta versão.",
        );
        const r = state.rules.find((r) => r.id === command.ruleId);
        check(r, "Critério não encontrado.");
        if (r.reviewed === command.decision) {
          noChange("Este entendimento já está registrado.");
          break;
        }
        r.reviewed = command.decision;
        action = command.decision
          ? "Critério revisado"
          : "Revisão de critério retirada";
        object = r.id;
        message =
          r.id === "G-ENERGIA" && command.decision
            ? "Entendimento confirmado: contar projetos distintos; arquivos duplicados não são novas experiências."
            : "Revisão do critério registrada.";
        break;
      }
      case "APPROVE_RULES": {
        role("bids");
        check(
          command.ruleVersion === state.tender.ruleVersion,
          "A versão de regras mudou. Revise a matriz atual.",
        );
        if (state.tender.rulesApproved) {
          noChange("Matriz já aprovada nesta versão.");
          break;
        }
        check(
          !state.tender.amended,
          "Retificação v2 em revisão. Use Restaurar cenário principal para continuar o roteiro.",
        );
        check(
          state.rules.every((r) => r.reviewed),
          "Há critérios sem revisão, incluindo a contagem de projetos distintos.",
        );
        state.tender.rulesApproved = true;
        invalidate(state);
        action = "Matriz aprovada";
        object = command.ruleVersion;
        message =
          "Matriz aprovada. Próxima ação: conferir e aceitar as provas iniciais para esta matriz.";
        break;
      }
      case "ACCEPT_INITIAL_EVIDENCE": {
        role("bids");
        check(
          state.tender.rulesApproved,
          "Aprovar a matriz antes de aceitar correspondências documentais.",
        );
        check(
          command.ruleVersion === state.tender.ruleVersion,
          "A versão das correspondências não é a atual.",
        );
        if (state.tender.initialEvidenceAccepted) {
          noChange(
            "As correspondências iniciais já foram aceitas para esta matriz.",
          );
          break;
        }
        const expected = getInitialEvidenceIds(state);
        const ids = [...new Set(command.evidenceIds)].sort();
        check(
          ids.length === expected.length &&
            ids.every((id, i) => id === expected[i]),
          "Confira explicitamente toda a lista inicial de provas centrais. Aurora e Vale do Sol ficam fora desta lista.",
        );
        for (const id of ids) {
          const e = evidence(id);
          check(
            e.document === "verified" &&
              e.validity !== "expired" &&
              e.roleId &&
              e.ruleId,
            "Documento inicial sem verificação ou vigência válida.",
          );
          state.acceptances.push({
            evidenceId: e.id,
            personId: e.personId,
            roleId: e.roleId,
            ruleId: e.ruleId,
            ruleVersion: command.ruleVersion,
            decision: "accepted",
            reviewerId: actorId,
            decidedAt: demoTime(state),
            reason:
              "Titular, documento e correspondência da regra conferidos explicitamente na revisão inicial.",
          });
        }
        state.tender.initialEvidenceAccepted = true;
        invalidate(state);
        action = "Provas iniciais aceitas para a matriz";
        object = command.ruleVersion;
        message =
          "Correspondências iniciais aceitas. A comparação está habilitada; os dois atestados ausentes de Carla ainda não pontuam.";
        break;
      }
      case "EVALUATE_TEAMS": {
        role("bids");
        check(
          state.tender.rulesApproved &&
            state.tender.initialEvidenceAccepted &&
            !state.tender.amended,
          "Aprovar matriz e aceitar a lista de provas iniciais antes de publicar uma nota.",
        );
        if (
          state.evaluation.status === "current" &&
          state.evaluation.inputRevision === state.inputRevision &&
          state.evaluation.selected?.managerId ===
            state.evaluation.teams[0]?.managerId &&
          state.evaluation.selected?.specialistId ===
            state.evaluation.teams[0]?.specialistId
        ) {
          noChange(
            "Comparação atual preservada. As mesmas entradas não geram novos pontos ou decisões.",
          );
          break;
        }
        state.evaluation = evaluateDemoTeams(state);
        const result = state.evaluation.selected;
        if (result?.managerId && result.specialistId) {
          state.selectedTeam = {
            managerId: result.managerId,
            specialistId: result.specialistId,
          };
        }
        action = "Composições recalculadas na amostra";
        object = state.tender.universeVersion;
        const score = result?.score;
        message =
          score === 35
            ? "35 pontos. Os dois projetos recuperados têm provas aceitas."
            : score === 33
              ? `33 pontos. O projeto ${isEvidenceAccepted(state, state.evidence["ev-carla-aurora"]) ? "Aurora" : "Vale do Sol"} acrescentou 2 pontos à composição.`
              : score === 31
                ? "31 pontos da equipe-chave. Diego contribui mais na função de Especialista para esta composição."
                : score === 29
                  ? "29 pontos. Carla e Eva formam a alternativa confirmada com as agendas disponíveis."
                  : "Sem equipe confirmada. Confira os impedimentos.";
        break;
      }
      case "SELECT_TEAM": {
        role("bids");
        check(
          getCurrentScore(state) !== null,
          "Recalcule antes de selecionar uma composição.",
        );
        check(
          command.managerId !== command.specialistId,
          "Diego já ocupa outra função. Este edital exige pessoas distintas.",
        );
        const result = state.evaluation.teams.find(
          (t) =>
            t.managerId === command.managerId &&
            t.specialistId === command.specialistId,
        );
        check(
          result,
          "Esta composição possui impedimento de credencial ou agenda. A seleção válida anterior foi preservada.",
        );
        if (
          state.selectedTeam.managerId === command.managerId &&
          state.selectedTeam.specialistId === command.specialistId
        ) {
          noChange("Esta composição já está selecionada.");
          break;
        }
        state.selectedTeam = {
          managerId: command.managerId,
          specialistId: command.specialistId,
        };
        state.evaluation.selected = structuredClone(result);
        state.evaluation.lastScore = result.score;
        state.dossier.reviewed = false;
        action = "Composição selecionada";
        object = `${state.people[command.managerId].name} + ${state.people[command.specialistId].name}`;
        message =
          "Composição válida selecionada. Confira a aprovação do PMO e os textos do dossiê.";
        break;
      }
      case "CONFIRM_TEAM_PMO": {
        role("pmo");
        check(
          getCurrentScore(state) !== null,
          "O PMO precisa de uma avaliação atual e sem impedimentos.",
        );
        check(
          !command.key || command.key === teamKey(state),
          "A composição mudou desde que a confirmação foi aberta.",
        );
        check(
          command.availabilityRevision === undefined ||
            command.availabilityRevision === state.availabilityRevision,
          "A disponibilidade mudou. Confira o período novamente.",
        );
        if (state.pmo?.key === teamKey(state)) {
          noChange(
            "Esta composição já foi conferida pelo PMO para o período e a capacidade atuais.",
          );
          break;
        }
        state.pmo = {
          key: teamKey(state),
          availabilityRevision: state.availabilityRevision,
          by: actorId,
          at: demoTime(state),
        };
        action = "PMO confirmou uso desta composição";
        object = teamKey(state);
        message =
          "Composição confirmada pelo PMO para 02/11/2026 a 29/01/2027. É uma indicação de proposta demonstrativa, sem contratação.";
        break;
      }
      case "REQUEST_PROOF": {
        role("bids");
        const task = state.recoveryTasks[command.taskId];
        check(task, "Tarefa não encontrada.");
        if (task.status !== "open" && task.status !== "rejected") {
          noChange("Solicitação local já registrada para esta tarefa.");
          break;
        }
        check(task.responsible, "Defina o responsável antes de solicitar.");
        task.status = "requested";
        action = "Atestado solicitado localmente";
        object = task.projectId;
        message =
          "Solicitação demonstrativa registrada para Carla. Nenhuma mensagem foi enviada.";
        break;
      }
      case "RECEIVE_EVIDENCE": {
        const e = evidence(command.evidenceId);
        own(e.personId);
        check(
          command.documentFixtureId === e.documentFixtureId,
          "Esta demonstração usa os documentos de exemplo compatíveis com a tarefa.",
        );
        if (e.document === "verified" || isEvidenceAccepted(state, e)) {
          noChange(
            "Este projeto já foi considerado. Outro arquivo não acrescenta pontos.",
          );
          break;
        }
        if (e.document === "received" || e.document === "reviewing") {
          noChange(
            "Este documento já foi recebido. A pontuação ainda não mudou.",
          );
          break;
        }
        const task = Object.values(state.recoveryTasks).find(
          (t) => t.evidenceId === e.id,
        );
        if (task)
          check(
            task.status === "requested" || task.status === "rejected",
            "Licitações precisa registrar a solicitação local antes da apresentação.",
          );
        if (e.id === "ev-lia-sec")
          check(
            state.campaigns["campaign-security"].status !== "open",
            "Lia precisa confirmar sua declaração antes de apresentar o comprovante.",
          );
        if (e.id === "ev-marina-cloud")
          check(
            state.referrals["referral-marina"].status !== "pending",
            "Marina precisa aceitar a indicação antes de apresentar seus dados.",
          );
        // A new document version never inherits an earlier Licitações acceptance.
        const hadAcceptedVersion = state.acceptances.some(
          (a) => a.evidenceId === e.id && a.decision === "accepted",
        );
        state.acceptances = state.acceptances.filter(
          (a) => a.evidenceId !== e.id,
        );
        e.document = "received";
        e.information = "confirmed";
        e.version += 1;
        e.reason = undefined;
        e.verifiedBy = undefined;
        e.verifiedAt = undefined;
        if (task) task.status = "received";
        if (hadAcceptedVersion) invalidate(state);
        if (e.id === "ev-lia-sec")
          state.campaigns["campaign-security"].status = "received";
        if (e.id === "ev-marina-cloud")
          state.referrals["referral-marina"].status = "received";
        action = "Documento de exemplo apresentado";
        object = e.id;
        message = "Documento recebido. A pontuação ainda não mudou.";
        break;
      }
      case "VERIFY_EVIDENCE": {
        role("hr");
        const e = evidence(command.evidenceId);
        if (e.document === "verified" && command.result) {
          noChange(
            "Este documento já foi verificado. Uso no edital continua sendo decisão de Licitações.",
          );
          break;
        }
        if (e.document === "rejected" && !command.result) {
          noChange("Rejeição já registrada.");
          break;
        }
        check(
          e.document === "received" ||
            e.document === "reviewing" ||
            (e.document === "verified" && !command.result),
          "Receba o documento de exemplo antes da conferência do RH.",
        );
        check(
          command.result || command.reason.trim().length > 0,
          "Informe um motivo para a rejeição.",
        );
        const used = isEvidenceAccepted(state, e);
        e.document = command.result ? "verified" : "rejected";
        e.reason = command.result ? undefined : command.reason;
        e.verifiedBy = actorId;
        e.verifiedAt = demoTime(state);
        e.version += 1;
        // Rejection retires the old use decision; re-verification requires a new explicit acceptance.
        if (!command.result)
          state.acceptances = state.acceptances.filter(
            (a) => a.evidenceId !== e.id,
          );
        const task = Object.values(state.recoveryTasks).find(
          (t) => t.evidenceId === e.id,
        );
        if (task) task.status = command.result ? "verified" : "rejected";
        if (used) invalidate(state);
        if (command.result) awardCredential(state, e);
        action = command.result
          ? "RH verificou documento"
          : "RH rejeitou documento";
        object = e.id;
        message = command.result
          ? e.id === "ev-lia-sec" || e.id === "ev-marina-cloud"
            ? "Credencial verificada. Perfil atualizado para novas oportunidades. Reconhecimento concedido uma única vez; nenhuma alteração na nota de ENE-001."
            : "Documento verificado. Uso neste edital em análise."
          : `Documento rejeitado: ${command.reason} Nenhum ponto foi concedido.`;
        break;
      }
      case "ACCEPT_EVIDENCE_FOR_RULE": {
        role("bids");
        const e = evidence(command.evidenceId);
        check(
          state.tender.rulesApproved && !state.tender.amended,
          "A matriz atual precisa estar aprovada.",
        );
        check(
          command.ruleVersion === state.tender.ruleVersion &&
            command.ruleId === e.ruleId &&
            e.roleId,
          "A prova deve corresponder à regra, função e versão atuais.",
        );
        if (isEvidenceAccepted(state, e, command.ruleId)) {
          noChange(
            "Prova já aceita para este critério. Outro arquivo do mesmo projeto não acrescenta pontos.",
          );
          break;
        }
        check(
          e.document === "verified",
          "RH precisa verificar o documento antes do aceite no edital.",
        );
        check(
          e.information === "confirmed",
          "O titular precisa confirmar a informação.",
        );
        check(
          e.validity === "valid" || e.validity === "na",
          "A vigência não atende à data exigida.",
        );
        state.acceptances = state.acceptances.filter(
          (a) =>
            !(
              a.evidenceId === e.id &&
              a.ruleId === command.ruleId &&
              a.ruleVersion === command.ruleVersion
            ),
        );
        state.acceptances.push({
          evidenceId: e.id,
          personId: e.personId,
          roleId: e.roleId,
          ruleId: command.ruleId,
          ruleVersion: command.ruleVersion,
          decision: "accepted",
          reviewerId: actorId,
          decidedAt: demoTime(state),
          reason:
            "Titular, participação, documento, pertinência e vigência conferidos para esta regra.",
        });
        const task = Object.values(state.recoveryTasks).find(
          (t) => t.evidenceId === e.id,
        );
        if (task) task.status = "accepted";
        invalidate(state);
        action = "Prova aceita para o critério";
        object = `${e.id} · ${command.ruleId}`;
        message = "Prova aceita para este critério. Recalcule a equipe.";
        break;
      }
      case "REJECT_EVIDENCE_FOR_RULE": {
        role("bids");
        const e = evidence(command.evidenceId);
        check(
          e.ruleId === command.ruleId && e.roleId,
          "Critério incompatível com a prova.",
        );
        check(command.reason.trim(), "Informe o motivo da não aceitação.");
        const prior = state.acceptances.find(
          (a) =>
            a.evidenceId === e.id &&
            a.ruleId === command.ruleId &&
            a.ruleVersion === state.tender.ruleVersion,
        );
        if (prior?.decision === "rejected") {
          noChange("A não aceitação já está registrada.");
          break;
        }
        const wasAccepted = prior?.decision === "accepted";
        state.acceptances = state.acceptances.filter((a) => a !== prior);
        state.acceptances.push({
          evidenceId: e.id,
          personId: e.personId,
          roleId: e.roleId,
          ruleId: command.ruleId,
          ruleVersion: state.tender.ruleVersion,
          decision: "rejected",
          reviewerId: actorId,
          decidedAt: demoTime(state),
          reason: command.reason,
        });
        const task = Object.values(state.recoveryTasks).find(
          (t) => t.evidenceId === e.id,
        );
        if (task) task.status = "rejected";
        if (wasAccepted) invalidate(state);
        action = "Uso da prova não aceito";
        object = e.id;
        message = `Prova não aceita: ${command.reason} Outras provas válidas foram preservadas.`;
        break;
      }
      case "PREPARE_DOSSIER": {
        role("bids");
        check(
          getCurrentScore(state) !== null,
          "Recalcule uma equipe válida atual antes de preparar o dossiê.",
        );
        if (snapshotDependenciesCurrent(state, state.dossier.preview)) {
          noChange(
            "A prévia desta composição já está preparada. Confira o checklist e a revisão final.",
          );
          break;
        }
        state.dossier.preview = createDossierSnapshot(state);
        state.dossier.reviewed = false;
        action = "Prévia do dossiê preparada";
        object = state.dossier.preview.id;
        message =
          "Prévia composta apenas de fatos e provas aceitos. Confira o checklist antes de aprovar.";
        break;
      }
      case "REVIEW_DOSSIER": {
        role("bids");
        check(
          state.dossier.preview &&
            snapshotDependenciesCurrent(state, state.dossier.preview),
          "Prepare uma prévia da composição atual antes da revisão final.",
        );
        if (state.dossier.reviewed) {
          noChange("Revisão final já registrada para esta prévia.");
          break;
        }
        state.dossier.reviewed = true;
        action = "Licitações revisou textos da prévia";
        object = state.dossier.preview.id;
        message =
          "Textos e índice revisados por Licitações. A aprovação congela exatamente esta versão.";
        break;
      }
      case "APPROVE_DOSSIER": {
        role("bids");
        const preview = state.dossier.preview;
        check(
          preview && preview.version === command.version,
          "A versão da prévia mudou. Revise novamente.",
        );
        if (
          state.dossier.approved?.id === preview.id &&
          canExportDossier(state)
        ) {
          noChange("Esta versão já está aprovada e preservada.");
          break;
        }
        const missing = getDossierChecklist(state).filter(
          (c) => c.required && !c.status,
        );
        check(
          !missing.length,
          `Aprovação bloqueada: ${missing.map((c) => c.label).join("; ")}.`,
        );
        check(
          snapshotDependenciesCurrent(state, preview),
          "A prévia usa uma versão anterior das dependências.",
        );
        const snapshot = structuredClone(preview);
        snapshot.approvedAt = demoTime(state);
        snapshot.approvers = [
          actor.name,
          state.actors[state.pmo!.by].name,
          "Beatriz Souza · conferência das provas",
        ];
        state.dossier.approved = snapshot;
        if (!state.dossier.history.some((s) => s.id === snapshot.id))
          state.dossier.history.push(structuredClone(snapshot));
        action = "Dossiê da equipe aprovado";
        object = snapshot.id;
        message = `Dossiê demonstrativo aprovado em ${snapshot.score} pontos. Conteúdo e dependências preservados no snapshot.`;
        break;
      }
      case "RECORD_DOSSIER_EXPORT": {
        role("bids");
        check(
          canExportDossier(state),
          "Exportação bloqueada: revise aprovação, versão, agenda e permissões dos documentos usados.",
        );
        check(
          command.snapshotId === state.dossier.approved?.id,
          "O snapshot solicitado não é a versão aprovada atual.",
        );
        check(
          command.filename ===
            "APTUS_Nexora_ENE-001_Dossie_Demonstrativo_v1.pdf",
          "Use o nome do arquivo demonstrativo previsto.",
        );
        state.dossier.exports.push({
          snapshotId: command.snapshotId,
          filename: command.filename,
          at: demoTime(state),
        });
        action = "Resumo do dossiê exportado";
        object = command.filename;
        message = "Resumo do dossiê exportado. Nenhum envio foi realizado.";
        break;
      }
      case "RESPOND_TO_CAMPAIGN": {
        own(command.personId);
        const campaign = state.campaigns[command.campaignId];
        check(
          campaign && campaign.personId === command.personId,
          "Campanha não disponível para esta pessoa.",
        );
        if (campaign.status !== "open") {
          noChange(
            "Declaração da campanha já registrada. A comprovação continua separada.",
          );
          break;
        }
        const e = evidence("ev-lia-sec");
        e.information = "confirmed";
        campaign.status = "declared";
        if (command.documentFixtureId) {
          check(
            command.documentFixtureId === e.documentFixtureId,
            "Escolha o comprovante demonstrativo de Lia.",
          );
          e.document = "received";
          e.version += 1;
          campaign.status = "received";
        }
        action = "Titular respondeu campanha Security+";
        object = campaign.id;
        message =
          "Lia confirmou a declaração. Reembolso do exame não comprova aprovação; apresente a credencial para conferência.";
        break;
      }
      case "ACCEPT_REFERRAL": {
        own(command.personId);
        const r = state.referrals[command.referralId];
        check(
          r && r.personId === command.personId && !r.external,
          "Indicação interna não encontrada para esta pessoa.",
        );
        if (r.status !== "pending") {
          noChange("Aceite desta indicação já registrado.");
          break;
        }
        r.status = "accepted";
        state.evidence["ev-marina-cloud"].information = "confirmed";
        action = "Indicada aceitou participação";
        object = r.id;
        message =
          "Marina aceitou a indicação. Apresente a credencial de exemplo para verificação independente pelo RH.";
        break;
      }
      case "VALIDATE_REFERRAL": {
        role("hr");
        const r = state.referrals[command.referralId];
        check(
          r && !r.external,
          "Esta ação valida a indicação interna de exemplo.",
        );
        if (r.status === "validated") {
          noChange(
            "Indicação já validada. O reconhecimento não é concedido novamente.",
          );
          break;
        }
        check(
          actor.personId !== r.fromPersonId,
          "A pessoa indicadora não pode aprovar sua própria indicação.",
        );
        check(
          r.status !== "pending",
          "A pessoa indicada precisa aceitar primeiro.",
        );
        check(
          state.evidence["ev-marina-cloud"].document === "verified",
          "RH precisa verificar a credencial apresentada por Marina.",
        );
        r.status = "validated";
        addRecognition(
          state,
          "referral:referral-marina",
          "p-eva",
          "internal-referral",
          3,
          "Indicação interna de Marina confirmada e qualificação verificada por RH.",
        );
        action = "RH validou indicação interna";
        object = r.id;
        message =
          "Perfil atualizado para novas oportunidades. Eva recebeu +3 e Marina +10, em registros separados. Reconhecimento não altera a pontuação em editais.";
        break;
      }
      case "ACCEPT_EXTERNAL_INVITE": {
        own("p-lucas");
        const r = state.referrals[command.inviteId];
        check(
          r?.external && r.personId === "p-lucas",
          "Convite local não encontrado.",
        );
        if (r.status !== "pending") {
          noChange(
            "Lucas já aceitou participar desta demonstração. Vínculo e agenda permanecem pendentes.",
          );
          break;
        }
        r.status = "accepted";
        state.people["p-lucas"] = {
          id: "p-lucas",
          name: "Lucas Azevedo",
          initials: "LA",
          area: "Externo · vínculo e agenda pendentes",
          competencies: ["Conhecimentos declarados em tecnologia"],
          profileVersion: 1,
          updateStatus: "confirmed",
          lastReview: demoTime(state),
          external: true,
        };
        state.availability["p-lucas"] = {
          personId: "p-lucas",
          capacity: null,
          confirmed: false,
          revision: 1,
          from: "2026-11-02",
          to: "2027-01-29",
          validUntil: "2026-10-27T18:00:00-03:00",
          confirmedAt: "A confirmar",
          responsible: "PMO · pendente",
        };
        action = "Convidado externo aceitou demonstração";
        object = r.id;
        message =
          "Lucas consta como Externo · vínculo e agenda pendentes. Aceite não equivale a contratação. Nenhum reconhecimento externo foi gerado.";
        break;
      }
      case "VALIDATE_CONTRIBUTION": {
        role("hr");
        const allowed: Record<
          string,
          { personId: string; kind: string; points: number; evidenceId: string }
        > = {
          "credential:ev-lia-sec": {
            personId: "p-lia",
            kind: "certification",
            points: 10,
            evidenceId: "ev-lia-sec",
          },
          "credential:ev-marina-cloud": {
            personId: "p-marina",
            kind: "certification",
            points: 10,
            evidenceId: "ev-marina-cloud",
          },
        };
        const entry = allowed[command.eventKey];
        check(
          entry &&
            entry.personId === command.personId &&
            entry.kind === command.kind,
          "Contribuição sem evento elegível previsto nesta demonstração.",
        );
        check(
          state.evidence[entry.evidenceId].document === "verified",
          "A contribuição exige prova verificada.",
        );
        if (state.engagement.some((e) => e.eventKey === command.eventKey)) {
          noChange("Esta contribuição já foi reconhecida uma única vez.");
          break;
        }
        addRecognition(
          state,
          command.eventKey,
          entry.personId,
          entry.kind,
          entry.points,
          "Credencial comprovada e verificada.",
        );
        action = "Contribuição validada";
        object = command.eventKey;
        message =
          "Pontos de reconhecimento registrados uma única vez, sem alterar a nota técnica.";
        break;
      }
      case "SET_AVAILABILITY": {
        role("pmo");
        const a = state.availability[command.personId];
        check(a, "Agenda não encontrada.");
        check(
          command.capacity === null ||
            (Number.isFinite(command.capacity) && command.capacity >= 0),
          "Capacidade inválida.",
        );
        if (
          a.capacity === command.capacity &&
          a.confirmed === command.confirmed
        ) {
          noChange("Disponibilidade já corresponde a este estado.");
          break;
        }
        a.capacity = command.capacity;
        a.confirmed = command.confirmed;
        a.revision += 1;
        state.availabilityRevision += 1;
        state.pmo = null;
        invalidate(state);
        action = "PMO alterou disponibilidade";
        object = command.personId;
        message =
          "A agenda mudou. Último cálculo em revisão; comparar novamente e reconfirmar a composição.";
        break;
      }
      case "AMEND_TENDER": {
        role("bids");
        if (state.tender.amended) {
          noChange("Retificação v2 já está em revisão.");
          break;
        }
        state.tender.amended = true;
        state.tender.version = "ENE-001-v2";
        state.tender.ruleVersion = "RULES-ENE-001-v2";
        state.tender.rulesApproved = false;
        state.tender.initialEvidenceAccepted = false;
        state.rules.forEach((r) => {
          r.reviewed = false;
        });
        invalidate(state);
        action = "Retificação demonstrativa recebida";
        object = "ENE-001-v2";
        message =
          "Retificação v2 em revisão. Resultado v1 preservado no histórico; nova aprovação e exportação bloqueadas. Restaure o cenário principal para continuar.";
        break;
      }
      case "SET_EXPORT_PERMISSION": {
        role("bids");
        const e = evidence(command.evidenceId);
        if (e.exportAllowed === command.allowed) {
          noChange("Permissão documental já está neste estado.");
          break;
        }
        e.exportAllowed = command.allowed;
        e.version += 1;
        state.dossier.reviewed = false;
        action = "Permissão documental alterada";
        object = e.id;
        message = command.allowed
          ? "Permissão restaurada; revise o dossiê para esta versão documental."
          : `Consulta interna permitida. Exportação bloqueada: ${e.title} perdeu permissão para o destinatário.`;
        break;
      }
    }
    state.appliedCommandIds.push(envelope.commandId);
    state.message = message;
    state.error = false;
    if (changed) {
      state.audit.push({
        id: `event-${String(state.audit.length + 1).padStart(4, "0")}`,
        actorId,
        actorName: actor.name,
        action,
        object,
        at: demoTime(state),
        version: state.tender.ruleVersion,
      });
      state.demo.clockMinutes += 1;
    }
    return state;
  } catch (error) {
    return {
      ...original,
      message:
        error instanceof Error
          ? error.message
          : "Não foi possível aplicar esta ação demonstrativa.",
      error: true,
    };
  }
}
