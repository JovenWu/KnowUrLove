"use server"

import prisma from "./db";

export async function saveScore(username, score) {
    try {
      await prisma.user.create({
        data: {
          username: username,
          score: score,
        },
      });
      console.log("Score saved successfully");
    } catch (error) {
      console.error("Error saving score:", error);
      throw new Error("Failed to save score");
    }
  }