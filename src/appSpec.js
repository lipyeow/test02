import { edu_data } from "./data.js";

// text:
//  - widths are in grid xs units
//  - justify is passed to grid container justifyContent prop
const app_spec = {
  widgets: [
    {
      type: "image",
      id: "img1",
      width: 3,
      imageheight: "170px",
      justify: "center",
      value: "https://lipyeow.github.io/home/img/lypic2018.jpg",
    },
    {
      type: "text",
      id: "txt2",
      width: 8,
      justify: "flex-start",
      value: `
      <h1>Lipyeow Lim, Ph.D. &nbsp; &nbsp; &#26519;&#31435;&#32768; </h1>
      <i>I am a computer scientist, educator, and software engineer by profession</i>
      <div align="right"><i> -- and a martial artist by avocation.</i></div>
      
      <br/>
      Fremont, CA, USA <br/>
      <b>Email</b>: lipyeow at gmail dot com
      <br/>
      <b>LinkedIn</b>: 
      <a href="www.linkedin.com/in/lipyeowlim">www.linkedin.com/in/lipyeowlim</a>
      `,
    },
    {
      type: "tabcontainer",
      id: "tabcontainer01",
      tabs: [
        {
          label: " Computer Scientist",
          id: "tc01-0",
          idx: 0,
          widgets: [
            {
              type: "text",
              id: "txt4",
              width: 12,
              justify: "flex-start",
              value: `
                <i>My scientific research career started with my masters thesis 
                on pixel ordering in images. I then investigated the use of 
                machine learning techniques in optimizing database processing 
                in my doctoral dissertation. I continued with more general 
                data management research at the IBM Thomas J. Watson Research
                Center early in my career before embarking on a professorship
                at the University of Hawaii at Manoa.</i>

                <h2>Education</h2>

                <ul>
                <li>2004 - <b>Ph.D.</b> Computer Science, Duke University. 
                    <br/>
                    <ul>
                    Thesis: <i>Online Methods for Database Optimization</i>.
                    Advisor: Jeffrey Scott Vitter
                    </ul>
                </li>
                <li>2000 - <b>M.Sc.</b> Information Systems & Computer Science, National University of Singapore. 
                    <br/>
                    <ul>
                    Thesis: <i>A Theoretical Look at Pixel Ordering</i>.
                    Advisor: Philip M. Long
                    </ul>
                </li>
                <li>1999 - <b>B.Sc.</b> Information Systems & Computer Science, National University of Singapore. 
                    <br/>
                    <ul>
                    Project: <i>Implementation of the mobile IPv4 configuration option for PPP IPCP (RFC 2290)</i>.
                    Advisor: Yong-Chiang (Y.C.) Tay
                    </ul>
                </li>
                </ul>

                <h2>Publications</h2>
                `,
            },
            {
              type: "table",
              id: "tPub",
              label: "<i>Scientific articles I have (co-)authored.</i>",
              dataref: "qPub",
              colspecs: [
                { title: "Year", field: "year", defaultSort: "desc" },
                { title: "Venue", field: "venue" },
                {
                  title: "Title",
                  field: "title",
                  cellStyle: { minWidth: "350px" },
                },
                { title: "Authors", field: "authors" },
                {
                  title: "pdf",
                  field: "pdf",
                  link: {
                    prefix: "https://lipyeow.github.io/home/",
                    text: "pdf",
                  },
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "70vh",
                padding: "dense",
              },
            },
          ],
        },
        {
          label: "Educator",
          id: "tc01-1",
          idx: 1,
          widgets: [
            {
              type: "text",
              id: "txt_educator",
              width: 12,
              justify: "flex-start",
              value: `
      <i>Between 2009 and 2019, I was a professor of Information and Computer Science at the University of Hawaii at Manoa where I taught both undergraduate and graduate courses and advised Masters and Doctoral students.</i>

        <h2>Student Advisees</h2>
      `,
            },
            {
              type: "table",
              id: "tStu",
              label: "<i>Students I have had the privilege of mentoring</i>",
              dataref: "qStu",
              colspecs: [
                { title: "Year", field: "year" },
                { title: "Degree", field: "degree" },
                {
                  title: "Name",
                  field: "name",
                  cellStyle: { minWidth: "250px" },
                },
                {
                  title: "Thesis",
                  field: "thesis",
                  cellStyle: { minWidth: "550px" },
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "50vh",
                padding: "dense",
                tableLayout: "auto",
              },
            },
            {
              type: "text",
              id: "txt_courses_title",
              width: 12,
              justify: "flex-start",
              value: `<h2>Courses</h2>`,
            },

            {
              type: "table",
              id: "tTeach",
              label: "<i>Undergraduate and graduate courses I have taught</i>",
              dataref: "qTeach",
              colspecs: [
                { title: "Year", field: "year", defaultSort: "desc" },
                { title: "Semester", field: "semester" },
                { title: "Course", field: "num" },
                { title: "Title", field: "title", defaultGroupOrder: 0 },
                { title: "Level", field: "level" },
                {
                  title: "Website",
                  field: "url",
                  link: { text: "" },
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "50vh",
                tableLayout: "auto",
                padding: "dense",
                grouping: true,
              },
            },
          ],
        },
        {
          label: "Software Engineer",
          id: "tc01-2",
          idx: 2,
          widgets: [
            {
              type: "text",
              id: "txt6",
              width: 12,
              justify: "flex-start",
              value: `
                <i>My first serious software engineering endeavor was writing a
linux kernel module for supporting the PPP protocol over MobileIP back in 1998.
I then progressed to prototyping various research ideas during my graduate
studies. My software engineering career really began at IBM developing advance
features for DB2 DBMS and Infosphere Streams software. I then took a break in
academia teaching students how to write data-intensive software applications as
well as advising developing nations on their IT projects as a World Bank
consultant. In 2019, I returned to industry (to FireEye Inc.) to lead
data-intensive cybersecurity software projects.</i>

                <h2>Patents</h2>

                <ul>
                <li>A list of <a href="https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=0&f=S&l=50&TERM1=Lipyeow&FIELD1=INNM&co1=AND&TERM2=Lim&FIELD2=INNM&d=PTXT">my patents</a> at USPTO Patent Full-Text and Image Database. </li>

                <li>
                A list of <a href="https://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=0&f=S&l=50&TERM1=Lipyeow&FIELD1=IN&co1=AND&TERM2=Lim&FIELD2=IN&d=PG01">my patent applications</a> at USPTO Patent Application Full-Text and Image Database. </li>
                </ul>

                <h2>Projects</h2>
                `,
            },
            {
              type: "table",
              id: "tProjects",
              label: "<i>Interesting projects I have worked on.</i>",
              dataref: "qProjects",
              colspecs: [
                {
                  title: "Dates",
                  field: "display_date",
                  cellStyle: { cellWidth: "15%" },
                },
                {
                  title: "Title",
                  field: "title",
                  cellStyle: { cellWidth: "20%" },
                },
                {
                  title: "Role",
                  field: "role",
                  cellStyle: { cellWidth: "15%" },
                },
                {
                  title: "Affiliation",
                  field: "affiliation",
                  cellStyle: { cellWidth: "15%" },
                },
                {
                  title: "Description",
                  field: "desc",
                  cellStyle: { minWidth: "350px" },
                },
              ],
              options: {
                search: true,
                paging: false,
                filtering: false,
                exportButton: true,
                maxBodyHeight: "70vh",
                padding: "dense",
                tableLayout: "auto",
              },
            },
          ],
        },

        {
          label: "Martial Artist",
          id: "tc01-3",
          idx: 3,
          widgets: [
            {
              type: "text",
              id: "txt_ma",
              width: 12,
              justify: "flex-start",
              value: `
      <i>Chen Style Taijiquan</i>
      <br/>
      <i>I Liq Chuan</i>
      <br/>
      <i>Kalis Illustrissimo</i>
      <br/>
      `,
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
      id: "qProjects",
      backend: "urlfetch",
      endpoint: "r0",
      query: "https://lipyeow.github.io/test02/data/projects.json",
      fetch_on_init: true,
      args: [],
    },
    {
      type: "query",
      id: "qEduConst",
      backend: "constant",
      endpoint: "r0",
      query: {
        cols: [],
        data: edu_data,
      },
      args: [],
    },
  ],
};

export { app_spec };
