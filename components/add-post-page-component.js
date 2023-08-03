import { renderHeaderComponent } from "./header-component.js";
import { uploadImage } from "../api.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let img = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div>
        ${img ? `  <div class="file-upload-image-conrainer">  
          <img class="file-upload-image" src="${img}">    
               <button class="file-upload-remove-button button">Заменить фото</button>      
                  </div>` :
        `   
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label> ` } 
        </div>
        <label >
        <p>Опишите фотографию:</p>
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

    if (img) {
      const fileUploadImageContainer = document.querySelector(".file-upload-image-conrainer");
      fileUploadImageContainer.innerHTML = `
          <img class="file-upload-image" src="${img}">
          <button class="file-upload-remove-button button">Заменить фото</button>
        `;
      const removeButton = document.querySelector(".file-upload-remove-button");
      removeButton.addEventListener("click", () => {
        img = "";
        render();
      });
    } else {
      const fileUploadLabel = document.querySelector(".file-upload-label");
      fileUploadLabel.innerHTML = `
          <input type="file" class="file-upload-input" style="display:none" />
          Выберите фото
        `;
      const inputFile = document.querySelector(".file-upload-input");
      inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        if (file) {
          const inputFile = document.querySelector(".file-upload-label");
          inputFile.setAttribute("disabled", !0);
          inputFile.textContent = "Загружаю файл...";
          uploadImage({ file })
            .then(({ fileUrl }) => {
              img = fileUrl;
              render();
            })
            .catch((error) => {
              console.error("Ошибка загрузки файла:", error);
            });
        };
      });
    };

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.querySelector(".input.textarea").value;
      render();
      onAddPostClick({
        description,
        imageUrl: img,
      });

    });

  };

  render(); 
}
