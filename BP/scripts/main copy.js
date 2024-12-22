console.warn("hello");

import { world, system } from "@minecraft/server";

import { Parser } from "./parser";

const cmdPrefix = ".";
let overworld;

system.run(() => {
    overworld = world.getDimension("overworld");
});

Math.eval = function (expr, x) {
    return Parser.evaluate(expr.replaceAll("x", x));
}
let turPos;

function matchCmd(cmd, sender) {
    if (cmd[0] == "test")
        system.run(() => {
            overworld.runCommand("say a");
        });
    else if (cmd[0] == "graph") {
        //world.sendMessage("" + Math.eval(cmd[1], cmd[2]));
        var locx = sender.location.x, locy = sender.location.y, locz = sender.location.z;
        for (let i = 0; i < cmd[2]; i++) {
            system.run(() => {
                sender.runCommand("setblock ~" + i + "~" + Math.round(Math.eval(cmd[1], i)) + "~ stone []");
            });
        }
    }
    else if (cmd[0] == "knock") {
        var i = 0;
        var loop = system.runInterval(() => {
            if (i < cmd[5]) {
                system.run(() => {
                    if (sender.isValid() == true)
                        sender.applyKnockback(Math.eval(cmd[1], i), Math.eval(cmd[2], i), Math.eval(cmd[3], i), Math.eval(cmd[4], i));
                });
                i++;
            } else system.clearRun(loop);

        }, Number(cmd[6]));
    }
    else if (cmd[0] == "knockFacing") {
        var vewx = sender.getViewDirection().x, vewz = sender.getViewDirection().z;
        var i = 0;
        var loop = system.runInterval(() => {
            if (i < cmd[4]) {
                system.run(() => {
                    if (sender.isValid() == true && cmd[3] == "true")
                        sender.applyKnockback(sender.getViewDirection().x, sender.getViewDirection().z, Math.eval(cmd[1], i), sender.getViewDirection().y * Math.eval(cmd[2], i));
                    else if (sender.isValid() == true && cmd[3] == "false") {
                        sender.applyKnockback(vewx, vewz, Math.eval(cmd[1], i), Math.eval(cmd[2], i));
                    }
                });
                i++;
            } else system.clearRun(loop);

        }, Number(cmd[5]));
    }
    else if (cmd[0] == "teleport") {
        var i = 0;
        var loop = system.runInterval(() => {
            if (i < cmd[4]) {
                system.run(() => {
                    if (sender.isValid() == true)
                        sender.runCommandAsync("tp @s ~" + Math.eval(cmd[1], i) + "~" + Math.eval(cmd[2], i) + "~" + Math.eval(cmd[3], i));
                });
                i++;
            } else system.clearRun(loop);

        }, Number(cmd[5]));
    }
    else if (cmd[0] == "wat") {
        system.run(() => {
            console.warn("" + sender.dimension.getBlock({ x: sender.location.x, y: sender.location.y - 1, z: sender.location.z }).typeId);
        });
    }
    else if (cmd[0] == "tur" && cmd[1] == "pos") {
        turPos = { x: Math.floor(sender.location.x), y: Math.floor(sender.location.y), z: Math.floor(sender.location.z) };
        world.sendMessage("Set tur pos to " + turPos.x + " " + turPos.y + " " + turPos.z);
    }

    else if (cmd[0] == "tur" && cmd[1] == "run" && cmd[2] == "num") {
        var num = [];
        var totalNum = 0;
        var twoNum = "";
        var px = turPos.x + 1, n = 0;
        var block = sender.dimension.getBlock({ x: px, y: turPos.y, z: turPos.z });
        while (block.typeId == "minecraft:black_wool" || block.typeId == "minecraft:white_wool") {


            if (block.typeId == "minecraft:black_wool") {
                num.push(1);
            } else if (block.typeId == "minecraft:white_wool") {
                num.push(0);
            }
            //console.warn(num[n]);
            totalNum += num[n] * (2 ** n);

            px += 1;
            block = sender.dimension.getBlock({ x: px, y: turPos.y, z: turPos.z });
            n++;
        }
        for (let i = 0; i < num.length; i++) {
            twoNum += num[num.length - 1 - i];
        }
        world.sendMessage("Value in base two is: " + twoNum);
        world.sendMessage("Value in base ten is: " + totalNum);
    }

    else if (cmd[0] == "tur" && cmd[1] == "run" && cmd[2] == "ascii") {
        var charType = "", outputText = "";
        var num = [], char = [];
        var totalNum = 0;
        var twoNum = "";
        var px = turPos.x + 1, n = 0;
        var block = sender.dimension.getBlock({ x: px, y: turPos.y, z: turPos.z });
        while (block.typeId == "minecraft:black_wool" || block.typeId == "minecraft:white_wool" || block.typeId == "minecraft:gold_block") {
            if (block.typeId != "minecraft:gold_block") {
                if (block.typeId == "minecraft:black_wool") {
                    num.push(1);
                } else if (block.typeId == "minecraft:white_wool") {
                    num.push(0);
                }
                totalNum += num[n] * (2 ** n);
                n++;
            }
            else if (block.typeId == "minecraft:gold_block") {
                switch (totalNum) {
                    case 32: charType = " "; break;
                    case 65: charType = "A"; break;
                    case 66: charType = "B"; break;
                    case 67: charType = "C"; break;
                    case 68: charType = "D"; break;
                    case 69: charType = "E"; break;
                    case 70: charType = "F"; break;
                    case 71: charType = "G"; break;
                    case 72: charType = "H"; break;
                    case 73: charType = "I"; break;
                    case 74: charType = "J"; break;
                    case 75: charType = "K"; break;
                    case 76: charType = "L"; break;
                    case 77: charType = "M"; break;
                    case 78: charType = "N"; break;
                    case 79: charType = "O"; break;
                    case 80: charType = "P"; break;
                    case 81: charType = "Q"; break;
                    case 82: charType = "R"; break;
                    case 83: charType = "S"; break;
                    case 84: charType = "T"; break;
                    case 85: charType = "U"; break;
                    case 86: charType = "V"; break;
                    case 87: charType = "W"; break;
                    case 88: charType = "X"; break;
                    case 89: charType = "Y"; break;
                    case 90: charType = "Z"; break;
                }
                char.push(charType);
                num.length = 0;
                totalNum = 0;
                n = 0;
            }
            px += 1;
            block = sender.dimension.getBlock({ x: px, y: turPos.y, z: turPos.z });
        }
        for (let i = 0; i < char.length; i++) {
            outputText += char[i];
        }
        //world.sendMessage("" + totalNum)
        world.sendMessage("Output: " + outputText);
    }
    system.run(() => {
        sender.removeTag("" + sender.getTags()[sender.getTags().length - 1]);
    });
}

system.runInterval(() => {
    for (let entity of overworld.getEntities()) {
        for (let tag of entity.getTags()) {
            if (tag.substr(0, 1) == cmdPrefix)
                matchCmd(tag.substr(1, tag.length).split(" "), entity);
            //entity.getViewDirection().x
        }
    }
    try {
        overworld.runCommand("particle minecraft:obsidian_glow_dust_particle " + turPos.x + " " + (turPos.y + 0.5) + " " + turPos.z);
    } catch (er) { }
}, 5);

world.beforeEvents.chatSend.subscribe((eventData) => {
    if (eventData.message.substr(0, 1) == cmdPrefix) {
        eventData.cancel = true;
        matchCmd(eventData.message.substr(1, eventData.message.length).split(" "), eventData.sender);
    }
});