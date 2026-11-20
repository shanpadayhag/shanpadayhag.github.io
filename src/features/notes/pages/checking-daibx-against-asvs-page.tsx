import NoteArticle from "@/features/notes/components/note-article";
import { asvsCheckNote } from "@/features/notes/data_sources/content/notes-content";

export default function CheckingDaibxAgainstAsvsPage() {
  return (
    <NoteArticle note={asvsCheckNote}>
      <p className="text-foreground text-xl">
        DaiBX is a planner I built: nested tasks, a board, a calendar and time
        tracking, with a Rust API on AWS Lambda and a Next.js web app. Sign-up
        is invite-only and every account needs an authenticator app. Before
        calling it secure, I wanted something better than a feeling, so I
        checked it against the OWASP Application Security Verification Standard,
        version 5.0, Level 2.
      </p>
      <p>
        Level 1 and Level 2 together hold 253 requirements. The result is a
        single file in the API repository, and it describes the API as of
        version 1.7.0.
      </p>
      <h2>A record, not a checklist</h2>
      <p>
        A checklist invites ticking boxes. What I wanted was a record I could
        defend line by line, so every requirement gets one of four statuses:
      </p>
      <ul>
        <li>
          <strong>Met</strong>, with a pointer to the code or the test that
          proves it.
        </li>
        <li>
          <strong>Met, with a documented deviation</strong>: implemented
          differently from the letter of the requirement, with the reason
          written next to it.
        </li>
        <li>
          <strong>Not applicable</strong>, because DaiBX has no such feature.
        </li>
        <li>
          <strong>Gap</strong>, with a numbered fix.
        </li>
      </ul>
      <p>
        The requirement numbers come straight from the OWASP repository, so
        anyone can check a row against the standard. Today the count is 167 met,
        7 met with a documented deviation, 79 not applicable and 0 gaps.
      </p>
      <p>
        The “not applicable” rows matter as much as the others. DaiBX has its
        own sign-in rather than OAuth, and no WebRTC, so those chapters are
        marked not applicable one row at a time, each with its reason. Saying so
        explicitly is how the record stays honest about its own size.
      </p>
      <h2>Three decisions it writes down</h2>
      <p>
        The rows I learned most from are the ones where the obvious answer was
        wrong for this app.
      </p>
      <h3>No account lockout</h3>
      <p>
        The textbook defence against password guessing is to lock an account
        after a few failures. The problem is that anyone who knows your email
        address can then lock you out of your own account.
      </p>
      <p>
        DaiBX never locks an account. It slows the attacker down instead and
        answers with <code>429 Too Many Requests</code> and a{" "}
        <code>Retry-After</code> header. For each account and IP address, five
        failures are free. After that, each failure blocks that pair for 60
        seconds, doubling up to 15 minutes. On top of that sit hourly limits per
        account and per IP address, so spraying one account from many addresses
        doesn’t work either. A browser that already holds a valid
        remembered-device cookie skips the per-account limit, so an attacker
        can’t lock the owner out of their own devices.
      </p>
      <h3>Sessions longer than NIST suggests</h3>
      <p>
        NIST’s guidance for this assurance level asks people to sign in again
        within hours. DaiBX keeps a session for up to 7 days of inactivity and
        30 days in total. The access token lives 15 minutes, and the refresh
        token rotates every time it’s used.
      </p>
      <p>
        That’s a deviation, so the record says why. DaiBX holds one person’s own
        tasks, not money or other people’s data. Every session is stored on the
        server and can be ended. Any change to the account’s security asks for
        the password and a code again. Under those conditions, not typing a code
        every day is a reasonable trade. Writing that paragraph forced me to
        list the conditions, and each one is something the code has to keep
        true.
      </p>
      <h3>SHA-1, where it’s the standard</h3>
      <p>
        ASVS asks for approved hash functions, and SHA-1 isn’t one any more.
        DaiBX uses it in two places: authenticator codes are HMAC-SHA-1, because
        that’s what the authenticator-app standard and the apps themselves use,
        and the breached-password check looks passwords up by their SHA-1
        prefix. Neither use relies on collision resistance, and stored passwords
        are hashed with Argon2id. So the row is “met, with a documented
        deviation”, not a quiet “met”.
      </p>
      <p>
        The other deviations are smaller: a code is accepted one 30-second step
        early or late because phone clocks drift, and secrets live in encrypted
        Lambda settings rather than a separate secrets manager, to be revisited
        when anyone else gets access.
      </p>
      <h2>What the record is not</h2>
      <p>
        It is my own assessment. Nobody else has audited DaiBX, and the record
        doesn’t claim otherwise. Where it says a deviation was accepted, I’m the
        one who accepted it.
      </p>
      <p>
        What it does give me is a map. When I change the sign-in flow, I know
        which rows to re-read. When someone asks how DaiBX handles brute force,
        the answer is a link, not a paragraph from memory.
      </p>
      <p>
        The full record is public:{" "}
        <a href="https://github.com/shanpadayhag/dai-bx-api/blob/v1.7.0/docs/security/asvs-l2.md">
          docs/security/asvs-l2.md in dai-bx-api
        </a>
        .
      </p>
    </NoteArticle>
  );
}
