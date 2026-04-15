const { createClient } = supabase;

const supabaseClient = createClient(
  "https://fwjrzsnxmfqzpcqxwdnx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3anJ6c254bWZxenBjcXh3ZG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjc4NjcsImV4cCI6MjA5MTg0Mzg2N30.wmuXXG0R-zrbJcrGIC1r_bs0ubNBEIfnkA6a-VXiXB8",
);

document.getElementById("google-login").addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://xyz-builds.github.io/Molten.IO/dashboard.html",
    },
  });
  if (error) console.error(error);
});

const {
  data: { session },
} = await supabaseClient.auth.getSession();

if (session) {
  console.log("Logged in as:", session.user.email);
} else {
  console.log("Not logged in");
}

(async () => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    const user = session.user;

    const name = user.user_metadata.full_name;
    const email = user.email;
    const picture = user.user_metadata.avatar_url;

    console.log(name, email, picture);
  }
})();
