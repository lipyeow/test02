
const app_spec = {
  widgets : [
    { type: "text",
      id: "txt1",
      value: "<h1>My Test Website</h1>"
    },
    { 
      type: "table",
      id  : "t1",
      label: "DNS",
      dataref: "q1",
      colspecs: []
    },
    { 
      type: "query",
      id  : "q1",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/pubs.json",
      fetch_on_init: true,
      args: []
    },
    { 
      type: "query",
      id  : "q2",
      backend: "constant",
      endpoint: "r0",
      query: { "cols": [
            { title: 'Year', field: 'year' },
            { title: 'Title', field: 'title' },
            { title: 'Venue', field: 'venue' }
          ], "data": [
  {
    "year": "2020",
    "title": "John et al",
    "venue": "vldb"
  },
  {
    "year": "2021",
    "title": "Tim et al",
    "venue": "sigmod"
  }
]},
      args: [{from: "ti1"}, {from: "ti1"}, {from: "m1"}, {from: "m1"}]
    }
  ],
};

export { app_spec };
