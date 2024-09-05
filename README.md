# Bookmark Landing Page

A landing page for your bookmarks. AKA, a great excuse to practice foundational web dev skills.

## Primary Lesson Learned

- It's extremely beneficial to deeply consider data structures and data flow in the early stages. Things may change, sure. But this project really had me _feel_ how important it is to shape the data well. Without a solid, extensible data structure and flow, I can create something that _looks_ like it works, and fast. But the solution is superficial. Only when I started really thinking how to utilize `localStorage` did I start to see how shortsighted my design had been.

## Some rabbits holes I dove down

#### 1. How do I render a list of DOM elements using an array of objects?

Docs used

- I started here: https://stackoverflow.com/questions/38277713/argument-1-of-node-appendchild-is-not-an-object-when-trying-to-append-basic-html
- Then found this: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

Tidbits learned

- Fragments are a thing! I learned about them to learn React, but I thought they were just a JSX thing. Which is a bit silly since I _knew_ React stuff is "just javascript".
- I thought that I needed to create a `fragment` element in order to attach a `li` element. But as it turns out, I didn't need to do that for this. It took me a little bit longer than I wanted to figure all this out. But I think it was worth it.
- You can find all this worked out into a solution in the `renderList()` function.

#### 2. How do I delete DOM nodes through user input?

Docs used

- I started here: https://stackoverflow.com/questions/15312567/get-parent-id-of-this-div which helped to get the `id` of the node.
- I took a little detour here: https://stackoverflow.com/questions/7364150/search-an-array-of-javascript-objects-for-an-object-with-a-matching-value and https://www.logilax.com/javascript-remove-specific-element-from-array/ trying to find the index to then use in some vague, undefined clever way.
- Finally landed here by asking a better question: https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript to remove objects from an array

Tidbits learned

- I had a good idea to clear our full node list, and then rerender it but without the deleted node. Very React-y. This cycles became essential for this app:
  1.  find the object in an array
  2.  duplicate the array but with the object
  3.  use that new array to rerender the DOM nodes
- It feels like a super crude [CRUD app](https://budibase.com/blog/crud-app/)

#### 3. What's the deal with `localStorage` ?

Docs used

- Started here: [MDN - Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- At some point I wondered what the difference between `.clear()` and `.removeItem()` so I found this: https://stackoverflow.com/questions/15486484/localstorage-clear-or-removeitem
- Which led me to this: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
- And then we just kept diving: https://developer.mozilla.org/en-US/docs/Glossary/Origin
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://www.mozilla.org/en-US/security/advisories/mfsa2019-21/#CVE-2019-11730
- https://emmah.net/

Tidbits learned

- `.clear()` removes every item of the `origin`'s `localStorage`
- `.removeItem()` is used to remove specific items
- `localStorage` is scoped to the `origin` of the call

## General Lessons Learned

- Working on a deadline (under pressure) is helpful for me. But some flexibility and fault tolerance is necessary
- Debugging is fun.
- Restructuring code is fun.
- Reading other people's code to learn how to implement things is fun.
- Detours in research are great for learning! Not good for speed of delivery. But that isn't the point with these projects. So it's fine. I can afford to be a bit slower at the start if it means I'll learn more for later.
- Completing a feature implementation is a thrill.
- I can spend almost all day coding if I don't stop myself.
- There are rabbit holes everywhere.
