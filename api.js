// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "nadya-terleeva"; //prod nadya-terleeva
const baseHost = " https://wedev-api.sky.pro";  // https://wedev-api.sky.pro/api/v1/nadya-terleeva/instapro
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// Get запрос конкретного user пользователя
export function getUserPosts({ id, token }) {
  return fetch(`${postsHost}/user-posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// отправляем запрос в API на добавление нового контента
export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: description
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
      imageUrl,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// POST запрос в API поставить лайк
export function likePost({ id, token }) {
  return fetch(postsHost + `/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
    })
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      return response.json();
    });
}

// POST запрос в API убрать лайк
export function dislikePost({ id, token }) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
    })
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      return response.json();
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login: login
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
      password: password
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
      name: name
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login: login
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
      password: password
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}
