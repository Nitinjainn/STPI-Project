const Project = require("../model/ProjectModel");
const Hackathon = require("../model/HackathonModel");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      oneLineIntro,
      description,
      repoLink,
      websiteLink,
      videoLink,
      socialLinks,
      logo,
      category,
      customCategory,
      team,
      hackathon,
      skills,
      teamIntro,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !oneLineIntro) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Pull user from token (middleware adds it)
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newProject = new Project({
      title,
      oneLineIntro,
      description,
      teamIntro,
      skills,
      repoLink,
      websiteLink,
      videoLink,
      socialLinks,
      logo,
      category,
      customCategory,
      team: team || null,
      hackathon: hackathon || null,
      submittedBy: userId, // ✅ required field
      status: "draft",
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ message: "Failed to create project", error: err.message });
  }
};


// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("submittedBy", "name profileImage role") // 👈 key line
      .populate("hackathon", "title description images prizePool registrationDeadline startDate endDate status difficultyLevel")
      .populate({
        path: 'team',
        populate: [
          { path: 'members', select: 'name profileImage email' },
          { path: 'leader', select: 'name profileImage email' }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};


// Get my projects
exports.getMyProjects = async (req, res) => {
  try {
    // Return all fields for each project, plus submittedBy and hackathon title
    const projects = await Project.find({ submittedBy: req.user._id })
      .populate("submittedBy", "name profileImage role")
      .populate("hackathon", "title");
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching user projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get projects by hackathon
exports.getProjectsByHackathon = async (req, res) => {
  try {
    const projects = await Project.find({ hackathon: req.params.hackathonId, status: "submitted" })
      .populate("submittedBy", "name profileImage role")
      .populate({
        path: 'team',
        populate: [
          { path: 'members', select: 'name profileImage email' },
          { path: 'leader', select: 'name profileImage email' }
        ]
      });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('hackathon') // <-- Populate all fields for hackathon
      .populate('submittedBy', 'name profileImage')
      .populate({
        path: 'team',
        populate: [
          { path: 'members', select: 'name profileImage email' },
          { path: 'leader', select: 'name profileImage email' }
        ]
      });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project' });
  }
};


// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 🛡️ Only allow the user who created the project
    if (!project.submittedBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 🛡️ Only allow deletion by the user who submitted it
    if (!project.submittedBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};


// Submit project
exports.submitProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (!project.submittedBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (!project.hackathon) {
      return res.status(400).json({ message: "No hackathon linked to this project" });
    }
    project.status = "submitted";
    project.submittedAt = new Date();
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error submitting project", error: error.message });
  }
};

// Assign hackathon to a project
exports.assignHackathonToProject = async (req, res) => {
  try {
    const { hackathonId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    if (!project.submittedBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

    if (project.hackathon) {
      return res.status(400).json({ message: "Project already linked to a hackathon" });
    }

    project.hackathon = hackathonId;
    await project.save();

    res.json({ message: "Hackathon assigned to project", project });
  } catch (error) {
    res.status(500).json({ message: "Error assigning hackathon", error: error.message });
  }
};
exports.getProjectsByHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const projects = await Project.find({
      hackathon: hackathonId,
      status: "submitted",
    })
      .populate("submittedBy", "name profileImage role") // ✅ FIXED LINE
      .sort({ updatedAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects for hackathon:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/projects/:id/like (user-based only, must be logged in)
exports.likeProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id?.toString();
    if (!userId) return res.status(401).json({ message: 'You must be logged in to like projects.' });
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const hasLiked = project.likedBy.includes(userId);
    if (hasLiked) {
      project.likes = Math.max(0, project.likes - 1);
      project.likedBy = project.likedBy.filter(l => l !== userId);
      await project.save();
      // Emit socket event for like update
      req.app.get('io').emit('project-like-update', { projectId: id, likes: project.likes, likedBy: project.likedBy });
      return res.status(200).json({ liked: false, likes: project.likes, message: 'Like removed.' });
    }
    project.likes++;
    project.likedBy.push(userId);
    await project.save();
    // Emit socket event for like update
    req.app.get('io').emit('project-like-update', { projectId: id, likes: project.likes, likedBy: project.likedBy });
    res.status(200).json({ liked: true, likes: project.likes, message: 'Project liked!' });
  } catch (err) {
    res.status(500).json({ message: 'Error liking project', error: err.message });
  }
};

// PATCH /api/projects/:id/view (increment unique view, user-based only)
exports.viewProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id?.toString();
    if (!userId) return res.status(401).json({ message: 'You must be logged in to view projects.' });
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.viewedBy.includes(userId)) {
      project.views++;
      project.viewedBy.push(userId);
      await project.save();
      // Emit socket event for view update
      req.app.get('io').emit('project-view-update', { projectId: id, views: project.views });
    }
    res.status(200).json({ views: project.views });
  } catch (err) {
    res.status(500).json({ message: 'Error incrementing view', error: err.message });
  }
};
