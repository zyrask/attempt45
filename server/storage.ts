import { users, progressUpdates, type User, type InsertUser, type ProgressUpdate, type InsertProgressUpdate } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProgressUpdates(): Promise<ProgressUpdate[]>;
  createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate>;
  updateProgressUpdate(id: number, update: Partial<InsertProgressUpdate>): Promise<ProgressUpdate | undefined>;
  deleteProgressUpdate(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  private initialized = false;

  private async initializeDefaultData() {
    if (this.initialized || !db) return;
    
    // Check if there are any progress updates
    const existingUpdates = await db.select().from(progressUpdates).limit(1);
    
    if (existingUpdates.length === 0) {
      // Add default progress updates
      const defaultUpdates: InsertProgressUpdate[] = [
        {
          title: "Core Game Mechanics",
          description: "Basic player movement and interaction systems implemented",
          status: "completed",
          imageUrl: null,
        },
        {
          title: "Environment Design", 
          description: "Atmospheric environments and lighting completed",
          status: "completed",
          imageUrl: null,
        },
        {
          title: "Horror Elements",
          description: "Currently implementing psychological horror mechanics",
          status: "in-progress",
          imageUrl: null,
        },
        {
          title: "Audio Integration",
          description: "Sound design and music integration pending",
          status: "pending",
          imageUrl: null,
        },
        {
          title: "Beta Testing",
          description: "Closed beta testing phase scheduled for next month",
          status: "pending",
          imageUrl: null,
        },
      ];

      await db!.insert(progressUpdates).values(defaultUpdates);
    }
    
    this.initialized = true;
  }

  async getUser(id: number): Promise<User | undefined> {
    if (!db) throw new Error("Database not configured");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not configured");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not configured");
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProgressUpdates(): Promise<ProgressUpdate[]> {
    if (!db) throw new Error("Database not configured");
    await this.initializeDefaultData();
    return await db.select().from(progressUpdates).orderBy(progressUpdates.id);
  }

  async createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate> {
    if (!db) throw new Error("Database not configured");
    const [progressUpdate] = await db
      .insert(progressUpdates)
      .values(update)
      .returning();
    return progressUpdate;
  }

  async updateProgressUpdate(id: number, update: Partial<InsertProgressUpdate>): Promise<ProgressUpdate | undefined> {
    if (!db) throw new Error("Database not configured");
    const [updated] = await db
      .update(progressUpdates)
      .set(update)
      .where(eq(progressUpdates.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProgressUpdate(id: number): Promise<boolean> {
    if (!db) throw new Error("Database not configured");
    const result = await db
      .delete(progressUpdates)
      .where(eq(progressUpdates.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progressUpdates: Map<number, ProgressUpdate>;
  private currentUserId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.progressUpdates = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    
    // Initialize with default progress updates
    this.initializeDefaultProgress();
  }

  private initializeDefaultProgress() {
    const defaultUpdates: InsertProgressUpdate[] = [
      {
        title: "Core Game Mechanics",
        description: "Basic player movement and interaction systems implemented",
        status: "completed",
        imageUrl: null,
      },
      {
        title: "Environment Design", 
        description: "Atmospheric environments and lighting completed",
        status: "completed",
        imageUrl: null,
      },
      {
        title: "Horror Elements",
        description: "Currently implementing psychological horror mechanics",
        status: "in-progress",
        imageUrl: null,
      },
      {
        title: "Audio Integration",
        description: "Sound design and music integration pending",
        status: "pending",
        imageUrl: null,
      },
      {
        title: "Beta Testing",
        description: "Closed beta testing phase scheduled for next month",
        status: "pending",
        imageUrl: null,
      },
    ];

    defaultUpdates.forEach(update => {
      const id = this.currentProgressId++;
      const progressUpdate: ProgressUpdate = {
        ...update,
        id,
        imageUrl: update.imageUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.progressUpdates.set(id, progressUpdate);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProgressUpdates(): Promise<ProgressUpdate[]> {
    return Array.from(this.progressUpdates.values()).sort((a, b) => a.id - b.id);
  }

  async createProgressUpdate(update: InsertProgressUpdate): Promise<ProgressUpdate> {
    const id = this.currentProgressId++;
    const progressUpdate: ProgressUpdate = {
      ...update,
      id,
      imageUrl: update.imageUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.progressUpdates.set(id, progressUpdate);
    return progressUpdate;
  }

  async updateProgressUpdate(id: number, update: Partial<InsertProgressUpdate>): Promise<ProgressUpdate | undefined> {
    const existing = this.progressUpdates.get(id);
    if (!existing) return undefined;

    const updated: ProgressUpdate = {
      ...existing,
      ...update,
      updatedAt: new Date(),
    };
    this.progressUpdates.set(id, updated);
    return updated;
  }

  async deleteProgressUpdate(id: number): Promise<boolean> {
    return this.progressUpdates.delete(id);
  }
}

export const storage = new DatabaseStorage();
