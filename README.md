# Codetime Card

Get dynamically generated Codetime stats for your README files.

### Prerequirements
- Download the VScode extension [Codetime](https://marketplace.visualstudio.com/items?itemName=Jannchie.codetime)
- Log in to the [Codetime](https://codetime.dev/) website and get a token (it is needed both to connect the extension and to get `userID`)
- Run the following command in the terminal:
    ```sh
    curl https://api.codetime.dev/v3/users/self \
    --header 'Authorization: Bearer YOUR_TOKEN'
    ```

    We need the `id` from the response

    ```json
    {
    "id":34502, //this one
    "email":null,
    "username":"QueenDekim",
    "avatar":"https://avatars.githubusercontent.com/u/85904783?v=4",
    "githubId":85904783,
    "bio":null,
    "googleId":null,
    "plan":"free",
    "timezone":null,
    "uploadToken":"**********",
    "planExpiresAt":null,
    "planStatus":null,
    "createdAt":"2024-12-29T15:38:55.291194Z",
    "updatedAt":"2024-12-29T15:38:55.291194Z"
    }
    ```
    You will use this `id` to create a card in the following instructions.

### Using
Use the HTML `img` tag:

```html
<img height="140px"
  src="https://codetime-card.vercel.app/?userID=34502"
/>
```
Or use the Markdown image syntax:

```md
![Codetime Card](https://codetime-card.vercel.app/?userID=34502)
```

<img height="140px"
  src="https://codetime-card.vercel.app/?userID=34502"
/>

You can also get programming language statistics using the `type=languages` parameter:

```html
<img height="180px"
  src="https://codetime-card.vercel.app/?userID=34502&type=languages&top_n=5"
/>
```

```md
![Codetime Languages Card](https://codetime-card.vercel.app/?userID=34502&type=languages&top_n=5)
```

The `top_n` parameter is used to indicate the number of languages

<img height="180px"
  src="https://codetime-card.vercel.app/?userID=34502&type=languages&top_n=5"
/>

You must provide a valid `userID`. Additionally, Codetime Card supports
several options (with their default values):
```js
showLogo: true
theme: [tomorrow, dracula, gruvboxdark, gruvboxlight, ...]
showBorder: true
showIcons: true
showAnimations: true
type: time | languages
days: 30 // only for type=languages
top_n: 5 // only for type=languages
```

### Themes
With built-in themes, you can customize the look of the card.

Use `&theme=THEME_NAME` parameter like so:
```md
![Codetime Card](https://codetime-card.vercel.app/?userID=34502&theme=dracula)
```
<details>
<summary>Show example</summary>

![Codetime Card](https://codetime-card.vercel.app/?userID=34502&theme=dracula)

</details>

#### All built-in themes
Codetime Card comes with several built-in themes (E.g. `dracula`, `gruvboxdark`, `gruvboxlight`, `solarizeddark`, `solarizedlight`, `tomorrownight`, `tomorrow`).

See [here](src/themes.js) for all available themes.

#### Use GitHub's theme context tag

You can use [GitHub's theme context](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) to make the card match the user's GitHub theme automatically. Just add `#gh-dark-mode-only` or `#gh-light-mode-only` at the end of an image link.

```md
[![Codetime Card Light](https://codetime-card.vercel.app/?userID=34502&theme=tomorrow#gh-light-mode-only)](https://codetime-card.vercel.app/?userID=34502&theme=tomorrow#gh-light-mode-only)
[![Codetime Card Dark](https://codetime-card.vercel.app/?userID=34502&theme=dracula#gh-dark-mode-only)](https://codetime-card.vercel.app/?userID=34502&theme=dracula#gh-dark-mode-only)
```

#### Use GitHub's new media feature

You can also use [GitHub's new media feature](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/) in HTML to control how cards appear in light or dark themes.

```html
<picture>
  <source
    srcset="https://codetime-card.vercel.app/?userID=34502&theme=tomorrow"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <source
    srcset="https://codetime-card.vercel.app/?userID=34502&theme=dracula"
    media="(prefers-color-scheme: dark)"
  />
  <img src="https://codetime-card.vercel.app/?userID=34502&theme=dracula" />
</picture>
```

### Development

Start
```sh
npm run start
```
and point a browser to

http://localhost:3000/?userID=34502&theme=tomorrow

with the desired options.

### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).