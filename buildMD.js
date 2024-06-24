import { glob } from "glob";
import fs from "fs";
import path from "path";

const mainFile = "README.md";

const order = [
  "Intro.md",
  "Installation.md",
  "Casual.md",
  "NestingOption.md",
  "UsingGroup.md",
  "Templates.md",
  "TemplatesOnSlot.md",
  "UsingSwitch.md",
  "Instances.md",
  "RealWorld.md",
  "Api.md",
  "Props.md",
  "UsageInNuxt.md",
  "Caveats.md",
  "OverflowProtection.md",
];

glob("src/**/*.md")
  .then((files) => {
    if (!files.length) throw new Error("No files found");
    let content = "";
    files
      .sort((a, b) => {
        const aFilename = path.basename(a);
        const bFilename = path.basename(b);
        return order.indexOf(aFilename) - order.indexOf(bFilename);
      })
      .forEach((file) => {
        content += fs.readFileSync(file, "utf8");
      });
    if (fs.existsSync("dist")) {
      console.log("dist exists");
      fs.writeFileSync("dist/README.md", content);
    }
    fs.writeFileSync(mainFile, content);
    console.log("MD build complete");
  })
  .catch((err) => {
    console.error(err);
  });
