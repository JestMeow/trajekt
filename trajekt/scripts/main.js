console.warn("Ballz");
//import
import { world, system } from "@minecraft/server";
//important constants
let overworld = world.getDimension("overworld");
let entities = overworld.getEntities();

const objectives = ["pos.x", "pos.y", "pos.z", "rpos.x", "rpos.y", "rpos.z", "?pos.x", "?pos.y", "?pos.z", "?head.x", "?head.y", "?head.z", "?v.x", "?v.y", "?v.z", "break.x", "break.y", "break.z", "place.x", "place.y", "place.z", "impulse.x", "impulse.y", "impulse.z"];

system.runInterval(() => {
    overworld = world.getDimension("overworld");
    entities = overworld.getEntities();
    for (let objective of objectives) {
        if (!world.scoreboard.getObjective(objective)) {
            world.scoreboard.addObjective(objective);
        }
    }
}, 5);

//pos score
let posx = world.scoreboard.getObjective("pos.x");
let posy = world.scoreboard.getObjective("pos.y");
let posz = world.scoreboard.getObjective("pos.z");
//rpos score
let rposx = world.scoreboard.getObjective("rpos.x");
let rposy = world.scoreboard.getObjective("rpos.y");
let rposz = world.scoreboard.getObjective("rpos.z");
//location score
let tposx = world.scoreboard.getObjective("?pos.x");
let tposy = world.scoreboard.getObjective("?pos.y");
let tposz = world.scoreboard.getObjective("?pos.z");
//head location score
let hposx = world.scoreboard.getObjective("?head.x");
let hposy = world.scoreboard.getObjective("?head.y");
let hposz = world.scoreboard.getObjective("?head.z");
//velocity test score
let vx = world.scoreboard.getObjective("?v.x");
let vy = world.scoreboard.getObjective("?v.y");
let vz = world.scoreboard.getObjective("?v.z");
//block break location
let breakx = world.scoreboard.getObjective("break.x");
let breaky = world.scoreboard.getObjective("break.y");
let breakz = world.scoreboard.getObjective("break.z");
//block place location
let placex = world.scoreboard.getObjective("place.x");
let placey = world.scoreboard.getObjective("place.y");
let placez = world.scoreboard.getObjective("place.z");
//impulse
let impulsex = world.scoreboard.getObjective("impulse.x");
let impulsey = world.scoreboard.getObjective("impulse.y");
let impulsez = world.scoreboard.getObjective("impulse.z");

const effectsID = ["speed", "jump_boost", "invisibility"];

function rpos(target, obj, str1, str2) {
    if (obj.hasParticipant(target) && !obj.getScore(target) == 0) target.runCommandAsync("tp @s " + str1 + obj.getScore(target) / 1000 + str2), obj.setScore(target, 0);
}
function testif(target, objx, objy, objz, str, what) {
    if (target.hasTag(str)) objx.setScore(target, what.x * 1000), objy.setScore(target, what.y * 1000), objz.setScore(target, what.z * 1000); else if (!target.hasTag(str)) objx.removeParticipant(target), objy.removeParticipant(target), objz.removeParticipant(target);
}
function tagif(a, b) {
    if (a[b] == true) {
        a.addTag("?" + b);
    }
    if (a[b] == false) {
        a.removeTag("?" + b);
    }
}
//runs every tick
system.runInterval(() => {
    for (let entity of entities) {
        //pos
        if (posx.hasParticipant(entity)) entity.runCommandAsync("tp @s " + posx.getScore(entity) / 1000 + " ~~"), posx.removeParticipant(entity);
        if (posy.hasParticipant(entity)) entity.runCommandAsync("tp @s ~ " + posy.getScore(entity) / 1000 + " ~"), posy.removeParticipant(entity);
        if (posz.hasParticipant(entity)) entity.runCommandAsync("tp @s ~~ " + posz.getScore(entity) / 1000), posz.removeParticipant(entity);
        //rpos
        rpos(entity, rposx, "~", "~~");
        rpos(entity, rposy, "~~", "~");
        rpos(entity, rposz, "~~~", "");
        //get pos
        testif(entity, tposx, tposy, tposz, "?pos", entity.location);
        //head pos
        testif(entity, hposx, hposy, hposz, "?head", entity.getHeadLocation());
        //get velocity
        testif(entity, vx, vy, vz, "?velocity", entity.getVelocity());
        //some stuff
        if (entity.hasTag(".remove")) {
            entity.remove();
        }
        //impulse
        if (impulsex.hasParticipant(entity)) {
            entity.clearVelocity();
            entity.applyImpulse({ x: impulsex.getScore(entity) / 1000, y: 0, z: 0 });
            impulsex.removeParticipant(entity);
        }
        if (impulsey.hasParticipant(entity)) {
            entity.clearVelocity();
            entity.applyImpulse({ x: 0, y: impulsey.getScore(entity) / 1000, z: 0 });
            impulsey.removeParticipant(entity);
        }
        if (impulsez.hasParticipant(entity)) {
            entity.clearVelocity();
            entity.applyImpulse({ x: 0, y: 0, z: impulsez.getScore(entity) / 1000 });
            impulsez.removeParticipant(entity);
        }
        //player stuff
        tagif(entity, "isClimbing");
        tagif(entity, "isInWater");
        tagif(entity, "isOnGround");
        tagif(entity, "isSleeping");
        tagif(entity, "isSneaking");
        tagif(entity, "isSprinting");
        tagif(entity, "isSwimming");
        tagif(entity, "isValid");
        //effects
        for (let effects of effectsID) {
            if (world.scoreboard.getObjective(effects) && world.scoreboard.getObjective(effects).displayName == effects && world.scoreboard.getObjective(effects).hasParticipant(entity)) {
                let objective = world.scoreboard.getObjective(effects);
                if (objective.getScore(entity) - Math.floor(objective.getScore(entity) / 10) * 10 > 0) {
                    entity.addEffect(objective.displayName, Math.floor(objective.getScore(entity) / 10000) - 10000, { amplifier: (objective.getScore(entity) - Math.floor(objective.getScore(entity) / 10000) * 10000) / 10, showParticles: true });
                } else if (objective.getScore(entity) - Math.floor(objective.getScore(entity) / 10) * 10 <= 0) {
                    entity.addEffect(objective.displayName, Math.floor(objective.getScore(entity) / 10000) - 10000, { amplifier: (objective.getScore(entity) - Math.floor(objective.getScore(entity) / 10000) * 10000) / 10, showParticles: false });
                }
                objective.removeParticipant(entity);
            }
        }
    }
}, 5);
world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    if (eventData.player.hasTag("!breakBlocks")) {
        eventData.cancel = true;
    }
});
world.afterEvents.playerBreakBlock.subscribe((eventData) => {
    let player = eventData.player;
    breakx.setScore(player, eventData.block.location.x * 1000);
    breaky.setScore(player, eventData.block.location.y * 1000);
    breakz.setScore(player, eventData.block.location.z * 1000);
});
world.afterEvents.playerPlaceBlock.subscribe((eventData) => {
    let player = eventData.player;
    placex.setScore(player, eventData.block.location.x * 1000);
    placey.setScore(player, eventData.block.location.y * 1000);
    placez.setScore(player, eventData.block.location.z * 1000);
})