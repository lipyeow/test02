
const edu_data = [
{
    "year": 2004,
    "month": "August",
    "degree": "Ph.D.",
    "major": "Computer Science",
    "institution": "Duke University",
    "sub-institution": "Department of Computer Science",
    "thesis": "Online Methods for Database Optimization",
    "advisor": "Jeffrey Scott Vitter",
    "committee": "Min Wang, Ronald Parr, Jun Yang",
    "gpa": 3.9
},
{
    "year": 2000,
    "month": "September",
    "degree": "M.Sc.",
    "major": "Information Systems & Computer Science",
    "institution": "National University of Singapore",
    "sub-institution": "School of Computing",
    "thesis": "A Theoretical Look at Pixel Ordering",
    "advisor": "Philip M. Long",
    "committee": "Ghim-Hwee Ong, Wee-Sun Lee",
    "gpa": null
},
{
    "year": 1999,
    "month": "May",
    "degree": "B.Sc.",
    "major": "Information Systems & Computer Science",
    "institution": "National University of Singapore",
    "sub-institution": "School of Computing",
    "thesis": "Implementation of the mobile IPv4 configuration option for PPP IPCP (RFC 2290)",
    "advisor": "Yong-Chiang (Y. C.) Tay",
    "committee": "Kam-Hong Shum, Kwok-Yan Lam",
    "gpa": 3.5
}
];

// text: 
//  - widths are in grid xs units
//  - justify is passed to grid container justifyContent prop
const app_spec = {
  widgets: [
    {
      type: "text",
      id: "txt1",
      width: 4,
      justify: "space-evenly",
      value: `
            <br/>
            <IMG border="1" style="float: middle; display: inline-block; height: 220px; vertical-align: middle;" 
           src="https://lipyeow.github.io/home/img/lypic2018.jpg"/>
            `,
    },
    {
      type: "text",
      id: "txt2",
      width: 8,
      justify: "flex-start",
      value: `
      <h1>Lipyeow Lim &nbsp; &nbsp; &#26519;&#31435;&#32768; </h1>
      <i>Computer Scientist, Educator, Software Engineer</i>
      
      <br/>
      <br/>
      Fremont, CA, USA <br/>
      <b>Email</b>: lipyeow at gmail dot com
      `,
    },
    {
      type: "tabcontainer",
      id: "tabcontainer01",
      tabs: [
        {
          label: "Education",
          idx: 0,
          widgets: [
            {
              type: "table",
              id: "tEdu",
              label: <i>Schools that molded me.</i>,
              dataref: "qEduConst",
              colspecs: [
                { title: "Year", field: "year" },
                { title: "Degree", field: "degree" },
                { title: "Major", field: "major" },
                { title: "School", field: "institution" },
                { title: "Thesis", field: "thesis" },
                { title: "Advisor", field: "advisor" },
              ],
              options: {
                search: false,
                paging: false,
                filtering: false,
                exportButton: false,
                tableLayout: "auto",
                showTitle: true,
                toolbar: true,
              },
            },
          ],
        },
        {
          label: "Publications",
          idx: 1,
          widgets: [
            {
              type: "table",
              id: "tPub",
              label: <i>Scientific publications I have (co-)authored.</i>,
              dataref: "qPub",
              colspecs: [
                { title: "Year", field: "year", },
                { title: "Venue", field: "venue", },
                { title: "Title", field: "title", },
                { title: "Authors", field: "authors", },
                { title: "pdf", field: "pdf",
                  render: (rowData) => (
                    <a
                      href={"https://lipyeow.github.io/home/" + rowData.pdf}
                      download
                    >
                      pdf
                    </a>
                  ),
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "50vh",
                tableLayout: "auto",
              },
            },
          ],
        },
        {
          label: "Students",
          idx: 2,
          widgets: [
            {
              type: "table",
              id: "tStu",
              label: <i>Students whom I have had the privilege of mentoring.</i>,
              dataref: "qStu",
              colspecs: [
                { title: "Year", field: "year" },
                { title: "Degree", field: "degree" },
                { title: "Name", field: "name" },
                { title: "Thesis", field: "thesis" },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "50vh",
                tableLayout: "auto",
              },
            },
          ],
        },
        {
          label: "Teaching",
          idx: 3,
          widgets: [
            {
              type: "table",
              id: "tTeach",
              label: <i>Courses I have taught at the University of Hawaii at Manoa.</i>,
              dataref: "qTeach",
              colspecs: [
                { title: "Year", field: "year" },
                { title: "Semester", field: "semester" },
                { title: "Course", field: "num" },
                { title: "Title", field: "title", defaultGroupOrder: 0 },
                { title: "Level", field: "level" },
                {
                  title: "Website",
                  field: "url",
                  render: (rowData) => (
                    <a href={rowData.url} download>
                      {rowData.url}
                    </a>
                  ),
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "50vh",
                tableLayout: "auto",
                grouping: true,
              },
            },
          ],
        },
      ],
    },
    {
      type: "query",
      id: "qPub",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/pubs.json",
      fetch_on_init: true,
      args: [],
    },
    {
      type: "query",
      id: "qEdu",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/education.json",
      fetch_on_init: false,
      args: [],
    },
    {
      type: "query",
      id: "qStu",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/students.json",
      fetch_on_init: true,
      args: [],
    },
    {
      type: "query",
      id: "qTeach",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/teaching.json",
      fetch_on_init: true,
      args: [],
    },
    {
      type: "query",
      id: "q2",
      backend: "constant",
      endpoint: "r0",
      query: {
        cols: [
          { title: "Year", field: "year" },
          { title: "Title", field: "title" },
          { title: "Venue", field: "venue" },
        ],
        data: [
          {
            year: "2020",
            title: "Deep learning",
            authors: "john et al",
            venue: "vldb",
          },
          {
            year: "2021",
            title: '<a href="https://lipyeow.github.io/home/">pdf</a>',
            authors: "Tim et al",
            venue: "sigmod",
          },
        ],
      },
      args: [{ from: "ti1" }, { from: "ti1" }, { from: "m1" }, { from: "m1" }],
    },
    {
      type: "query",
      id: "qEduConst",
      backend: "constant",
      endpoint: "r0",
      query: {
        cols: [],
        data: edu_data  
      },
      args: [],
    },
  ],
};

export { app_spec };
