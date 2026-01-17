let express = require("express");
let app = express();
const session = require("express-session");
require("dotenv").config();
const { createClient } = require('@supabase/supabase-js')
const multer = require('multer');
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require('cors');
const archiver = require("archiver");
const axios = require("axios");


let port = 3000
const frontendURL = "http://localhost:5173"
app.use(cors({
  origin: frontendURL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SERVICE_ROLE_KEY
);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
main();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "agriconnectSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60 * 1000,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    },
  })
);


const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.usn) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in."
    });
  }
  next();
};



app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});

app.post("/", async (req, res) => {
  console.log("Login attempt with body:", req.body);
  const { usn, password } = req.body;


  if (!usn || !password) {
    return res.status(400).json({
      success: false,
      message: "USN and password are required."
    });
  }

  if (password !== "pes@student") {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials."
    });
  }

  req.session.usn = usn;

  req.session.save(err => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).json({
        success: false,
        message: "Error saving session. Please try again."
      });
    }
    console.log(`[Session] User ${usn} logged in successfully. Session ID: ${req.sessionID}`);
    res.json({
      success: true,
      message: "Login successful",
      usn: req.session.usn
    });
  });
});


app.post("/logout", requireAuth, (req, res) => {
  const usn = req.session.usn;
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).json({
        success: false,
        message: "Error logging out."
      });
    }
    console.log(`[Session] User ${usn} logged out successfully.`);
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  });
});

app.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("id, name")
      .eq("usn", req.session.usn)
      .single();

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching user data."
      });
    }

    const { data: projData, projError } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", req.session.usn);

    if (projError) {
      console.error("Supabase query error:", projError);
      return res.status(500).json({
        success: false,
        message: "Error fetching projects."
      });
    }

    const { data: Teammates, contribError } = await supabase
      .from("project_team_members")
      .select("student_id")
      .eq("owner_id", data.id);
    if (contribError) {
      console.error("Supabase query error:", contribError);
      return res.status(500).json({
        success: false,
        message: "Error fetching contributions."
      });
    }

    const { data: TeammatesData, contibutorsError } = await supabase
      .from("students")
      .select("name, email")
      .in("id", Teammates.map(c => c.student_id));
    if (contibutorsError) {
      console.error("Supabase query error:", contibutorsError);
      return res.status(500).json({
        success: false,
        message: "Error fetching contributor details."
      });
    }

    const{ data:project, error: projecterr } = await supabase
      .from("projects")
      .select("*")
      .neq("owner_id", req.session.usn);
    if (projecterr) {
      console.error("Supabase query error:", projecterr);
      return res.status(500).json({
        success: false,
        message: "Error fetching projects."
      });
    }
    console.log("Community Projects:", project);
    res.json({ name: data.name, projects: projData, teammates: TeammatesData, communityProjects: project });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/yourprojects", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", req.session.usn);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching projects."
      });
    }

    res.json({ projects: data });
  } catch (err) {
    console.error("Your projects error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


app.post("/createproject", requireAuth, upload.array("files"), async (req, res) => {
  const { title, description } = req.body;
  const files = req.files;

  try {
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert({
        owner_id: req.session.usn,
        title: title,
        description: description
      })
      .select()
      .single();

    if (projectError) {
      console.error(projectError);
      return res.status(500).json({ success: false, message: "Failed to create project record" });
    }

    const newProjectId = projectData.id;

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = `${req.session.usn}/${newProjectId}/${file.originalname}`;

        const { error: uploadError } = await supabase
          .storage
          .from('user_files')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });

        if (uploadError) {
          console.error(uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('user_files')
          .getPublicUrl(filePath);

        const { error: fileDbError } = await supabase
          .from('project_files')
          .insert({
            project_id: newProjectId,
            file_url: urlData.publicUrl
          });

        if (fileDbError) console.error(fileDbError);
      }
    }

    res.json({ success: true, message: "Project created and files uploaded!" });


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/incrementview/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    const { data, error } = await supabaseAdmin
      .rpc('increment_views', {
        project_id: projectId
      });


    if (error) {
      console.error("Increment view error:", error);
      return res.status(500).json({ success: false, message: "Failed to increment view count" });
    }
    res.json({ success: true, message: "View count incremented" });
  } catch (err) {
    console.error("Increment view exception:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/projectfiles/:id", requireAuth, async (req, res) => {
  const projectId = req.params.id;

  try {

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("id, title, description")
      .eq("id", projectId)
      .single();

    if (projectError) {
      return res.status(500).json({ success: false, message: "Project fetch failed" });
    }

    const { data: filesData, error: filesError } = await supabase
      .from("project_files")
      .select("file_url")
      .eq("project_id", projectId);

    if (filesError) {
      return res.status(500).json({ success: false, message: "Files fetch failed" });
    }

    const { data: contributionsData, error: contributionsError } = await supabase
      .from("contributions")
      .select(`
    id,
    title,
    created_at,
    students (
      name,
      email,
      usn
    )
  `)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (contributionsError) {
      console.error(contributionsError);
      return res.status(500).json({
        success: false,
        message: "Contributions fetch failed",
      });
    }
    const files = filesData.map(file => ({
      name: file.file_url.split("/").pop(),
      url: file.file_url
    }));

    res.json({
      success: true,
      project: projectData,
      files,
      contributions: contributionsData
    });
  } catch (error) {
    console.error("Error fetching project files:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/contributions/:id/download", requireAuth, async (req, res) => {
  const contributionId = req.params.id;

  try {
    const { data: filesData, error } = await supabase
      .from("contribution_files")
      .select("file_url")
      .eq("contribution_id", contributionId);

    if (error || !filesData || filesData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No files found for this contribution",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=contribution-${contributionId}.zip`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    for (const file of filesData) {
      const fileUrl = file.file_url;
      const fileName = fileUrl.split("/").pop();

      const response = await axios.get(fileUrl, {
        responseType: "stream",
      });

      archive.append(response.data, { name: fileName });
    }

    archive.finalize();

  } catch (err) {
    console.error("Contribution ZIP error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to download contribution files",
    });
  }
});

app.get("/community", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        views,
        students (
          name
        )
      `)
      .neq("owner_id", req.session.usn);

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }

    const { data: contributionCount, error: countError } = await supabase
      .from("contributions")
      .select("project_id");

    if (countError) {
      console.error(countError);
      return res.status(500).json({ success: false, message: "Failed to fetch contribution counts" });
    }
    const contributionMap = {};
    contributionCount.forEach(item => {
      contributionMap[item.project_id] = (contributionMap[item.project_id] || 0) + 1;
    });

    const members = await supabase
      .from("students")
      .select("usn, name, email")
      .neq("usn", req.session.usn);

    if (members.error) {
      console.error(members.error);
      return res.status(500).json({ success: false, message: "Failed to fetch members" });
    }

    res.json({ success: true, projects: data, contributionCounts: contributionMap, members: members.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/profileview/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const { data: userdata, error: usererr } = await supabase
      .from("students")
      .select(`
        id,
        name,
        email
      `).eq("usn", id).single();

    if (usererr) {
      console.error(usererr);
      return res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }

    const { count, error: countErr } = await supabase
      .from("contributions")
      .select("*", { count: "exact", head: true })
      .eq("contributor_id", userdata.id);

    if (countErr) {
      return res.status(500).json({ success: false });
    }
    const { data: projects, error: projecterr } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        views
      `).eq("owner_id", id)

    if (projecterr) {
      console.error(projecterr);
      return res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }
    const { data: contributionCount, error: countError } = await supabase
      .from("contributions")
      .select("project_id");

    if (countError) {
      console.error(countError);
      return res.status(500).json({ success: false, message: "Failed to fetch contribution counts" });
    }
    const contributionMap = {};
    contributionCount.forEach(item => {
      contributionMap[item.project_id] = (contributionMap[item.project_id] || 0) + 1;
    });

    res.json({ success: true, userdata: userdata, contributionCount: count, projects: projects, projectContibution: contributionMap })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

app.post("/contribute/:id", requireAuth, upload.array("files"), async (req, res) => {
  const project_id = req.params.id;
  console.log(`[Contribute] Project ID: ${project_id}, User: ${req.session.usn}`);

  const { data: contributorData, error: contributorError } = await supabase
    .from("students")
    .select("id")
    .eq("usn", req.session.usn)
    .single();

  if (contributorError) {
    console.error(contributorError);
    return res.status(500).json({ success: false, message: "Failed to fetch contributor data" });
  }

  const contributor_id = contributorData.id;
  const { title } = req.body;
  const files = req.files;
  try {
    const { data: contributionData, error: contributionError } = await supabase
      .from("contributions")
      .insert({
        project_id: project_id,
        contributor_id: contributor_id,
        title: title
      })
      .select()
      .single();
    if (contributionError) {
      console.error(contributionError);
      return res.status(500).json({ success: false, message: "Failed to create contribution record" });
    }
    const newContributionId = contributionData.id;

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = `contributions/${project_id}/${newContributionId}/${file.originalname}`;
        const { error: uploadError } = await supabase
          .storage
          .from('user_files')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });
        if (uploadError) {
          console.error(uploadError);
          continue;
        }
        const { data: urlData } = supabase.storage
          .from('user_files')
          .getPublicUrl(filePath);
        const { error: fileDbError } = await supabase
          .from('contribution_files')
          .insert({
            contribution_id: newContributionId,
            file_url: urlData.publicUrl
          });
        if (fileDbError) console.error(fileDbError);
      }
    }

    res.json({ success: true, message: "Contribution submitted and files uploaded!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/settings", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("name, email, usn, about_me, password")
      .eq("usn", req.session.usn)
      .single();

    if (error) {
      console.error("Settings fetch error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch user settings"
      });
    }

    res.json({ success: true, settings: data });
  } catch (err) {
    console.error("Settings error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.post("/settings/update", requireAuth, async (req, res) => {
  const { name, email, about_me, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("students")
      .update({ name, email, about_me, password })
      .eq("usn", req.session.usn);

    if (error) {
      console.error("Settings update error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update user settings"
      });
    }

    res.json({
      success: true,
      message: "Settings updated successfully"
    });
  } catch (err) {
    console.error("Settings update error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.post("/projects/:projectId/add-member", async (req, res) => {
  const projectId = req.params.projectId;
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({
      success: false,
      message: "studentId is required"
    });
  }

  try {
    const { data, error } = await supabase
      .from("project_team_members")
      .insert([
        {
          project_id: projectId,
          student_id: studentId
        }
      ]);

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "Student is already a team member of this project"
        });
      }

      console.error("Supabase Insert Error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to add team member"
      });
    }

    return res.json({
      success: true,
      message: "Team member added successfully"
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/:title/team", requireAuth, async (req, res) => {
  const projectTitle = req.params.title;
  try {
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("id")
      .eq("title", projectTitle)
      .single();
    if (projectError) {
      console.error(projectError);
      return res.status(500).json({ success: false, message: "Failed to fetch project" });
    }
    const projectId = projectData.id;

    const { data: teamMembers, error: membersError } = await supabase
      .from("project_team_members")
      .select(`
        students (
          usn,
          name,
          email
        )
      `)
      .eq("project_id", projectId);
    if (membersError) {
      console.error(membersError);
      return res.status(500).json({ success: false, message: "Failed to fetch team members" });
    }
    res.json({ success: true, members: teamMembers.map(member => member.students) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/auth/me", async (req, res) => {
  if (!req.session.usn) {
    return res.status(401).json({ success: false });
  }
  const { data, error } = await supabase
    .from("students")
    .select("name")
    .eq("usn", req.session.usn);
  if (error || data.length === 0) {
    return res.status(500).json({ success: false });
  }

  res.json({
    success: true,
    usn: req.session.usn,
    name: data[0].name
  });
});

app.get("/project/:id/download", requireAuth, async (req, res) => {
  const projectId = req.params.id;
  try {
    const { data: filesData, error } = await supabase
      .from("project_files")
      .select("file_url")
      .eq("project_id", projectId);
    if (error || !filesData || filesData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No files found for this project",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=project-${projectId}.zip`
    );

    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);
    for (const file of filesData) {
      const fileUrl = file.file_url;
      const fileName = fileUrl.split("/").pop();
      const response = await axios.get(fileUrl, {
        responseType: "stream",
      });
      archive.append(response.data, { name: fileName });
    }
    archive.finalize();
  }
  catch (err) {
    console.error("Project ZIP error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to download project files",
    });
  }
});
