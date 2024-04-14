# trajekt
Scripts for Minecraft: Bedrock Edition

Too lazy to write stuff here so I'll write some stuff later.

**Features:**
- Math functions for scoreboard. Can be done by tagging a target "math:<functionName>(<scoreboardObjectiveName>)".
- - Available functions are:
  - - sin *//sine*
    - asin *//arcsine*
    - cos *//cosine*
    - acos *//arccosine*
    - tan *//tangent*
    - atan *//arctangent*
    - log *//natural logarithm*
    - log10 *//base 10 logarithm*
    - sqr *//square*
    - sqrt *//square root*
    - cbe *//cube*
    - cbrt *//cube root*
- Apply an effect to a target with specific time value.
- - How to use:
  - - 1) Give a scoreboard objective with a name equal to an effect indentifier to an entity.
      2) Set the value to 1<duration(ticks)><amplifier><showParticle?> (bare with me). Where duration is 4 digits, amplifier is 3 digits, and showParticle is 1 digit.
      3) Example: "jump_boost 124000010"
         - Effect: Jump Boost
         - Duration: 2400 ticks
         - Amplifier: 1
         - ShowParticles: false
- Detect some player actions by applying a tag "?" + <action>.
- - Detectable actions:
  - isOnGround
  - isInWater
  - isSprinting
  - isSleeping
  - isSwimming
- Get an entity's position in scoreboard objective form by giving it tag "?pos".
- - Scoreboard objective for getting an entity's position is "?pos.x", "?pos.y", "?pos.z".
- Scoreboard objectives that can modify the position of an entity.
- - **Objectives:**
  - Absolute position:
  - - pos.x
    - pos.y
    - pos.z
  - Relative position:
  - - rpos.x
    - rpos.y
    - rpos.z
- 

