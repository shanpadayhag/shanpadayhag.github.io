import NoteArticle from "@/features/notes/components/note-article";
import { refreshTokenNote } from "@/features/notes/data_sources/content/notes-content";

export default function RefreshTokensYouCanTakeBackPage() {
  return (
    <NoteArticle note={refreshTokenNote}>
      <p className="text-foreground text-xl">
        The Showcase Authentication Service is a small Rust project I built to
        practise authentication properly: register, verify an email, sign in,
        stay signed in, sign out. It’s a workspace of small crates in a
        ports-and-adapters layout, with one AWS Lambda handler per endpoint and
        PostgreSQL underneath. This note is about one part of it, the token that
        keeps you signed in, as of commit <code>ecd4d91</code>.
      </p>
      <h2>The problem with a token you can’t take back</h2>
      <p>
        After sign-in, the service hands out an access token: a JSON Web Token
        signed with HS256. Any handler can check it without touching the
        database, which is exactly why JWTs are popular.
      </p>
      <p>
        That same property is the problem. A signed token stays valid until it
        expires, and nothing on the server can cancel it early. If access tokens
        lived for a week, “sign out” would only mean “forget the token in this
        browser”, and anyone who had copied it could keep using it.
      </p>
      <h2>Two tokens, two jobs</h2>
      <p>So the work is split in two:</p>
      <ul>
        <li>
          The <strong>access token</strong> is short-lived. In the example
          configuration it lasts 15 minutes. It proves who you are on each
          request.
        </li>
        <li>
          The <strong>refresh token</strong> lasts longer, 7 days in the same
          configuration, and does one thing: get a new access token.
        </li>
      </ul>
      <p>
        The refresh token is not a JWT. It’s 32 random bytes, encoded as a
        URL-safe string, with nothing inside it to decode. It only means
        something because the server has a row for it. It travels in a cookie
        marked <code>HttpOnly</code>, <code>Secure</code> and{" "}
        <code>SameSite=Strict</code>, so page scripts can’t read it and other
        sites can’t send it.
      </p>
      <h2>Keep only the hash</h2>
      <p>
        The server never stores the token itself. It stores the SHA-256 hash of
        it, in a column with a unique index, and looks tokens up by hashing what
        the browser sends.
      </p>
      <p>
        The reason is a database leak. If someone copies the{" "}
        <code>refresh_tokens</code> table, they get hashes. To use one, they’d
        need the 32 random bytes that produced it, and those exist only in the
        user’s cookie. A fast hash like SHA-256 is fine here, unlike for
        passwords, because the input is random and long rather than something a
        person chose.
      </p>
      <h2>Signing out means something</h2>
      <p>
        Because the server holds a row per refresh token, it can take one back.
        Each row has a <code>revoked_at</code> column, empty while the token is
        active. Signing out finds the active row by its hash and sets{" "}
        <code>revoked_at</code>. Every lookup asks for a row that is not revoked
        and not expired, so a revoked token is simply never found again.
      </p>
      <p>
        The integration tests run the whole flow against PostgreSQL by calling
        each handler directly: register, verify, sign in, fetch the current
        user, refresh, sign out, and then a refresh that must be refused because
        the token was revoked. That last step is the one this design exists for.
      </p>
      <h2>What the first version leaves out</h2>
      <p>
        Refreshing gives you a new access token and keeps the same refresh
        token. The code says so in a comment: “not rotated (v1)”. So if a
        refresh token were stolen while it’s still active, the thief could keep
        refreshing until the owner signs out or the token expires.
      </p>
      <p>
        Rotation is the next step: issue a new refresh token on every use, and
        treat a second use of an old one as theft. I built that later in DaiBX,
        where each refresh replaces the token and an old token used again,
        outside a 30-second grace for two tabs refreshing at once, ends the
        whole session. Leaving it out kept the first version of this service
        small enough to finish and test properly, and the comment keeps the gap
        visible instead of pretending it isn’t there.
      </p>
      <p>
        The code is public:{" "}
        <a href="https://github.com/shanpadayhag/showcase-auth-service/blob/ecd4d91/crates/adapters-jwt/src/lib.rs">
          the token code
        </a>{" "}
        and{" "}
        <a href="https://github.com/shanpadayhag/showcase-auth-service/blob/ecd4d91/migrations/0002_refresh_tokens.up.sql">
          the refresh-token table
        </a>
        .
      </p>
    </NoteArticle>
  );
}
