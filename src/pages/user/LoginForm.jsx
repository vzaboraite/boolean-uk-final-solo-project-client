export default function LoginForm() {
  return (
    <main>
      <form>
        <h2>Log In</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
