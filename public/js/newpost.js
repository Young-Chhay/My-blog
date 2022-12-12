const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#newblog-title").value.trim();
  const description = document
    .querySelector("#newblog-description")
    .value.trim();

  await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: description,
    }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/dashboard");
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);