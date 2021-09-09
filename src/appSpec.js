
const app_spec = {
  widgets : [
    { type: "text",
      id: "txt1",
      value: `
<table width=100%>
<tr>
   <td width=8%>&nbsp;</td>
   <td>
      <IMG border="1"
            align=left 
            SRC="https://lipyeow.github.io/home/img/lypic2018.jpg" height=250 />
   </td>
   <td width=7%>&nbsp;</td>
   <td width=85%>
      <h1>Lipyeow Lim &nbsp; &nbsp; &#26519;&#31435;&#32768; </h1>
      
      <h2>Associate Professor</h2>
      
      Information and Computer Science Department <br/>
      University of Hawaii at Manoa <br/>
      1680 East West Road, POST 303E <br/>
      Honolulu, HI 96822, USA <br/>
      <b>Email</b>: lipyeow at hawaii dot edu 
      <b>Tel</b>: 808-956-3495 <br/>
      <br/>
   </td>
</tr>
</table>
`
    },
    { 
      type: "table",
      id  : "tEdu",
      label: (<h1>Education</h1>),
      dataref: "qEdu",
      colspecs: [
                    {title: "Year", field: "year"},
                    {title: "Degree", field: "degree"},
                    {title: "Major", field: "major"},
                    {title: "School", field: "institution"},
                    {title: "Thesis", field: "thesis"},
                    {title: "Advisor", field: "advisor"},
                ],
      options: {
          search: false,
          paging: false,
          filtering: false,
          exportButton: false,
          tableLayout: "auto",
          showTitle: true,
          toolbar: true
        }
    },
    { 
      type: "table",
      id  : "tPub",
      label: (<h1>Publications</h1>),
      dataref: "qPub",
      colspecs: [{title: "Year", field: "year", cellStyle: { cellWidth: "10%" }},
                 {title: "Venue", field: "venue", cellStyle: { cellWidth: "20%"}},
                 {title: "Title", field: "title", cellStyle: { cellWidth: "50%"}},
                 {title: "Authors", field: "authors", cellStyle: { cellWidth: "20%"}},
                 {title: "pdf", field: "pdf", 
                  render: rowData => (
                    <a href={"https://lipyeow.github.io/home/" + rowData.pdf} download>pdf</a> ),
                 }
                ],
      options: {
          search: true,
          paging: false,
          filtering: false,
          exportButton: true,
          maxBodyHeight: "50vh",
          tableLayout: "auto"
        }
    },
    { 
      type: "table",
      id  : "tStu",
      label: (<h1>Students</h1>),
      dataref: "qStu",
      colspecs: [{title: "Year", field: "year"},
                 {title: "Degree", field: "degree"},
                 {title: "Name", field: "name"},
                 {title: "Thesis", field: "thesis"},
                ],
      options: {
          search: true,
          paging: false,
          filtering: false,
          exportButton: true,
          maxBodyHeight: "50vh",
          tableLayout: "auto"
        }
    },
    { 
      type: "table",
      id  : "tTeach",
      label: (<h1>Teaching</h1>),
      dataref: "qTeach",
      colspecs: [{title: "Year", field: "year"},
                 {title: "Semester", field: "semester"},
                 {title: "Course", field: "num"},
                 {title: "Title", field: "title", defaultGroupOrder: 0 },
                 {title: "Level", field: "level"},
                 {title: "Website", field: "url",
                  render: rowData => (
                    <a href={rowData.url} download>{rowData.url}</a> ),
                    },
                ],
      options: {
          search: true,
          paging: false,
          filtering: false,
          exportButton: true,
          maxBodyHeight: "50vh",
          tableLayout: "auto",
          grouping: true
        }
    },
    { type: "text",
      id: "txt2",
      value: "Projects"
    },
    { 
      type: "query",
      id  : "qPub",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/pubs.json",
      fetch_on_init: true,
      args: []
    },
    { 
      type: "query",
      id  : "qEdu",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/education.json",
      fetch_on_init: true,
      args: []
    },
    { 
      type: "query",
      id  : "qStu",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/students.json",
      fetch_on_init: true,
      args: []
    },
    { 
      type: "query",
      id  : "qTeach",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/teaching.json",
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
    "title": "Deep learning",
    "authors": "john et al",
    "venue": "vldb"
  },
  {
    "year": "2021",
    "title": "<a href=\"https://lipyeow.github.io/home/\">pdf</a>",
    "authors": "Tim et al",
    "venue": "sigmod"
  }
]},
      args: [{from: "ti1"}, {from: "ti1"}, {from: "m1"}, {from: "m1"}]
    }
  ],
};

export { app_spec };
