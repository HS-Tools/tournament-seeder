# Tournament Seeder Design Document

## Overview:
The purpose of the tournament seeder is to allow tournament organizers to be able to fairly seed auto-battler players into groups. The metrics that can be used are MMR (Match making rating) and tournament points. These metrics can be individually weighted to adjust the impact of each.

## Context:
Traditionally, tournament sign ups are achieved with google forms which will ask for a player ID and sometimes their in game MMR to determine player skill.  Tournaments start with an initial seeding of groups of 8 for the first round of games. A round concludes after a certain amount of games with each player in the group earning points for their results. These points determine who will make it to the next round and can also be used along with MMR to reseed players for future rounds.

The tool should allow for seeding for any stage of a tournament

## Implementation:

### Input:

#### Parameters:
1. Player Names/ID: Id for the each player (battletags in the case of Hearthstone Battlegrounds)
2. MMR: The MMR of each player
3. Tournament points: How many points a player has earned. The context can be within a round or cumulatively throughout the tournament.
4. MMR multiplier: What the MMR should be multiplied with to weight it for the final score. I recommend a multiplier of .001
5. Point multiplier: What the points should be multiplied with to weight it for the final score. I recommend a multiplier of 1

#### Handling:
* There should be a single way and edit data in the application: I believe this is the best way to do it: https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing/#inline-cell-editing
* There should be a way to read in a csv file to populate data: https://www.npmjs.com/package/xlsx
* Columns should be able to be removed and edited to match what is needed
* Column name should match "Name", "MMR", "Points" to be processed.

#### Persisting data:
* Any file input should be persisted through local storage so that it will remain loaded
* Clear data button should be added with a prompt

### Seeding Algorithm:
* The algorithm generates a large number of random groupings and calculates the delta in average MMR between each group and then keeps track of grouping that has the lowest delta. The grouping with the lowest delta is returned at the end.

### Output:
1. The groups and which players are in them
2. Any errors that came with parsing the csv/input
	a. Inability to parse an MMR to a number
	b. Missing information for a column
	c. Missing column name for ID/MMR/Points
3. The average MMR of the tournament
4. The average MMR for each group
5. The delta of average MMR
