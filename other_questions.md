# # Discovery Interview

## Question 1
```
function q1(array $a1, array $a2) : array {
  /*
    array_filter will compare iterate through $a1 deciding what to keep.
    Using "use" will include $a2 in callback's scope so we can compare it's keys to $a1's.
  */
  return array_filter($a1, function($value, $key) use ($a2) {
    /*
      isset is faster than array_has_key, but won't allow nulls.  If we expect
      keys with null values we will need an alternative plan.
    */
    return isset($a2[$key]);
  }, ARRAY_FILTER_USE_BOTH);
}
```

## Question 2
a) We are looking for a pattern of "number + period + number + period + number + period + number", the regex should look like "\d+\.\d+\.\d+\.\d+"
b) See below
```
function q2(string $url): ?string {
  preg_match('/\d+\.\d+\.\d+\.\d+/', $url, $matches);
  return count($matches) > 0 ? $matches[0] : null;
}
```
## Question 3
It's hard to say for certain what this data contains without knowing what revisions or collections refer to, but if I had to guess, I'd say this was some kind of internal tool for video editors to see the work they had to do on show segments.  revision_items may refer to different content types that will require revisions, so this query limits the results to videos or shows my_collection_revision_items.type or metakeys from a linked metadata table that gets ingested with the video.  If a revision is a video, we also wan to display the show the video comes from, but some revisions are for an entire show, hence the need for a UNION between the two types.  A video that will be edited is a segment of a larger show, so we want the show data included on any row for context.  We also want to restrict our list to only contain videos with a start time within 10 minutes of a revision's collection's start.  Unlike videos, revisions that encompass an entire show may not have start times, which is why we check if the start_date is null in the second query.
## Question 4
```
let car = {
    type : 'sports',
    price: 35000
};
var mycar1 = Object.create(car);
var mycar2 = Object.create(car);
mycar2.type = 'suv';
```
1) Object.create initializes a new object that uses the parameter object(i.e. "car") as a prototype.  Because of this, `mycar1.type` will return car's type, but using `mycar1.hasOwnProperty('type')` will return `false`, since mycar1 does not own a type property, it's just using it's parents.
  ```
console.log(mycar1.hasOwnProperty('type')); //false
```

2) When setting mycar2's type to 'suv', we give it it's own property, which will override(but not overwrite) the parent's.  Because of this, mycar2 has a type property and `mycar2.hasOwnProperty('type');` will return `true`.
```
console.log(mycar2.hasOwnProperty('type')); // true
```
3) Deleting mycar2's type will clear the property from memory, meaning that mycar2 no longer has a type.  Because of this, `mycar2.hasOwnProperty('type')` will return `false`. However, mycar2 is still using car as a prototype, so mycar2.type will return 'sports'.
```
delete mycar2.type;
console.log(mycar2.hasOwnProperty('type')); //false
console.log(mycar2.type); //'sports'
```
## Question 5
```
function q5(objs, ids) {
  /*
    Re-organize our objects into one giant object indexed by the unique ID.  This
    way, we have easy access in O(1) time to any object.
  */
  const objsById = objs.reduce((accumulator, obj) => {
    accumulator[obj.id] = obj;
    return accumulator;
  }, {});

  /*
    Create an empty array and for each id we want to pull, enter our hashtable and
    append the object at that ID to result.
  */
  const result = [];
  for (const id of ids) {
    result.push(objsById[id]);
  }
  return result;
}
```
## Question 6

The first thing that renders is the HTML and CSS, which show a 500px space broken into 4 lines.  The first 3 lines will say "This Is Level 1", "This Is Level 2",  and "This Is Level 3", respectively.  But, the fourth line will say "This is Level 3! This is Level 4 This is Level 4".  This is because div tags and p tags will by default create new blocks for their innerHTML, but spans will display inline.  Our CSS will also add borders and colors to our divs, meaning our outer 2 blocks will have a black outline and gray text.  However, once the page finishes loading, our jQuery will fire up.  jQuery will take all tags in our first inner box (namely anything "Level 3") and change it's text and border to red.  Finally, the last line of jQuery will set our spans wrapping "Level 4" to have blue text and green borders.

Our final result will be a black 500px box that contains a smaller black box. Inside that box will be 3 red boxes and inside the second red box will be 2 green boxes with blue text, assuming jQuery is imported and the page is loaded.

## Question 7
**1.** resize makes adds a clickable space that makes an element resize-able to the user.

## Question 8
```
SELECT name
FROM   B b
       FULL OUTER JOIN A a
                    ON a.id = b.a_id
                       AND b.name NOT LIKE 'S%'
```
