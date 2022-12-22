/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { BaseItem, Item } from "./item.interface";
import * as ItemService from "./items.service";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();
/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
  console.log('Here are you')
  try {
    const items: Item[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.findById(id);
    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemService.create(item);

    res.status(201).send(newItem);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemData = req.body;
    const item: BaseItem | null = await ItemService.update(id, itemData);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
