> ATTENTION: Developing Set/OrderedSet is only for practicing, instead use ES6 native Set in your production

# Time complexity
- **Set** Basic math concept, store with no ordered
- **OrderedSet**  Store elements from small to big

api      |Set   |OrdredSet
---------|------|---------
toArray  |O(n)  |O(n)
count    |O(1)  |O(1)
has      |O(n)  |O(n)
index    |x     |O(n)
hasOneOf |O(cn) |O(cn)
hasAll   |O(cn) |O(cn)
each     |O(n)  |O(n)
union    |O(mn) |O(mn)
intersect|O(mn) |O(mn)
add      |O(n)  |O(n)
remove   |O(n)  |O(n)
removeAt |x     |O(n)
clear    |O(1)  |O(1)

# Helpful
- https://github.com/component/set