function chainedFetch() {
  const fetchUrlFirst = formatUrl("1");

  fetch(fetchUrlFirst)
    .then((data) => data.json())
    .then((readableData) => console.log(readableData));
}

async function sugarSyntaxFetch() {
  const fetchUrl = formatUrl("3");

  const data = await fetch(fetchUrl);
  const readableData = await data.json();
  console.log(readableData);
}

// fetch(fetchUrlFirst, {
//   headers: {
//     Authorization: '',
//     'Content-Type': 'application/json',
//   },
//   method: 'PATCH',
// })

// DRY
// Don't repeat yourself

// WET
// Write-it everywhere

function formatUrl(paramOrId) {
  return `https://swapi.dev/api/people/${paramOrId}/`;
}

chainedFetch();
sugarSyntaxFetch();
