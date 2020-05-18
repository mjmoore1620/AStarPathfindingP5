# AStarPathfindingP5
* <https://www.youtube.com/watch?v=aKYlikFAV4k&feature=youtu.be>

# Progress
* Started: 5/12/2020

# What is the purpose of this exercise?
* Implement an A* pathfinding algorithm 
  * Display the progress of the algorithm in real-time
    * Because it's neat

# What should I get out of doing this exercise?
* I should learn something about pathfinding algorithms in general (I've never written one before)
* I should brush up on writing recursive control flows
* I should reinforce my knowledge of git

# What have I got from doing this so far?
* I figured out what was going wrong when using 'hub create' command to create a repository on github remotely
  * It was set to use ssh by default

# Specifications
* Write in javascript using p5.js
* Grid based
  * With 8 directions from each node including diagonals
* Generate obstacles, blocked cells of the grid
* Display the progress of the path in real-time

## A*: how it works
* A* maintains a tree of paths originating at the start node and extends those paths one edge at a time until the end condition is met.
* At each iteration of the main loop A* chooses which path to extend based on:
  * the cost from the start to current node
  * the estimated cost from current node to the goal
* f(n) = g(n) + h(n)
  * n = the next node on the path
  * g(n) = the cost of the path from start node to n
  * h(n) = the estimated cost from n to the goal

# Possible Modifications
* Enable user to add obstacles

# References
1. <https://en.wikipedia.org/wiki/A*_search_algorithm>
