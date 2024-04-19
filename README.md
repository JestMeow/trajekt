# trajekt
Scripts for Minecraft: Bedrock Edition
Minecraft version this addon is for is **Minecraft 1.20.70**

Too lazy to write stuff here so I'll write some stuff later.

**Features:**
- Math functions for scoreboard. Can be done by tagging a target "math:\<functionName\>(\<scoreboardObjectiveName\>)".
- Example: "math:sqrt(money)" *//square root the value of "money" objective*
- - Available functions are:
  - - sin *//sine*
    - asin *//arcsine*
    - cos *//cosine*
    - acos *//arccosine*
    - tan *//tangent*
    - atan *//arctangent*
    - exp *//exponential*
    - log *//natural logarithm*
    - log10 *//base 10 logarithm*
    - sqr *//square*
    - sqrt *//square root*
    - cbe *//cube*
    - cbrt *//cube root*
  - Tip:
  - - To get a list of available functions, tag yourself with a question mark symbol ("?").
- Apply an effect to a target with specified time value in ticks.
- - How to use:
  - - 1) Give a scoreboard objective with a name equal to an effect indentifier to an entity.
      2) Set the value to 1\<duration(ticks)\>\<amplifier\>\<showParticle?\> (bare with me). Where duration is 4 digits, amplifier is 3 digits, and showParticle is 1 digit.
      3) Example: "jump_boost 124000010"
         - Effect: Jump Boost
         - Duration: 2400 ticks
         - Amplifier: 1
         - ShowParticles: false
- Detect some player actions by applying a tag "?" + \<action\>.
- - Detectable actions:
  - isClimbing *//if the player is climbing a ladder, a vine, or something similar*
  - isOnGround *//if the player is on the ground*
  - isInWater *//if the player is inside a water*
  - isSleeping *//if the player is sleeping*
  - isSneaking *//if the player is sneaking/crouching*
  - isSprinting *//if the player is sprinting*
  - isSwimming *//if the player is swimming*
  - isValid *//if the player is valid*
- Get an entity's position in scoreboard objective form by giving it tag "?pos".
- - Scoreboard objective for getting an entity's position is "?pos.x", "?pos.y", "?pos.z".
- Get an entity's **head** position in scoreboard objective form by giving it tag "?head".
- - Scoreboard objective for getting an entity's position is "?head.x", "?head.y", "?head.z".
- Get an entity's velocity in scoreboard objective form by giving it tag "?velocity".
- - Scoreboard objective for getting an entity's position is "?v.x", "?v.y", "?v.z".
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
- Scoreboard objectives for modifying the impulse vector of an entity **(Doesn't work on players)**
- - **Objectives:**
  - impulse.x
  - impulse.y
  - impulse.z
- Canceling a player's ability to break blocks by giving them tag "!breakBlocks"
**Notes**
- If something doesn't work, enable content log file and content log GUI to find the answer to your problem.
