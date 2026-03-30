import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import { db } from "./db.js";
import { getUser } from "./user.js";

const SESSION_COOKIE = "__Host-fisz-id";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const db_ops = {
  create_session: db.prepare(
    `INSERT INTO fc_session (id, user_id, created_at)
            VALUES (?, ?, ?);`
  ),
  get_session: db.prepare(
    "SELECT id, user_id, created_at from fc_session WHERE id = ?;"
  ),
  delete_session: db.prepare("DELETE FROM fc_session WHERE id = ?;"),
};

function createSession(user, res) {
  let sessionId = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  let createdAt = Date.now();

  db_ops.create_session.run(sessionId, user, createdAt);
  let session = { id: sessionId, user_id: user, created_at: createdAt };

  res.locals.session = session;

  res.cookie(SESSION_COOKIE, session.id.toString(), {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: true,
  });
  return session;
}

function sessionHandler(req, res, next) {
  let sessionId = req.cookies[SESSION_COOKIE];
  let session = null;
  if (sessionId != null) {
    if (!sessionId.match(/^-?[0-9]+$/)) {
      // Invalid session id
      sessionId = null;
    } else {
      sessionId = BigInt(sessionId);
    }
  }

  // sessionId may look valid but might not exist in db
  if (sessionId != null) {
  const row = db_ops.get_session.get(sessionId);
  if (row != null) {
    session = { ...row, id: BigInt(row.id) };
  }
}
  

  if (session != null) {
    res.locals.session = session;
    if (session.user_id != null) {
      res.locals.user = getUser(session.user_id);
    }
    res.cookie(SESSION_COOKIE, res.locals.session.id.toString(), {
      maxAge: ONE_WEEK, 
      httpOnly: true,
      secure: true,
    });
  } else {
    res.locals.session = null;
    res.locals.user = null;
  }

  setImmediate(() => {
      if (session) {
          console.info(
              "Session:",
              session.id,
              "user:",
              session.user_id,
              "created at:",
              new Date(Number(session.created_at)).toISOString()
          );
      }
  });

  next();
}

function deleteSession(res) {
  if (res.locals.session != null) {
    db_ops.delete_session.run(res.locals.session.id);
  }
  res.clearCookie(SESSION_COOKIE);
  res.locals.session = null;
}

export { createSession, sessionHandler, deleteSession };