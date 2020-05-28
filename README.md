# AStarPathfindingP5
* <https://www.youtube.com/watch?v=aKYlikFAV4k&feature=youtu.be>

# Progress
* Started: 5/12/2020
* Finished: 5/27/2020

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
* Reviewed and used javascript es6 destructuring assignment
  * the [a, b] = [b, a] swap 
* Used some es6 style js
  * classes are es6+ only I think
* binary heaps
  * reviewed 
  * implemented using wikipedia as reference
    * wasn't bad
  * data structures in js are different
    * don't know if using the js array and its functions slow down custom data structures potentially
  * heap verification from ref #3
* adding a valueOf() method to a js object/class is like overriding Equals() in cSharp, kinda
  * use (+foo > +bar) to access valueOf method in equalities and the like
  * still not 100% on implications of '==' v '===' in js
* wrote first try-catch with custom error
  * probably not necessary
  * an assert method would be super nice though
* I really need to look at typescript, js feels too loose
* Just make the damn heap verification instead of hoping there's no mistakes
  * just because the algorithm eventually completes doesn't mean everything is working as intended
* Find whatever people use in place of assert for javascript

# Issues
* ~~The algo is definitely not working right~~
  * It eventually finds the goal, but it repeats and goes weird ways
  * It is definitely not finding the optimal solution
  * It goes in the optimal path if the goal is straight down or straight right
  * The problem is solved if the the min heap is rebuilt every time before its used in the next loop
    * ~~I think its because sometimes values are updated~~
      * I tried an update method but its not working yet, if updates are the reason, need to test
  * ~~Problem solved for sure. It was minHeap.extract()~~
    * The bubble down algo for the extract method wasn't keeping track of the index correctly
    * Update was never the issue
  * It was extract and insert
    * there was an order of operations error on finding the parent index
    * heap verify should have been been implemented to begin with, would have made this a lot simpler

* <del>I need to rename some variables</del>
  * especially in Junction.js
* ~~need to make a function that verifies heap integrity~~



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
* Assess and optimize data structures used
* Write the whole thing in cSharp

# References
1. <https://en.wikipedia.org/wiki/A*_search_algorithm>
2. <https://en.wikipedia.org/wiki/Binary_heap>
3. <https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-heap/>