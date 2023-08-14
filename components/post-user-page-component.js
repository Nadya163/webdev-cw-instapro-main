import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { USER_POSTS_PAGE } from "../routes.js";
import { likePost, dislikePost } from "../api.js";

export function renderUserPostsPageComponent({ appEl, token }) {

  const postsUserHtml = posts.map((post) => {
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { locale: ru, addSuffix: true });
      return `
        <li class="post">
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
      </li>
`;
    })
    .join("");

    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="header-user-container" data-user-id="${posts[0].user.id}">
        <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">${posts[0].user.name}</p>
      </div>
      <ul class="posts">${postsUserHtml}</ul>
        </div>`

    appEl.innerHTML = appHtml;
    console.log(appEl.innerHTML);

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

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
          console.log(likeButton);
          const id = likeButton.dataset.postId;
          console.log(id);
    
          if (likeButton.dataset.isLiked === "false") {
            likePost({ id, token })
              .then((posts => {
                posts[token] = {
                  likes: id.likes,
                  isLiked: true
                }
                goToPage(USER_POSTS_PAGE, {
                  userId: posts.post.user.id
                });
              }
              ))
              console.log(posts);
          };
          if (likeButton.dataset.isLiked === "true") {
            dislikePost({ id, token })
              .then((posts => {
                posts[token] = {
                  likes: id.likes,
                  isLiked: false
                }
                goToPage(USER_POSTS_PAGE, {
                  userId: posts.post.user.id
                });
              }
              ))
          }
        });
      }
}