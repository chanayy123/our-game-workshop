# Create a 3D Interactive Game: Redirect the Stream

Create a complete, polished, playable 3D game from scratch.

You have broad autonomy over the technical approach, architecture, visual style, physics implementation, libraries, and tools you use.

Do not just create a visual demo. Build an actual small game with a complete gameplay loop.

## Core Fantasy

The player is standing in and around a shallow natural stream.

The main activity is physically modifying the stream:

- block the water
- redirect the water
- split the stream into multiple branches
- create temporary dams
- dig or build new paths for the water

The environment should react visibly and convincingly to what the player builds.

The central experience should be:

> “I changed the terrain, and the water genuinely found a new path.”

The water behavior does not need to be scientifically perfect, but it should be visually convincing, understandable, interactive, and fun.

## Stream

Create a natural outdoor scene containing a flowing stream.

The stream should have:

- visible flow direction
- shallow water
- uneven terrain
- banks
- rocks
- soil / mud
- vegetation and natural environmental details

Water should react dynamically when the player changes the terrain.

For example:

- placing enough rocks across the stream should form a dam
- water should accumulate or reroute
- opening another path should allow water to flow through it
- blocking one branch should increase flow through another
- removing part of a dam should allow water through again

The player's actions should produce clear visual consequences.

## Building / Terrain Interaction

Allow the player to manipulate the stream using at least two materials:

### Rocks

The player can pick up or place rocks.

Rocks are useful for:

- building dams
- blocking channels
- reinforcing structures
- redirecting water

Different rock sizes are encouraged if useful.

### Soil / Mud

The player can place, pile, dig, or manipulate soil.

Soil should be useful for:

- filling gaps
- creating banks
- forming new channels
- reinforcing dams
- redirecting water

You may choose the most practical interaction model.

The controls should feel immediate and intuitive.

## Water Snakes

Add small water snakes living in the stream.

They should not simply be decorative.

They should move through or around the water and react to the player in some way.

Some snakes should occasionally approach or attack the player if the player spends too much time near them.

If a snake reaches and bites the player:

1. the player temporarily loses the ability to build or manipulate terrain
2. the player must leave the water and reach dry land
3. once on dry land, a visible 10-second recovery countdown begins
4. during recovery, the player cannot build
5. after 10 seconds, the player's ability is restored
6. the player can return to the stream and continue building

Make this state extremely clear through animation, sound, UI, camera feedback, or other feedback.

The snake mechanic should create tension without becoming constantly annoying.

## Player Experience

The game should encourage experimentation.

The player should naturally want to try things such as:

- completely damming the stream
- sending water around a large rock
- creating two separate channels
- creating a small pond
- breaking a dam after water has accumulated
- building while avoiding snakes

Do not require extensive instructions.

Teach the player primarily through intuitive controls, environmental design, visual feedback, and minimal UI.

## Game Loop

Create a meaningful short gameplay loop rather than an endless sandbox with no objective.

Design a lightweight goal or challenge around controlling the stream.

You may invent the exact objective yourself.

It should encourage the player to understand and use the water-redirection mechanics.

Avoid turning the experience into a complex management game.

The water manipulation itself should remain the star of the experience.

## Visual Quality

Aim for a charming, readable, cohesive visual style rather than raw primitives.

The environment should feel alive.

Pay attention to:

- water motion
- splashes and ripples
- wet rocks
- mud
- plants
- lighting
- shadows
- particles
- snake movement
- player feedback
- changes in water level and flow

Prioritize visual communication of gameplay over realism.

## Feel and Polish

Add appropriate polish wherever it improves the experience:

- animation
- particles
- sound
- camera feedback
- hover / placement previews
- interaction indicators
- water feedback
- UI feedback
- environmental motion

The player should immediately understand when their actions affect the stream.

## Controls

Design controls appropriate for the chosen platform.

Keep them simple.

Include a small unobtrusive control guide inside the game.

## Autonomous Development

Work autonomously.

You are responsible for:

- choosing the technology
- designing the gameplay
- implementing the project
- generating or sourcing suitable assets where appropriate
- debugging
- testing
- evaluating visual quality
- improving weak areas

Do not stop after the first technically functional version.

Run the game yourself, inspect the result, identify problems, and iterate.

Pay particular attention to:

- whether water redirection is actually visible
- whether dams genuinely affect flow
- whether terrain manipulation feels useful
- whether snakes create readable gameplay
- whether the recovery mechanic works correctly
- whether controls are intuitive
- whether the scene looks intentional rather than like a technical prototype

Fix obvious problems before considering the project complete.

## Completion Criteria

The project is complete only when a player can:

1. enter the game and immediately understand the environment
2. interact with rocks and soil
3. noticeably alter the path or distribution of water
4. create at least one meaningful dam or redirected stream
5. encounter moving water snakes
6. be bitten by a snake
7. lose building ability after being bitten
8. reach dry land
9. see a 10-second recovery state
10. regain building ability afterward
11. continue modifying the stream
12. experience a clear short-term objective or challenge
13. play without major bugs or broken interactions

The final result should feel like a small experimental indie game, not a technology demonstration.