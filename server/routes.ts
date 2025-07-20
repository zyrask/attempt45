import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProgressUpdateSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });

  // Get all progress updates
  app.get("/api/progress", async (req, res) => {
    try {
      const updates = await storage.getProgressUpdates();
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress updates" });
    }
  });

  // Create new progress update
  app.post("/api/progress", upload.single('image'), async (req, res) => {
    try {
      const data = insertProgressUpdateSchema.parse({
        ...req.body,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null
      });
      
      const update = await storage.createProgressUpdate(data);
      res.status(201).json(update);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress update data", error });
    }
  });

  // Update progress update
  app.patch("/api/progress/:id", upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertProgressUpdateSchema.partial().parse({
        ...req.body,
        ...(req.file && { imageUrl: `/uploads/${req.file.filename}` })
      });
      
      const update = await storage.updateProgressUpdate(id, data);
      if (!update) {
        return res.status(404).json({ message: "Progress update not found" });
      }
      
      res.json(update);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Delete progress update
  app.delete("/api/progress/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProgressUpdate(id);
      
      if (!success) {
        return res.status(404).json({ message: "Progress update not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete progress update" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
