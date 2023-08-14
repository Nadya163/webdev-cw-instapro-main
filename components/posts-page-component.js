import { LOADING_PAGE, POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { likePost, dislikePost } from "../api.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl, token }) {
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
    const postsHtml = posts.map((post) => {
      const timeAgo = formatDistanceToNow(new Date(post.createdAt), { locale: ru, addSuffix: true });
      return `
        <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button">
          <img src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
          </button>
          <p class="post-likes-text">
          Нравится: ${post.likes.length < 2 ? `<strong>${0 === post.likes.length ? "0" : post.likes.map(({ name }) => name).join(", ")}</strong>` : `<strong>${post.likes[Math.floor(Math.random() * post.likes.length)].name}</strong> и <strong>еще ${(post.likes.length - 1).toString()}</strong>`}
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        ${timeAgo}
         </p>
      </li>`;
    })
      .join("");

    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">${postsHtml}</ul>
        </div>`
        
    appEl.innerHTML = appHtml;
    console.log(appEl.innerHTML);
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

  if (!token) {
    for (let likeButton of document.querySelectorAll(".like-button")) {
      likeButton.addEventListener("click", () => {
        alert("Что бы поставить лайк авторизуйтесь");
      });
    }
    return;
  }

  for (let likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      const id = likeButton.dataset.postId;

      if (likeButton.dataset.isLiked === "false") {
        likePost({ id, token })
          .then((posts => {
            posts[token] = {
              likes: id.likes,
              isLiked: true
            }
            goToPage(POSTS_PAGE);
          }
          ))
      };
      if (likeButton.dataset.isLiked === "true") {
        dislikePost({ id, token })
          .then((posts => {
            posts[token] = {
              likes: id.likes,
              isLiked: false
            }
            goToPage(POSTS_PAGE);
          }
          ))
      }
    });
  }
}