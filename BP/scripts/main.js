	console.warn("hello");

import { world, system } from "@minecraft/server";

import { Parser } from "./parser";

const cmdPrefix = ".";
let overworld;// = world.getDimension("overworld");

Math.eval = function (expr, n) {
    return Parser.evaluate(expr.replaceAll("n", n));
}
let removTag = [];
let toAdd = [];


function matchCmd(cmd, sender) {
    if (cmd[0] == "test")
        system.run(() => {
            overworld.runCommand("say a");
        });
    else if (cmd[0] == "graph") {
        for (let i = 0; i < cmd[2]; i++) {
            system.run(() => {
                sender.runCommand(`setblock ~${i} ~${Math.round(Math.eval(cmd[1], i))}~ stone []`);
            });
        }
    }
    else if (cmd[0] == "knock") {
        //.knock <directionX> <directionY> <HorizontalS> <VerticalS> <increment> <rate>
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
        //.knockFacing <HorizontalS> <VerticalS> <T/F> <increment> <rate>
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
        //.teleport <rx> <ry> <rz> <increment> <rate>
        var i = 0;
        var loop = system.runInterval(() => {
            if (i < cmd[4]) {
                system.run(() => {
                    if (sender.isValid() == true)
                        sender.teleport({ x: sender.location.x + Math.eval(cmd[1], i), y: sender.location.y + Math.eval(cmd[2], i), z: sender.location.z + Math.eval(cmd[3], i) });
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
    else if (cmd[0] == "raycast") {
        //.raycast <resolution> <distance> <eyes/feet> <block> <commandMove> <impactCommand>
        system.run(() => {
            for (let i = 0; i < Number(cmd[2]) / Number(cmd[1]); i += Number(cmd[1])) {
                if (sender.dimension.getBlock({ x: sender.getHeadLocation().x + (sender.getViewDirection().x * i), y: sender.getHeadLocation().y + (sender.getViewDirection().y * i), z: sender.getHeadLocation().z + (sender.getViewDirection().z * i) }).typeId == cmd[4])
                    sender.runCommand("execute as @s anchored " + cmd[3] + " positioned ^^^" + i + " run " + cmd[5].slice(1, -1));
                else {
                    sender.runCommand("execute as @s anchored " + cmd[3] + " positioned ^^^" + i + " run " + cmd[6].slice(1, -1));
                    break;
                }
            }
        });
    }
    else if (cmd[0] == "increment") {
        //.increment <ask <scoreboard> <amount>
        //.increment allow id scoreboard amount
        if (cmd[1] == "ask") {
            toAdd.push([sender.id, cmd[2], Number(cmd[3])]);
        } else if (cmd[1] == "allow") {
            for (let entity of overworld.getPlayers()) {
                for (let tag of sender.getTags()) {
                    if (entity.id == tag) {
                        system.run(() => {
                            world.scoreboard.getObjective(toAdd[toAdd.indexOf([sender.id, cmd[2], Number(cmd[3])]) + 1][1]).addScore(entity, Number(cmd[3]));
                            world.sendMessage(toAdd[toAdd.indexOf([sender.id, cmd[2], Number(cmd[3])]) + 1][1])
                        });
                        var index = toAdd.indexOf([sender.id, cmd[2], Number(cmd[3])]);
                        if (index != -1) {
                            removTag.splice(index, 1);
                        }
                    }
                }
            }
        }
    }
    else if (cmd[0] == "tag") {
        if (cmd[3] == "myId") {
            system.run(() => {
                overworld.runCommand("tag " + cmd[1].slice(1, -1) + " " + cmd[2] + " \"" + sender.id + "\"");
            });
        }
        if (cmd[3] == "myTags") {
            for (let tag of sender.getTags()) {
                system.run(() => {
                    overworld.runCommand("tag " + cmd[1].slice(1, -1) + " " + cmd[2] + " \"" + tag + "\"");
                    //world.sendMessage("tag " + cmd[1].slice(1, -1) + " " + cmd[2] + " \"" + tag + "\"")
                });
            }
        }
    }
    else if (cmd[0] == "scoreboard") {
        //scoreboard players eval <id> <exp>
        if (cmd[1] == "self") {
            if (cmd[2] == "eval") {
                system.run(() => {
                    var input = world.scoreboard.getObjective(cmd[3]).getScore(sender);
                    var output = Math.floor(Math.eval(cmd[4], input));
                    world.scoreboard.getObjective(cmd[3]).setScore(sender, output);
                });
            }
        }
    }
    /*system.run(() => {
        if (tag == true) {
            //sender.removeTag("" + sender.getTags()[sender.getTags().length - 1]);
            sender.removeTag(cbmd);
            world.sendMessage(cbmd);
        }
    });*/
}


function ifTrueTag(player, action) {
    system.run(() => {
        if (player[action] == true && !player.hasTag("?" + action)) player.addTag("?" + action)
        else if (player[action] == false && player.hasTag("?" + action)) player.removeTag("?" + action);
    });
}

system.runInterval(() => {
    overworld = world.getDimension("overworld");
    for (let entity of overworld.getEntities()) {
        for (let tag of entity.getTags()) {
            if (tag.substr(0, 1) == cmdPrefix) {
                //matchCmd(tag.substr(1, tag.length).match(/\|.*?\||\S+/g), entity, true, tag);
                matchCmd(tag.substr(1, tag.length).match(/\|.*?\||\S+/g), entity);
                entity.removeTag(tag);
            }
        }
    }
    for (let player of overworld.getPlayers()) {
        for (let tag of removTag) {
            if (player.hasTag(tag) && removTag.length > 0) {
                player.removeTag(tag);
                var index = removTag.indexOf(tag);
                if (index != -1) {
                    removTag.splice(index, 1);
                }
                else break;
            }
        }
        ifTrueTag(player, "isClimbing");
        ifTrueTag(player, "isEmoting");
        ifTrueTag(player, "isFalling");
        ifTrueTag(player, "isFlying");
        ifTrueTag(player, "isGliding");
        ifTrueTag(player, "isInWater");
        ifTrueTag(player, "isJumping");
        ifTrueTag(player, "isOnGround");
        //ifTrueTag(player, "isOp");
        ifTrueTag(player, "isSleeping");
        ifTrueTag(player, "isSneaking");
        ifTrueTag(player, "isSprinting");
        //ifTrueTag(player, "isValid");

    }
});

world.beforeEvents.chatSend.subscribe((ed) => {
    if (ed.message.substr(0, 1) == cmdPrefix) {
        ed.cancel = true;
        //matchCmd(ed.message.substr(1, ed.message.length).split(" "), ed.sender);
        matchCmd(ed.message.substr(1, ed.message.length).match(/\|.*?\||\S+/g), ed.sender);
    }
});
world.beforeEvents.itemUse.subscribe((ed) => {
    system.run(() => {
        ed.source.addTag("?use:" + ed.itemStack.typeId);
        removTag.push("?use:" + ed.itemStack.typeId);
    });
});
//console.warn("aa a ".match(/\[.*?\]|\S+/g)[0]);
//world.