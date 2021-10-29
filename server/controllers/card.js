const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  if (!columnId || !userId || !boardId) {
    res.status(400);
    throw new Error(
      `${!columnId ? "columnId" : ""}${!boardId ? "boardId" : ""}${
        !userId ? "userId" : ""
      } is undefined`
    );
  }
  try {
    const card = await User.updateOne(
      { _id: userId, "boards.columns.columnId": columnId },
      {
        $push: {
          "boards.$[board].columns.$[column].cards": {
            cardId: uuidv4(),
            cardTitle: cardTitle,
            tagColor: tagColor,
          },
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
        ],
      }
    );

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

exports.updateCardItems = asyncHandler(async (req, res, next) => {
  const { userId, cardItem, value, cardId, columnId, boardId } = req.body;

  if (!cardId || !userId || !columnId || !boardId) {
    res.status(404);
    throw new Error(
      `${!columnId ? "columnId" : ""}${!cardId ? "cardId" : ""}${
        !boardId ? "boardId" : ""
      }${!userId ? "userId" : ""} is undefined`
    );
  }

  try {
    const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`;

    const updateStatus = await User.updateOne(
      { _id: userId, "boards.columns.cards.cardId": cardId },
      {
        $set: {
          [targetItem]: value,
        },
      },
      {
        arrayFilters: [
          { "board.boardId": boardId },
          { "column.columnId": columnId },
          { "card.cardId": cardId },
        ],
      }
    );

    res.status(200).json(updateStatus);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

exports.removeCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, userId, cardId, columnId, boardId } = req.body;

  if (!cardId || !columnId || !boardId || !userId) {
    res.status(400);
    throw new Error(
      `${!columnId ? "columnId" : ""}${!cardId ? "cardId" : ""}${
        !boardId ? "boardId" : ""
      }${!userId ? "userId" : ""} is undefined`
    );
  }

  try {
    const getDocumentIndex = (document) => {
      for (const boardIndex in document[0].boards) {
        for (const columnIndex in document[0].boards[boardIndex].columns) {
          for (const cardIndex in document[0].boards[boardIndex].columns[
            columnIndex
          ].cards) {
            const documentCardId =
              document[0].boards[boardIndex].columns[columnIndex].cards[
                cardIndex
              ].cardId;

            if (documentCardId === cardId) {
              return {
                boardIndex,
                columnIndex,
                cardIndex,
              };
            }
          }
        }
      }
    };

    const document = await User.find({
      _id: userId,
      "boards.columns.cards.cardId": cardId,
    }).catch((error) =>
      res.status(500).json({ error: "Something went wrong" })
    );

    const { boardIndex, columnIndex, cardIndex } = getDocumentIndex(document);

    const targetItem = `boards.${boardIndex}.columns.${columnIndex}.cards.${cardIndex}.${cardItem}`;

    const removeStatus = await User.updateOne(
      { _id: userId, "boards.columns.cards.cardId": cardId },
      {
        $unset: { [targetItem]: "" },
      }
    );

    res.status(200).json(removeStatus);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
