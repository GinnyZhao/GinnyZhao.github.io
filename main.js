// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let quickView = () => {
    console.log("view");
}

let initProducts = () => {

    let parent = document.getElementById("shirts");
    for (let i = 0;i < shirts.length;i++) {
        shirt = shirts[i];
        all_colors = Object.keys(shirt.colors);
        var newdiv = document.createElement("div");
        var numshirt = Object.keys(shirt.colors).length;
        var quantity_text = "";
        // generate the available color text
        if (numshirt == 1)  {
            quantity_text = "Available in 1 color";
        }
        else {
            quantity_text = "Available in " + numshirt + " colors";
        }
        display_shirt = shirt.colors[all_colors[0]]["front"] || shirt.default.front;
        display_name = shirt.name||"no name";
        // each shirt console
        newdiv.innerHTML = "<img src='"+display_shirt+"' onclick='seepage("+i+")' style='width: 98%; margin-left: 1%; margin-top: 1%; cursor: pointer;'> <p style='margin-left: 10px; color: rgb(181,43,54);'>"+display_name+"</p> <p style='font-size: 12px;'>"+quantity_text+"</p> <div style='display: grid; grid-template-columns: 50% 50%'><a href='#' class='button'>Quick View</a> <button onclick='seepage("+i+")' class='button' style='cursor: pointer; '>See Page</button></div>";

        newdiv.setAttribute("class", "newdiv");
        parent.appendChild(newdiv);
    }

};

// store the index of the shirt 
let seepage = i => {
    localStorage.setItem("num",i);
    window.location.href='details.html';
}

let initDetails = () => {

    var index = localStorage.getItem("num");
    all_colors = Object.keys(shirts[index].colors);
    localStorage.setItem("imagecolor",all_colors[0]);
    localStorage.setItem("imageside", "front");
    let parent = document.getElementById("details");
    var newh2 = document.createElement("h2");
    const text = document.createTextNode(shirts[index].name || "No name");
    newh2.appendChild(text);
    parent.appendChild(newh2);

    var newdiv = document.createElement("div");

    // picture on the left
    const img = document.createElement("img");  
    img.src =  shirts[index].colors[all_colors[0]]["front"] || shirts[index].default.front;
    img.setAttribute("id", "picture");

    img.style["width"] = "100%";
    newdiv.appendChild(img);

    // info on the right
    var rightdiv = document.createElement("div");
    rightdiv.setAttribute("id", "rightdiv");
    var price = document.createElement("h3");
    const price_text = document.createTextNode(shirts[index].price || "Out of Stock");
    price.appendChild(price_text);

    price.style["color"] = "rgb(181,43,54)";
    price.style["font-size"] = "25px";

    var desc = document.createElement("p");
    const desc_text = document.createTextNode(shirts[index].description || "We are still figure that out");
    desc.appendChild(desc_text);

    desc.style["color"] = "rgb(181,43,54)";
    desc.style["font-size"] = "14px";

    // first row of buttton
    let front_end = document.createElement("div");
    front_end.innerHTML = "<p style='font-size: 14px;'> Side: </p>";
    front_end.setAttribute("id", "front_end");
    let f = document.createElement("button");
    f.setAttribute("class", "side_button");
    f.textContent = "Front";
    f.onclick = function() {localStorage.setItem("imageside", "front"); changeimage()};
    f.style["font-size"] = "14px";

    let e = document.createElement("button");
    e.textContent = "Back";
    e.setAttribute("class", "side_button");
    e.onclick = function() {localStorage.setItem("imageside", "back"); changeimage()};
    e.style["font-size"] = "14px";

    front_end.appendChild(f);
    front_end.appendChild(e);

    // second row of button
    var col = document.createElement("div");
    col.innerHTML = "<p style='font-size: 14px'> Color: </p>";
    for (let color of all_colors) {
        var b = document.createElement("button");
        b.setAttribute("class", "color_button");
        b.textContent = color;
        b.onclick = function() {renderimage(color);};
        b.style["background-color"] = color;
        col.appendChild(b);
    }

    col.style["display"] = "flex";

    rightdiv.appendChild(price);
    rightdiv.appendChild(desc);
    rightdiv.appendChild(front_end);
    rightdiv.appendChild(col);

    newdiv.appendChild(rightdiv);
    newdiv.setAttribute("id", "newdiv");

    parent.appendChild(newdiv);
};


// which color is clicked
let renderimage = color => {
    localStorage.setItem("imagecolor",color);
    changeimage();
}

// change the url of picture 
let changeimage = () => {
    c = localStorage.getItem("imagecolor");
    o = localStorage.getItem("imageside");
    console.log(o);
    img = document.getElementById("picture");
    index = localStorage.getItem("num");
    img.src = shirts[index].colors[c][o]|| shirts[index].default[o];
}