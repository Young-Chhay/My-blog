const editPostHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#update-title").value.trim();
  const postBody = document.querySelector("#update-description").value.trim();
  const blogId = document.querySelector("#update-blogId").textContent;

  console.log(title, body, blogId);

  await fetch(`/api/blogs/${blogId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.location.replace("/dashboard");
};

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);