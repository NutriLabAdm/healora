const orchestrator = require('./orchestrator');
const TempManager = require('./connectors/lib/TempManager');

const activeJobs = new Map();

async function triggerSearch(session, kb) {
  const { id: sessionId, query_id: queryId, domain, source, keywords, mesh_terms } = session;
  const sources = source ? source.split(',').map(s => s.trim()) : [];

  if (activeJobs.has(sessionId)) {
    throw new Error(`Session ${sessionId} already running`);
  }

  const abortController = new AbortController();
  activeJobs.set(sessionId, abortController);

  try {
    if (kb) {
      kb.completeSession(sessionId, { status: 'searching', started_at: new Date().toISOString() });
    }

    const result = await orchestrator.runSearch({
      query: keywords || '',
      sources,
      domain,
      keywords,
      mesh_terms: mesh_terms || '',
      sessionId,
      queryId,
    });

    if (abortController.signal.aborted) {
      if (kb) {
        kb.cancelSession(sessionId);
      }
      return { sessionId, status: 'cancelled' };
    }

    if (kb && result.etl) {
      const sessionUpdate = {
        status: 'completed',
        articles_found: result.totalFound,
        articles_after_dedup: result.etl.dedupAfter || 0,
        articles_queued: result.etl.saved || 0,
        completed_at: new Date().toISOString(),
      };
      try { kb.completeSession(sessionId, sessionUpdate); } catch {}
    }

    TempManager.cleanupOld();

    return { sessionId, status: 'completed', ...result };
  } catch (err) {
    if (kb) {
      try {
        kb.completeSession(sessionId, { status: 'error', error_message: err.message, completed_at: new Date().toISOString() });
      } catch {}
    }
    throw err;
  } finally {
    activeJobs.delete(sessionId);
  }
}

async function cancelSearch(sessionId) {
  const abort = activeJobs.get(sessionId);
  if (abort) {
    abort.abort();
    activeJobs.delete(sessionId);
  }
}

function getActiveJobs() {
  return [...activeJobs.keys()];
}

module.exports = { triggerSearch, cancelSearch, getActiveJobs };
