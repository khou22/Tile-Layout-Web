# Tile-Layout-Web Library
### Author: Kevin Hou
#### Description:

A useful grid view for both static and dynamic websites. For tiles with text, there is a title, subtitle, description, and category (label and color). When the user hovers over the tile, the display will darken and the description will slide up. For tiles that do not rely on text (referred to as Photo Tiles), it will zoom the image in the tile. If you click on a photo tile, it will display a modal — like a gallery. There is also lazy loading so no images should appear black while the content loads. This is especially useful for pages with hundreds of tiles. Here are two examples of the hovering animation:

**Tile**<br>
<img src="tile-demo.gif" width="250" />

**Photo Tile**<br>
<img src="photo-tile-demo.gif" width="250" />

## Installation
``` bash
$ npm install --save git+https://git@github.com/khou22/tile-layout-web.git#releasetag
```

## Development
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

## Building
For production: ``` $ npm run build-prod ```

For the demo product (watches/rebuilds on file changes): ``` $ npm run build-demo ```

## Usage in Compiled Website
1. Include the TileGrid component:
    ``` javascript
    import TileGrid from 'tile-layout-web';
    ```

2. Write and declare the gridData object variable<br>
    **For tiles with text:**
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

    **For tiles with just photos:**
    ``` javascript
    var gridData = {
        columns: 3,
        modal: true, // This is unique to photos, it can open a modal with a larger photo
        openNewWindow: true,
        data: [
            {
                image: "...",
                link: "#",
                size: 1,
            },
            ...
        ]
    }
    ```

3. Include the necessary props
    ``` html
    <GridView
        gridID="grid"               - ID for the grid (purely cosmetic)
        data={gridData}             - Grid data from step 2
        columns=3                   - Number of columns
        textColor="white"           - Color of text
        openNewWindow=true          - Whether to open new window when click
    />
    ```

## Usage in Static Website
1. Write and declare the gridData object variable (see step 2 above)

2. Include in HTML

    *The order is imperative.*
    ``` html
    <div id='grid' class="main-div"></div>
    <script src="data.js"></script>
    <script src="index_bundle.js"></script>
    ```
