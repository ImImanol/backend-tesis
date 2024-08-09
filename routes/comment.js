// backend/routes/comment.js
const express = require("express");
const Comment = require("../models/Comment");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Obtener comentarios de una zona turística
router.get("/:zoneId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({
      touristZone: req.params.zoneId,
    }).populate("user", "username");
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Agregar un comentario
router.post("/:zoneId/comments", auth, async (req, res) => {
  try {
    const newComment = new Comment({
      user: req.user._id,
      touristZone: req.params.zoneId,
      content: req.body.content,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error adding comment", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.delete("/:zoneId/comments/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este comentario." });
    }

    await comment.remove();
    res.status(200).json({ message: "Comentario eliminado con éxito." });
  } catch (err) {
    console.error("Error eliminando el comentario", err);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: err.message });
  }
});

module.exports = router;
