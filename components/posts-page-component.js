import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  if (posts.length === 0) {
    const postHtml = `<div class="page-container">
    <div class="header-container"></div>
    </div>
    `;
    appEl.innerHTML = postHtml;
    console.log("работаю");
  } else {
  const appHtml = posts.map(() => {
      return `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          <li class="post">
            <div class="post-header" data-user-id="642d00329b190443860c2f31">
                <img src="" class="post-header__user-image">
                <p class="post-header__user-name"></p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="">
            </div>
            <div class="post-likes">
              <button data-post-id="642d00579b190443860c2f32" class="like-button">
                <img src="">
              </button>
              <p class="post-likes-text">
                Нравится: <strong></strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name"></span>
              </p>
            <p class="post-date"></p>
          </li>
        </ul>
      </div>`;
    })
    appEl.innerHTML = appHtml;
    console.log("работаю я на все 100");
  }

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
