const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const indexRouter = Router();

const validateMessage = [
    body("messageUser")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isLength({ max: 40 }).withMessage("Name must be 40 characters or fewer."),
    body("messageText")
        .trim()
        .notEmpty().withMessage("Message is required.")
        .isLength({ max: 500 }).withMessage("Message must be 500 characters or fewer."),
];

indexRouter.get("/", async (req, res, next) => {
    try {
        const messages = await db.getAllMessages();
        res.render("index", { title: "Mini Messageboard", messages });
    } catch (err) {
        next(err);
    }
});

indexRouter.get("/new", (req, res) => {
    res.render("form", { errors: [], values: {} });
});

indexRouter.post("/new", validateMessage, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("form", {
            errors: errors.array(),
            values: req.body,
        });
    }
    try {
        await db.insertMessage(req.body.messageUser, req.body.messageText);
        res.redirect("/");
    } catch (err) {
        next(err);
    }
});

indexRouter.get("/messages/:id", async (req, res, next) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(404).send("Message not found");
    try {
        const message = await db.getMessageById(id);
        if (!message) return res.status(404).send("Message not found");
        res.render("message", { message });
    } catch (err) {
        next(err);
    }
});

module.exports = indexRouter;