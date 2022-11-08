#! /usr/bin/env node

var path = require("path");
var fs = require("fs");

const folders = ["flooring", "wallpaint", "wallpaper"];
for (let index in folders) {
    let folder = folders[index];
    const filePath = path.join(path.resolve("public"), folder);
    const preview = fs
        .readdirSync(filePath)
        .filter(
            (name) =>
                !(
                    name.endsWith("Small.png") ||
                    name.endsWith("Medium.png") ||
                    name.endsWith("Large.png")
                )
        );

    const generatedSourcePath = path.join(
        path.resolve("public"),
        "generatedSource"
    );
    fs.promises
        .mkdir(generatedSourcePath, { recursive: true })
        .catch(console.error);
    fs.writeFile(
        `${generatedSourcePath}/${folder}.json`,
        JSON.stringify(preview),
        function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
        }
    );
}
