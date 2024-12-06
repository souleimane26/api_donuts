import request from 'supertest';
import { app } from './index'; 

describe('Donut Shop API', () => {
  it('should create a new donut', async () => {
    const newDonut = {
      name: 'Strawberry',
      flavor: 'Strawberry',
      price: 2.99,
      quantity: 15,
    };

    const res = await request(app)
      .post('/donuts')
      .send(newDonut);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newDonut.name);
    expect(res.body.flavor).toBe(newDonut.flavor);
  });

  it('should get all donuts', async () => {
    const res = await request(app).get('/donuts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a donut by ID', async () => {
    const res = await request(app).get('/donuts/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should update a donut by ID', async () => {
    const updatedDonut = {
      name: 'Updated Donut',
      flavor: 'Updated Flavor',
      price: 3.49,
      quantity: 20,
    };

    const res = await request(app)
      .put('/donuts/1')
      .send(updatedDonut);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(updatedDonut.name);
    expect(res.body.flavor).toBe(updatedDonut.flavor);
  });

  it('should delete a donut by ID', async () => {
    const res = await request(app).delete('/donuts/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for a non-existent donut', async () => {
    const res = await request(app).get('/donuts/999');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe('Donut non trouvé');
  });

  it('should return 404 when trying to delete a non-existent donut', async () => {
    const res = await request(app).delete('/donuts/999');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe('Donut non trouvé');
  });
});