var gridData = {
    columns: 4,
    textColor: "white",
    modal: false,
    openNewWindow: true,
    data: []
}

// Populate grid data
for (var i = 0; i < vscoImages.length; i++) {
    var currentImage = vscoImages[i];
    var rawImageLink = "http://" + currentImage.substring(0, currentImage.length);
    rawImageLink = rawImageLink.replace("?w=600", "?w=1200"); // Higher resolution

    var gridItem = {
        title: `Image ${i}`,
        subtitle: "I'm a subtitle",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor neque, rhoncus id rhoncus quis, vestibulum non justo. Morbi condimentum, nisl at vestibulum finibus, velit sem condimentum est, a ullamcorper urna est ut nibh. Cras sagittis, lorem in facilisis congue, ipsum nunc tempus sapien, nec varius velit ante eget nisl.",
        image: "http://" + currentImage,
        link: rawImageLink,
        size: "1",
        category: {
          label: "Category",
          color: "orange"
        }
    }

    gridData.data.push(gridItem); // Add to data
}
