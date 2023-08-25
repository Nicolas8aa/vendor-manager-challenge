const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");
const { Account, Agreement, Submission } = require("@models/index.js");
const { verifyToken, isAdmin } = require("@middlewares/auth");
const { getPagination, getPagingData } = require("@lib/pagination");
const { check } = require("express-validator");
const { validateFields } = require("@middlewares/validate");

// GET /admin/best-supplier-profession?start=<date>&end=<date> - Implement this API to return the best buyer profession that earned the most money (sum of submissions paid) for any supplier who worked in the specified time range.

router.use([verifyToken, isAdmin]);

const validateDates = [
  check("start").isISO8601().toDate().withMessage("Invalid start date"),
  check("end").isISO8601().toDate().withMessage("Invalid end date"),
];

router.get(
  "/best-buyer-profession",
  [...validateDates, validateFields],
  async (req, res) => {
    try {
      const { start, end } = req.query;

      // Find all submissions within the specified time range
      const submissions = await Submission.findAll({
        where: {
          paymentDate: {
            [Op.between]: [start, end],
          },
        },
        include: [
          {
            model: Agreement,
            include: [
              {
                model: Account,
                as: "Buyer",
                attributes: ["id", "profession"],
              },
            ],
          },
        ],
      });

      if (!submissions.length) {
        return res.status(404).json({ message: "No submissions found" });
      }

      // create a map of profession to total earnings
      const professionEarnings = {};

      submissions.forEach((submission) => {
        const buyer = submission.Agreement.Buyer;
        if (!professionEarnings[buyer.profession]) {
          professionEarnings[buyer.profession] = submission.price;
        } else {
          professionEarnings[buyer.profession] += submission.price;
        }
      });

      // Find the profession with the highest earnings

      const bestProfession = Object.keys(professionEarnings).reduce((a, b) =>
        professionEarnings[a] > professionEarnings[b] ? a : b
      );

      return res.send({
        profession: bestProfession,
        earnings: professionEarnings[bestProfession],
      });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }
);

// GET /admin/best-buyers?start=<date>&end=<date>&limit=<integer> - Implement this API to return the buyers who paid the most for submissions in the given time period. The result should be limited based on the query parameter limit, with the default limit(size) set to 3

router.get(
  "/best-buyers",
  [
    check("size")
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
    check("page")
      .isInt({ min: 0 })
      .withMessage("Page must be a positive integer"),
    ...validateDates,
    validateFields,
  ],
  async (req, res) => {
    const { page, size, start, end } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
      const submissions = await Submission.findAndCountAll({
        where: {
          paymentDate: {
            [Op.between]: [start, end],
          },
          paid: true,
        },
        limit,
        offset,
        order: [["price", "DESC"]],
        attributes: ["id", "price", "paymentDate"],
        include: [
          {
            model: Agreement,
            include: [
              {
                model: Account,
                as: "Buyer",
                attributes: ["id", "firstName", "lastName", "email"],
              },
            ],
          },
        ],
      });

      const response = getPagingData(submissions, page, limit);

      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }
);

module.exports = router;
