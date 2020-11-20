import { Router } from "express";
import { Link } from "../models/Link";

const router = Router();

router.get("/:code", async (req, res) => {
  console.log(req);
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }
    req.status(404).json({ message: `Link ${req.params.code} not found` });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

export default router;
