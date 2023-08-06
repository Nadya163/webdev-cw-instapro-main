import { LOADING_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

    console.log(posts.length)
    if (posts.length === 0) {
    const postHtml = `<div class="page-container">
    <div class="header-container"></div>
    </div>
    `;
    appEl.innerHTML = postHtml;
    console.log("работаю");
  } else {
  const appHtml = posts.map((post) => {
      return `
      <div class="page-container">
      <div class="page-container">
    <div class="header-container"></div>
    </div>
        <ul class="posts">
        <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/like-active.svg">
          </button>
          <p class="post-likes-text">
             Нравится: <strong>${post.likes.length}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        ${post.createdAt}
         </p>
      </li>
        </ul>
      </div>`;
    })
    .join("");

    // ${post.likes.length} ${post.createdAt}

    appEl.innerHTML = appHtml;
    console.log(appEl.innerHTML);
    console.log("работаю я на все 100");
  }

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      console.log('post');
      goToPage(LOADING_PAGE);
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

