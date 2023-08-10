import { Router, Request, Response } from 'express';
const router = Router();

interface Entity {
  id: number;
  name: string;
  properties: {
    propA: string;
    propB: string;
    propC: number[];
  };
}

let data: Entity[] = [
  { id: 1, name: 'Entity1', properties: { propA: 'a', propB: 'b', propC: [1, 2, 3] } },
  { id: 2, name: 'Entity2', properties: { propA: 'c', propB: 'd', propC: [4, 5, 6] } },
  { id: 3, name: 'Entity3', properties: { propA: 'e', propB: 'f', propC: [7, 8, 9] } },
];

// GET all entities
router.get('/entities', function (req: Request, res: Response) {
  if (req.query.filter) {
    let filter: string = req.query.filter as string;
    let filtered: Entity[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.includes(filter)) {
        filtered.push(data[i]);
      }
    }
    res.json(filtered);
  } else {
    res.json(data);
  }
});

// GET entity by ID
router.get('/entities/:id', function (req: Request, res: Response) {
  let id: number = +req.params.id;
  let entity: Entity | undefined = data.find(item => item.id === id);
  if (entity) {
    res.json(entity);
  } else {
    res.status(404).send('Not found');
  }
});

// POST new entity
router.post('/entities', function (req: Request, res: Response) {
  let entity: Entity = req.body;
  if (entity && entity.name && entity.properties && typeof entity.name === 'string' && typeof entity.properties === 'object') {
    let id: number = data.length + 1;
    entity.id = id;
    data.push(entity);
    res.json(entity);
  } else {
    res.status(400).send('Bad Request');
  }
});

// DELETE an entity
router.delete('/entities/:id', function (req: Request, res: Response) {
  let id: number = +req.params.id;
  let index: number = data.findIndex(item => item.id === id);
  if (index !== -1) {
    let deleted: Entity[] = data.splice(index, 1);
    res.json(deleted);
  } else {
    res.status(404).send('Not found');
  }
});

// PATCH an entity
router.patch('/entities/:id', function (req: Request, res: Response) {
  let id: number = +req.params.id;
  let update: Partial<Entity> = req.body;
  let entity: Entity | undefined = data.find(item => item.id === id);
  if (entity) {
    let updatedEntity: Entity = { ...entity, ...update };
    res.json(updatedEntity);
  } else {
    res.status(404).send('Not found');
  }
});

export default router;