import fetch from "node-fetch";

let tagList = ['history', 'design', 'science', 'startups','tech','politics','health','culture']
let allPosts = []

const url = "https://api.hatchways.io/assessment/blog/posts/?tag="

//load the posts
async function myFunc() {

  async function callApi(urlLink) {
	console.log(`urlLink ${urlLink}`);
  	const response = await fetch(urlLink)
  		.then(res => res.json())
  		.then(jsonPosts => {
	  	      allPosts.push(jsonPosts.posts);
  		})
  		.catch(e => console.log(e));
  }

  for (const tag of tagList) {
	  const urlTag = url + tag;
	  callApi(urlTag)
  }
}

myFunc();

setTimeout( function () {
  
  //flatten the array
  var merged = [].concat.apply([], allPosts);

  //remove duplicates based on id of post
  allPosts = merged.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.id === thing.id
    ))
  )

  console.log(`${JSON.stringify(allPosts, null , 1)}`)
  console.log(`ALLPOSTS AFTER DUPES REMOVED ${allPosts.length}`)

}, 500)


