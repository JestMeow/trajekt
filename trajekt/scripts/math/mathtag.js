console.warn("Math");

//import
import { world, system } from "@minecraft/server";
//important constants
let overworld = world.getDimension("overworld");
let entities = overworld.getEntities();
const listFuncs = ["math:sin(x)", "math:cos(x)", "math:tan(x)", "math:log(x)", "math:log10(x)", "math:sqr(x)", "math:sqrt:(x)", "math:cbe(x)", "math:cbrt(x)"];

//main stuff
system.runInterval(() => {
    overworld = world.getDimension("overworld");
    entities = overworld.getEntities();
    for (let entity of entities) {
        if (entity.hasTag("?")) {
            for (let func of listFuncs) {
                world.sendMessage(func);
            }
            entity.removeTag("?");
        }
        for (let tag of entity.getTags()) {
            //sine
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:sin(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.sin(world.scoreboard.getObjective(tag).getScore(entity) * Math.PI / 180000) * 1000);
                entity.removeTag("math:sin(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //arcsine
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:asin(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.asin(world.scoreboard.getObjective(tag).getScore(entity) / 1000) * 180 / Math.PI * 1000);
                entity.removeTag("math:asin(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //cosine
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:cos(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.cos(world.scoreboard.getObjective(tag).getScore(entity) * Math.PI / 180000) * 1000);
                entity.removeTag("math:cos(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //arcosine
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:acos(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.acos((world.scoreboard.getObjective(tag).getScore(entity) * 180) / (1000 * Math.PI)) * 1000);
                entity.removeTag("math:acos(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //tangent
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:tan(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.tan(world.scoreboard.getObjective(tag).getScore(entity) * Math.PI / 180000) * 1000);
                entity.removeTag("math:tan(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //arctangent
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:atan(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.atan((world.scoreboard.getObjective(tag).getScore(entity) * 180) / (1000 * Math.PI)) * 1000);
                entity.removeTag("math:atan(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //log
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:log(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.log(world.scoreboard.getObjective(tag).getScore(entity) / 1000) * 1000);
                entity.removeTag("math:log(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //log10
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:log10(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.log10(world.scoreboard.getObjective(tag).getScore(entity) / 1000) * 1000);
                entity.removeTag("math:log10(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //square
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:sqr(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.pow(world.scoreboard.getObjective(tag).getScore(entity) / 1000, 2) * 1000);
                entity.removeTag("math:sqr(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //square root
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:sqrt(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.sqrt(world.scoreboard.getObjective(tag).getScore(entity) / 1000) * 1000);
                entity.removeTag("math:sqrt(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //cube
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:cbe(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.pow(world.scoreboard.getObjective(tag).getScore(entity) / 1000, 3) * 1000);
                entity.removeTag("math:cbe(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
            //cube root
            if (world.scoreboard.getObjective(tag) && entity.hasTag("math:cbrt(" + world.scoreboard.getObjective(tag).displayName + ")")) {
                world.scoreboard.getObjective(tag).setScore(entity, Math.cbrt(world.scoreboard.getObjective(tag).getScore(entity) / 1000) * 1000);
                entity.removeTag("math:cbrt(" + world.scoreboard.getObjective(tag).displayName + ")");
            }
        }
    }
}, 5);