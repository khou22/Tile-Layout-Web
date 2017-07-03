# Installation
1. Install NPM dependencies
``` bash
$ npm install
```
2. Create ESLint config file
``` bash
./node_modules/.bin/eslint --init
```

3. Run the demo
``` bash
$ open demo/index.html
```

# Building


# Usage
1. Write and declare the gridData object variable
``` javascript
// data.js
var gridData = { // Must name it this
    columns: 3, // Number of columns
    textColor: "white", // Color of text
    openNewWindow: true, // Whether clicking on a tile will open a new window
    data: [
        {
          title: "Title",
          subtitle: "Subtitle",
          description: "Lorem ipsum dolor...",
          image: "placeholder.png",
          link: "#",
          size: "2", // Number of horizontal columns it will take up
          category: { // Category tag (see image)
            label: "Category",
            color: "orange"
          }
        },
        ...
    ]
}
```

2. Include in html
The order is imperative.
``` html
<div id='grid' class="main-div"></div>
<script src="data.js"></script>
<script src="index_bundle.js"></script>
```
