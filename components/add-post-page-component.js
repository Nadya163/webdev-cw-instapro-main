import { addPost } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, token, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
      <div class="upload-image-container">
      <div class="upload-image">
      <div class="upload-image-container"></div>
      </div>
    </div>
    <label for="">
      Опишите фотографию:
      <textarea class="input textarea" rows="4"></textarea>
    </label>
      <button class="button" id="add-button">Добавить</button>
      </div>
        </div> 
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const fileUploadLabel = document.querySelector(".upload-image-container");

    if (fileUploadLabel) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
          console.log(newImageUrl);
        },
      });
    }

    const addButton = document.getElementById("add-button");
    
    addButton.addEventListener("click", () => {
      const description = document.querySelector(".textarea").value;
      console.log(description);

      
      if(description === '') {
        alert('Не заполнено описание фото');
        return;
      };

      if (!imageUrl) {
        alert('Не добавлена картинка');
        return;
      }

      addPost({
        description,
        imageUrl,
        token
      }),
      onAddPostClick({
        description,
        imageUrl
      });
      
      render();

    });
  };

  render();
}