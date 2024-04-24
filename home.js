function addWorld(){
    let name = document.getElementById("newWorldName").value;

    if (localStorage.getItem(name) != null){
        alert("\""+name+"\" already exists!");
        //clear the input field
        document.getElementById("newWorldName").value = "";
    }
    else{
        localStorage.setItem(name, JSON.stringify({"Overworld":[], "Nether":[], "End":[]}) );
        document.getElementById("newWorldName").value = "";
    }

    location.reload();
}

function loadWorlds(){
    let len = localStorage.length;
    let count = 0;
    for (world in localStorage){
        //Ignore the 6 builtin functions
        if (count<len){
            let div = document.createElement("div");
            div.setAttribute("class", "worldDiv");
            div.setAttribute("id", world);
            let head = document.createElement("h2");
            head.innerHTML = world;
            head.setAttribute("class", "worldHead");
            head.setAttribute("onclick", "openClose(\""+world+"\")");
            let x = document.createElement("img");
            x.setAttribute("src", "x.png");
            x.setAttribute("class", "headx");
            x.setAttribute("onclick", "removeItem(\"world\", \""+world+"\")");

            div.appendChild(head);
            div.appendChild(x);

            document.getElementById("worldlist").appendChild(div);
        }

        count++;
    }
}

function dropdown(name){
    let data = localStorage[name];
    data = JSON.parse(data);
    
    let div = document.createElement("div");
    div.setAttribute("id", name+"-data");

    for (realm in data){
        let realmdiv = document.createElement("div");
        realmdiv.setAttribute("id", realm);
        let count = 0;
        for (coordset in data[realm]){
            let coordText = document.createElement("p");
            coordText.innerHTML = data[realm][coordset].toString().replaceAll(",", ", ");
            coordText.setAttribute("class", "coordText");

            let x = document.createElement("img");
            x.setAttribute("src", "x.png");
            x.setAttribute("class", "coordx");
            x.setAttribute("onclick", "removeItem(\"coordinate\", \""+name+"\", \""+realm+"\", "+count+")");

            realmdiv.appendChild(coordText);
            realmdiv.appendChild(x);
            count++;
        }
        div.appendChild(realmdiv);
    }

    let newCoordForm = document.createElement("div");
    let newCoordComText = document.createElement("p");
    newCoordComText.innerHTML = "Enter coord description";
    let newCoordComment = document.createElement("input");
    newCoordComment.setAttribute("type", "text");
    newCoordComment.setAttribute("id", "comment");
    let newCoordText = document.createElement("p");
    newCoordText.innerHTML = "Add new coord set";
    let newCoordX = document.createElement("input");
    newCoordX.setAttribute("type", "text");
    newCoordX.setAttribute("id", "X");
    let newCoordY = document.createElement("input");
    newCoordY.setAttribute("type", "text");
    newCoordY.setAttribute("id", "Y");
    let newCoordZ = document.createElement("input");
    newCoordZ.setAttribute("type", "text");
    newCoordZ.setAttribute("id", "Z");
    let newCoordSubmit = document.createElement("button");
    newCoordSubmit.innerHTML = "Submit";
    newCoordSubmit.setAttribute("onclick", "addCoords(\""+name+"\")");
    let OWcheck = document.createElement("input");
    OWcheck.setAttribute("type", "checkbox");
    OWcheck.setAttribute("name", "Overworld");
    OWcheck.setAttribute("id", "owcheck");
    let OWlabel = document.createElement("label");
    OWlabel.setAttribute("for", "Overworld");
    OWlabel.innerHTML = "Overworld";
    let Nethercheck = document.createElement("input");
    Nethercheck.setAttribute("type", "checkbox");
    Nethercheck.setAttribute("name", "Nether");
    Nethercheck.setAttribute("id", "nethercheck")
    let Netherlabel = document.createElement("label");
    Netherlabel.setAttribute("for", "Nether");
    Netherlabel.innerHTML = "Nether";
    let Endcheck = document.createElement("input");
    Endcheck.setAttribute("type", "checkbox");
    Endcheck.setAttribute("name", "End");
    Endcheck.setAttribute("id", "endcheck")
    let Endlabel = document.createElement("label");
    Endlabel.setAttribute("for", "End");
    Endlabel.innerHTML = "End";

    let br = document.createElement("br");

    newCoordForm.appendChild(newCoordComText);
    newCoordForm.appendChild(newCoordComment);
    newCoordForm.appendChild(newCoordText);
    newCoordForm.appendChild(newCoordX);
    newCoordForm.appendChild(newCoordY);
    newCoordForm.appendChild(newCoordZ);
    newCoordForm.appendChild(br);
    newCoordForm.appendChild(OWcheck);
    newCoordForm.appendChild(OWlabel);
    newCoordForm.appendChild(Nethercheck);
    newCoordForm.appendChild(Netherlabel);
    newCoordForm.appendChild(Endcheck);
    newCoordForm.appendChild(Endlabel);
    newCoordForm.appendChild(br.cloneNode(false));
    newCoordForm.appendChild(newCoordSubmit);

    let parent = document.getElementById(name);
    
    div.appendChild(newCoordForm);

    parent.appendChild(div);
}

function addCoords(name){
    let com = document.getElementById("comment").value;
    let x = parseInt(document.getElementById("X").value);
    let y = parseInt(document.getElementById("Y").value);
    let z = parseInt(document.getElementById("Z").value);

    let ow = document.getElementById("owcheck").checked;
    let nether = document.getElementById("nethercheck").checked;
    let end = document.getElementById("endcheck").checked;

    let data = JSON.parse(localStorage[name]);
    let newdata = "";
    
    if (ow == true){
        newdata = data["Overworld"];
        newdata.push( [com, x, y, z] );
    }
    else if (nether == true){
        newdata = data["Nether"]
        newdata.push( [com, x, y, z] );
    }
    else{
        newdata = data["End"]
        newdata.push( [com, x, y, z] );
    }

    localStorage.setItem(name, JSON.stringify(data));

    //clear input boxes
    document.getElementById("comment").value = "";
    document.getElementById("X").value = "";
    document.getElementById("Y").value = "";
    document.getElementById("Z").value = "";
    document.getElementById("owcheck").checked = false;
    document.getElementById("nethercheck").checked = false;
    document.getElementById("endcheck").checked = false;

    location.reload();
}

openWorld = "";

function openClose(name){
    let exists = document.getElementById(name+"-data");
    if (exists == null){
        if (openWorld != ""){
            openClose(openWorld);
        }
        openWorld = name;
        dropdown(name);
    }
    else{
        exists.remove();
        openWorld = ""
    }
}

function remove(array, index){
    //remove item from array by index
        array.splice(index, 1); // 2nd parameter means remove one item only
    return array;
}

function removeItem(type, world, realm=null, itemloc=null){
    if (type == "world"){
        let conf = confirm("Are you sure you want to delete the world \""+world+"\" ?");
        if (conf == true){
            localStorage.removeItem(world);
            
            location.reload();
        }
    }
    else if (type == "coordinate"){
        let conf = confirm("Are you sure you want to delete the "+realm+" coordinate in position "+(itemloc+1)+" from world \""+world+"\" ?");
        if (conf == true){
            let storage = JSON.parse(localStorage.getItem(world));
            let newdata = storage[realm];
            newdata = remove(newdata, itemloc);
            storage[realm] = newdata;
            
            localStorage.setItem(world, JSON.stringify(storage));

            location.reload();
        }
    }
}
