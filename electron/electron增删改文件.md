```javascript
var remote = require('remote'); // Load remote compnent that contains the dialog dependency
var dialog = remote.require('dialog'); // Load the dialogs component of the OS
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
```

```javascript
var app = require('electron').remote; 
var dialog = app.dialog;

// Or with ECMAScript 6
const {dialog} = require('electron').remote;
```

1、create

```javascript
let content = "Some text to save into the file";

// You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
dialog.showSaveDialog((fileName) => {
    if (fileName === undefined){
        console.log("You didn't save the file");
        return;
    }

    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
                            alert("The file has been succesfully saved");
    });
}); 
```

2、Read file content

To read a file path we will use the File System too and the the native read file dialog.

```javascript
dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }

    fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        console.log("The file content is : " + data);
    });
});


// Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
// And obviously , loop through the fileNames and read every file manually
dialog.showOpenDialog({     properties: [         'openFile', 'multiSelections', (fileNames) => {
            console.log(fileNames);
        }
    ]
});
```

## Update existing file content

To update an existing file, we need only the filepath (you can retrieve it if you want with the filedialog again or use a previous saved filepath) using the following code:

```javascript
var filepath = "C:/Previous-filepath/existinfile.txt";// you need to save the filepath when you open the file to update without use the filechooser dialog againg
var content = "This is the new content of the file";

fs.writeFile(filepath, content, (err) => {
    if (err) {
        alert("An error ocurred updating the file" + err.message);
        console.log(err);
        return;
    }

    alert("The file has been succesfully saved");
});
```

## Delete a file

To delete a file you only the need the path to the file and use the exists and unlink method. The exists method checks if the file exists, then procceed to delete the file with the unlink method.

```javascript
var filepath = "C:/Path-toFile/file.txt";// Previously saved path somewhere

if (fs.existsSync(filepath)) {
    fs.unlink(filepath, (err) => {
        if (err) {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
        }
        console.log("File succesfully deleted");
    });
} else {
    alert("This file doesn't exist, cannot delete");
}
```

## Selecting a folder

You can select a folder with the dialog in order to retrieve the folder path:

```javascript
dialog.showOpenDialog({
    title:"Select a folder",
    properties: ["openDirectory"]
}, (folderPaths) => {
    // folderPaths is an array that contains all the selected paths
    if(fileNames === undefined){
        console.log("No destination folder selected");
        return;
    }else{
        console.log(folderPaths);
    }
});
```

demo

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Our Code World</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div>
            <div style="text-align:center;">
                <input type="text" placeholder="Please select a file" id="actual-file" disabled="disabled"/>
                <input type="button" value="Choose a file" id="select-file"/>
            </div>
            <br><br>
            <textarea id="content-editor" rows="5"></textarea><br><br>
            <input type="button" id="save-changes" value="Save changes"/>
            <input type="button" id="delete-file" value="Delete file"/>
        </div>
        <hr>
        <div style="text-align:center;">
            <p>
                The file content will be the same as the editor.            </p>
            <input type="button" value="Choose a file" id="create-new-file"/>
        </div>
        <script>
            var remote = require('remote');             var dialog = remote.require('dialog');
            var fs = require('fs');
                            document.getElementById('select-file').addEventListener('click',function(){
                dialog.showOpenDialog(function (fileNames) {
                    if(fileNames === undefined){
                        console.log("No file selected");
                    }else{
                        document.getElementById("actual-file").value = fileNames[0];
                        readFile(fileNames[0]);
                    }
                });             },false);
                        document.getElementById('save-changes').addEventListener('click',function(){
                var actualFilePath = document.getElementById("actual-file").value;
                                if(actualFilePath){
                    saveChanges(actualFilePath,document.getElementById('content-editor').value);
                }else{
                    alert("Please select a file first");
                }
            },false);
                        document.getElementById('delete-file').addEventListener('click',function(){
                var actualFilePath = document.getElementById("actual-file").value;
                                if(actualFilePath){
                    deleteFile(actualFilePath);
                    document.getElementById("actual-file").value = "";
                    document.getElementById("content-editor").value = "";
                }else{
                    alert("Please select a file first");
                }
            },false);
                        document.getElementById('create-new-file').addEventListener('click',function(){
                var content = document.getElementById("content-editor").value;
                                dialog.showSaveDialog(function (fileName) {
                    if (fileName === undefined){
                        console.log("You didn't save the file");
                        return;
                    }
                                        fs.writeFile(fileName, content, function (err) {
                        if(err){
                            alert("An error ocurred creating the file "+ err.message)
                        }
                                                alert("The file has been succesfully saved");
                    });
                });             },false);
                        function readFile(filepath) {
                fs.readFile(filepath, 'utf-8', function (err, data) {
                    if(err){
                        alert("An error ocurred reading the file :" + err.message);
                        return;
                    }
                                        document.getElementById("content-editor").value = data;
                });
            }
                        function deleteFile(filepath){
                fs.exists(filepath, function(exists) {
                    if(exists) {
                        // File exists deletings
                        fs.unlink(filepath,function(err){
                            if(err){
                                alert("An error ocurred updating the file"+ err.message);
                                console.log(err);
                                return;
                            }
                        });
                    } else {
                        alert("This file doesn't exist, cannot delete");
                    }
                });
            }
                        function saveChanges(filepath,content){
                fs.writeFile(filepath, content, function (err) {
                    if(err){
                        alert("An error ocurred updating the file"+ err.message);
                        console.log(err);
                        return;
                    }
                                        alert("The file has been succesfully saved");
                });             }
        </script>
    </body>
</html>
```



[https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework](https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework)
